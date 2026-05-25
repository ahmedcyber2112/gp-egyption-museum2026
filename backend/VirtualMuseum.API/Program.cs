using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using VirtualMuseum.API.Middleware;
using VirtualMuseum.Application.Interfaces;
using VirtualMuseum.Application.Services;
using VirtualMuseum.Infrastructure.Data;
using VirtualMuseum.Infrastructure.Repositories;
using VirtualMuseum.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Database - Scoped lifetime (default for AddDbContext)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured in appsettings.json");
}

builder.Services.AddDbContext<MuseumDbContext>(options =>
{
    options.UseSqlServer(connectionString);
});

var dataProtectionKeyPath = builder.Configuration["DataProtection:KeyPath"];
if (string.IsNullOrWhiteSpace(dataProtectionKeyPath))
{
    // Use a writable per-app directory by default across hosting environments.
    dataProtectionKeyPath = Path.Combine(builder.Environment.ContentRootPath, "App_Data", "keys");
}

Directory.CreateDirectory(dataProtectionKeyPath);
builder.Services
    .AddDataProtection()
    .SetApplicationName("VirtualMuseum.API")
    .PersistKeysToFileSystem(new DirectoryInfo(dataProtectionKeyPath));

// Repositories
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IArtifactRepository, ArtifactRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IOtpRepository, OtpRepository>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddScoped<IPendingUserRegistrationRepository, PendingUserRegistrationRepository>();

// Services
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ArtifactService>();
builder.Services.AddScoped<EraService>();
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<MaterialService>();
builder.Services.AddScoped<TagService>();
builder.Services.AddScoped<UserService>();

builder.Services.AddHttpClient("N8n", client =>
{
    client.Timeout = TimeSpan.FromMinutes(2);
});

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? builder.Configuration["Jwt:Secret"]
    ?? throw new InvalidOperationException("Jwt:Key (or Jwt:Secret) is not configured in appsettings.json");
if (jwtKey.Length < 32)
{
    throw new InvalidOperationException("Jwt:Key must be at least 32 characters for production safety.");
}
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Map JWT "role" claim to ClaimTypes.Role so [Authorize(Roles = "Admin")] works reliably.
        options.MapInboundClaims = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            RoleClaimType = ClaimTypes.Role,
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });

builder.Services.AddAuthorization();

var corsOrigins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>() ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        if (corsOrigins.Length == 0)
        {
            if (builder.Environment.IsDevelopment())
            {
                policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                return;
            }

            throw new InvalidOperationException("Cors:Origins must be configured in non-development environments.");
        }

        policy.WithOrigins(corsOrigins).AllowAnyHeader().AllowAnyMethod();
    });
});

// Controllers with validation
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "3D Virtual Museum API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();
var enableSwagger =
    builder.Configuration.GetValue<bool?>("Swagger:Enabled")
    ?? true;

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
    // Shared hosts / reverse proxies often don't show up as "known".
    // Clearing these allows forwarded headers to be processed.
    KnownNetworks = { },
    KnownProxies = { }
});

// Global exception handling - must be first
app.UseMiddleware<ExceptionHandlingMiddleware>();

var runMigrationsOnStartup =
    builder.Configuration.GetValue<bool?>("Database:RunMigrationsOnStartup")
    ?? true;
var ensureDatabaseExistsOnStartup =
    builder.Configuration.GetValue<bool?>("Database:EnsureDatabaseExistsOnStartup")
    ?? false;

// Database connection validation and migration (opt-in outside development)
if (runMigrationsOnStartup)
{
    using var scope = app.Services.CreateScope();
    var startupLogger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    var context = scope.ServiceProvider.GetRequiredService<MuseumDbContext>();
    var targetConnectionString = context.Database.GetConnectionString();
    startupLogger.LogInformation(
        "Database startup options: RunMigrationsOnStartup={RunMigrationsOnStartup}, EnsureDatabaseExistsOnStartup={EnsureDatabaseExistsOnStartup}",
        runMigrationsOnStartup,
        ensureDatabaseExistsOnStartup);
    try
    {
        const int maxRetries = 12;
        for (var attempt = 1; attempt <= maxRetries; attempt++)
        {
            try
            {
                if (ensureDatabaseExistsOnStartup && !string.IsNullOrWhiteSpace(targetConnectionString))
                {
                    await EnsureDatabaseExistsAsync(targetConnectionString, startupLogger);
                }

                startupLogger.LogInformation("Attempting database migration... (Attempt {Attempt}/{MaxRetries})", attempt, maxRetries);
                await context.Database.MigrateAsync();
                await DatabaseSeeder.SeedAsync(context);
                startupLogger.LogInformation("Database migrations and seeding completed successfully.");
                break;
            }
            catch (Exception) when (attempt < maxRetries)
            {
                await Task.Delay(TimeSpan.FromSeconds(5));
            }
            catch
            {
                startupLogger.LogError("Database migration failed after retries. Please verify SQL Server is running and connection string in appsettings.json");
                throw new InvalidOperationException("Unable to initialize database.");
            }
        }
    }
    catch (Exception ex)
    {
        startupLogger.LogError(ex, "Database initialization failed: {Message}. Verify connection string: Server=...;Database=VirtualMuseumDB;User ID=sa;Password=...;TrustServerCertificate=True;Encrypt=False;MultipleActiveResultSets=true;", ex.Message);
        throw;
    }
}
else
{
    app.Logger.LogInformation("Skipping database migration on startup. Set Database:RunMigrationsOnStartup=true to enable.");
}

static async Task EnsureDatabaseExistsAsync(string targetConnectionString, ILogger logger)
{
    var targetBuilder = new SqlConnectionStringBuilder(targetConnectionString);
    if (string.IsNullOrWhiteSpace(targetBuilder.InitialCatalog))
    {
        return;
    }

    var targetDatabase = targetBuilder.InitialCatalog;
    var masterBuilder = new SqlConnectionStringBuilder(targetConnectionString)
    {
        InitialCatalog = "master"
    };

    await using var connection = new SqlConnection(masterBuilder.ConnectionString);
    await connection.OpenAsync();

    await using var command = connection.CreateCommand();
    command.CommandText = $"IF DB_ID(N'{targetDatabase.Replace("'", "''")}') IS NULL CREATE DATABASE [{targetDatabase.Replace("]", "]]}")}]";
    await command.ExecuteNonQueryAsync();

    logger.LogInformation("Verified database '{DatabaseName}' exists.", targetDatabase);
}

if (enableSwagger)
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        // Relative path works even when hosted under an IIS virtual directory / PathBase.
        c.SwaggerEndpoint("v1/swagger.json", "3D Virtual Museum API v1");
    });
}
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

// Required for integration tests
public partial class Program { }
