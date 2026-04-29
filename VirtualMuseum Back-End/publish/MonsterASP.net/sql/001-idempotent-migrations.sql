IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [Categories] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(200) NOT NULL,
        CONSTRAINT [PK_Categories] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [DiscoveryLocations] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(300) NOT NULL,
        [Latitude] decimal(18,2) NULL,
        [Longitude] decimal(18,2) NULL,
        CONSTRAINT [PK_DiscoveryLocations] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [Eras] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(200) NOT NULL,
        [StartYear] int NULL,
        [EndYear] int NULL,
        CONSTRAINT [PK_Eras] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [Files] (
        [Id] uniqueidentifier NOT NULL,
        [FileName] nvarchar(500) NOT NULL,
        [FileType] nvarchar(50) NOT NULL,
        [Url] nvarchar(max) NOT NULL,
        [StorageProvider] nvarchar(50) NOT NULL,
        [UploadedBy] uniqueidentifier NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_Files] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [Materials] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(200) NOT NULL,
        CONSTRAINT [PK_Materials] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [Roles] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(100) NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_Roles] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [Tags] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(100) NOT NULL,
        CONSTRAINT [PK_Tags] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [Users] (
        [Id] uniqueidentifier NOT NULL,
        [FullName] nvarchar(200) NOT NULL,
        [Email] nvarchar(256) NOT NULL,
        [Region] nvarchar(200) NOT NULL,
        [PasswordHash] nvarchar(max) NOT NULL,
        [RoleId] uniqueidentifier NOT NULL,
        [IsActive] bit NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Users_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [Artifacts] (
        [Id] uniqueidentifier NOT NULL,
        [Slug] nvarchar(300) NOT NULL,
        [EraId] uniqueidentifier NULL,
        [CategoryId] uniqueidentifier NULL,
        [MaterialId] uniqueidentifier NULL,
        [DiscoveryLocationId] uniqueidentifier NULL,
        [ModelFileId] uniqueidentifier NULL,
        [ThumbnailFileId] uniqueidentifier NULL,
        [Height] decimal(18,2) NULL,
        [Width] decimal(18,2) NULL,
        [Depth] decimal(18,2) NULL,
        [Weight] decimal(18,2) NULL,
        [CreatedBy] uniqueidentifier NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_Artifacts] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Artifacts_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_Artifacts_DiscoveryLocations_DiscoveryLocationId] FOREIGN KEY ([DiscoveryLocationId]) REFERENCES [DiscoveryLocations] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_Artifacts_Eras_EraId] FOREIGN KEY ([EraId]) REFERENCES [Eras] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_Artifacts_Files_ModelFileId] FOREIGN KEY ([ModelFileId]) REFERENCES [Files] ([Id]),
        CONSTRAINT [FK_Artifacts_Files_ThumbnailFileId] FOREIGN KEY ([ThumbnailFileId]) REFERENCES [Files] ([Id]),
        CONSTRAINT [FK_Artifacts_Materials_MaterialId] FOREIGN KEY ([MaterialId]) REFERENCES [Materials] ([Id]) ON DELETE SET NULL,
        CONSTRAINT [FK_Artifacts_Users_CreatedBy] FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id]) ON DELETE SET NULL
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [ChatSessions] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [StartedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_ChatSessions] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_ChatSessions_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [ArtifactEmbeddings] (
        [Id] uniqueidentifier NOT NULL,
        [ArtifactId] uniqueidentifier NOT NULL,
        [EmbeddingVector] nvarchar(max) NOT NULL,
        [ModelVersion] nvarchar(max) NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_ArtifactEmbeddings] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_ArtifactEmbeddings_Artifacts_ArtifactId] FOREIGN KEY ([ArtifactId]) REFERENCES [Artifacts] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [ArtifactMedia] (
        [Id] uniqueidentifier NOT NULL,
        [ArtifactId] uniqueidentifier NOT NULL,
        [FileId] uniqueidentifier NOT NULL,
        [MediaType] nvarchar(50) NOT NULL,
        [IsPrimary] bit NOT NULL,
        [IsEmbeddingSource] bit NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_ArtifactMedia] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_ArtifactMedia_Artifacts_ArtifactId] FOREIGN KEY ([ArtifactId]) REFERENCES [Artifacts] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [ArtifactTags] (
        [ArtifactId] uniqueidentifier NOT NULL,
        [TagId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_ArtifactTags] PRIMARY KEY ([ArtifactId], [TagId]),
        CONSTRAINT [FK_ArtifactTags_Artifacts_ArtifactId] FOREIGN KEY ([ArtifactId]) REFERENCES [Artifacts] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_ArtifactTags_Tags_TagId] FOREIGN KEY ([TagId]) REFERENCES [Tags] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [ArtifactTranslations] (
        [Id] uniqueidentifier NOT NULL,
        [ArtifactId] uniqueidentifier NOT NULL,
        [LanguageCode] nvarchar(10) NOT NULL,
        [Name] nvarchar(500) NOT NULL,
        [Description] nvarchar(max) NULL,
        [HistoricalStory] nvarchar(max) NULL,
        CONSTRAINT [PK_ArtifactTranslations] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_ArtifactTranslations_Artifacts_ArtifactId] FOREIGN KEY ([ArtifactId]) REFERENCES [Artifacts] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [ArtifactViews] (
        [Id] uniqueidentifier NOT NULL,
        [ArtifactId] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NULL,
        [ViewedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_ArtifactViews] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_ArtifactViews_Artifacts_ArtifactId] FOREIGN KEY ([ArtifactId]) REFERENCES [Artifacts] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_ArtifactViews_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE SET NULL
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [Favorites] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [ArtifactId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_Favorites] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Favorites_Artifacts_ArtifactId] FOREIGN KEY ([ArtifactId]) REFERENCES [Artifacts] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Favorites_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [Reviews] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [ArtifactId] uniqueidentifier NOT NULL,
        [Rating] int NOT NULL,
        [Comment] nvarchar(max) NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_Reviews] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Reviews_Artifacts_ArtifactId] FOREIGN KEY ([ArtifactId]) REFERENCES [Artifacts] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Reviews_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [ChatMessages] (
        [Id] uniqueidentifier NOT NULL,
        [SessionId] uniqueidentifier NOT NULL,
        [Role] nvarchar(50) NOT NULL,
        [MessageText] nvarchar(max) NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_ChatMessages] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_ChatMessages_ChatSessions_SessionId] FOREIGN KEY ([SessionId]) REFERENCES [ChatSessions] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE TABLE [ChatMessageArtifacts] (
        [MessageId] uniqueidentifier NOT NULL,
        [ArtifactId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_ChatMessageArtifacts] PRIMARY KEY ([MessageId], [ArtifactId]),
        CONSTRAINT [FK_ChatMessageArtifacts_Artifacts_ArtifactId] FOREIGN KEY ([ArtifactId]) REFERENCES [Artifacts] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_ChatMessageArtifacts_ChatMessages_MessageId] FOREIGN KEY ([MessageId]) REFERENCES [ChatMessages] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_ArtifactEmbeddings_ArtifactId] ON [ArtifactEmbeddings] ([ArtifactId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_ArtifactMedia_ArtifactId] ON [ArtifactMedia] ([ArtifactId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Artifacts_CategoryId] ON [Artifacts] ([CategoryId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Artifacts_CreatedBy] ON [Artifacts] ([CreatedBy]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Artifacts_DiscoveryLocationId] ON [Artifacts] ([DiscoveryLocationId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Artifacts_EraId] ON [Artifacts] ([EraId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Artifacts_MaterialId] ON [Artifacts] ([MaterialId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Artifacts_ModelFileId] ON [Artifacts] ([ModelFileId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Artifacts_Slug] ON [Artifacts] ([Slug]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Artifacts_ThumbnailFileId] ON [Artifacts] ([ThumbnailFileId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_ArtifactTags_TagId] ON [ArtifactTags] ([TagId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_ArtifactTranslations_ArtifactId] ON [ArtifactTranslations] ([ArtifactId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_ArtifactViews_ArtifactId] ON [ArtifactViews] ([ArtifactId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_ArtifactViews_UserId] ON [ArtifactViews] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_ChatMessageArtifacts_ArtifactId] ON [ChatMessageArtifacts] ([ArtifactId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_ChatMessages_SessionId] ON [ChatMessages] ([SessionId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_ChatSessions_UserId] ON [ChatSessions] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Favorites_ArtifactId] ON [Favorites] ([ArtifactId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Favorites_UserId] ON [Favorites] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Reviews_ArtifactId] ON [Reviews] ([ArtifactId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Reviews_UserId] ON [Reviews] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Users_Email] ON [Users] ([Email]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    CREATE INDEX [IX_Users_RoleId] ON [Users] ([RoleId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260310213443_InitialCreate'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260310213443_InitialCreate', N'8.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260316151152_AddEmailOtpAndRefreshTokens'
)
BEGIN
    ALTER TABLE [Users] ADD [EmailConfirmed] bit NOT NULL DEFAULT CAST(0 AS bit);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260316151152_AddEmailOtpAndRefreshTokens'
)
BEGIN
    ALTER TABLE [Users] ADD [LastLogin] datetime2 NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260316151152_AddEmailOtpAndRefreshTokens'
)
BEGIN
    CREATE TABLE [EmailOtps] (
        [Id] uniqueidentifier NOT NULL,
        [Email] nvarchar(256) NOT NULL,
        [Code] nvarchar(16) NOT NULL,
        [ExpirationTime] datetime2 NOT NULL,
        [IsUsed] bit NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_EmailOtps] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260316151152_AddEmailOtpAndRefreshTokens'
)
BEGIN
    CREATE TABLE [RefreshTokens] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [Token] nvarchar(512) NOT NULL,
        [ExpiresAt] datetime2 NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        [Revoked] bit NOT NULL,
        CONSTRAINT [PK_RefreshTokens] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_RefreshTokens_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260316151152_AddEmailOtpAndRefreshTokens'
)
BEGIN
    CREATE UNIQUE INDEX [IX_RefreshTokens_Token] ON [RefreshTokens] ([Token]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260316151152_AddEmailOtpAndRefreshTokens'
)
BEGIN
    CREATE INDEX [IX_RefreshTokens_UserId] ON [RefreshTokens] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260316151152_AddEmailOtpAndRefreshTokens'
)
BEGIN
    IF COL_LENGTH('Users', 'Email') IS NOT NULL
        EXEC(N'UPDATE [Users] SET [EmailConfirmed] = 1 WHERE [Email] = N''admin@museum.com'';');
    ELSE IF COL_LENGTH('Users', 'EmailAddress') IS NOT NULL
        EXEC(N'UPDATE [Users] SET [EmailConfirmed] = 1 WHERE [EmailAddress] = N''admin@museum.com'';');
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260316151152_AddEmailOtpAndRefreshTokens'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260316151152_AddEmailOtpAndRefreshTokens', N'8.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260316152948_ConfirmAdminEmail'
)
BEGIN
    IF COL_LENGTH('Users', 'Email') IS NOT NULL
        EXEC(N'UPDATE [Users] SET [EmailConfirmed] = 1 WHERE [Email] = N''admin@museum.com'';');
    ELSE IF COL_LENGTH('Users', 'EmailAddress') IS NOT NULL
        EXEC(N'UPDATE [Users] SET [EmailConfirmed] = 1 WHERE [EmailAddress] = N''admin@museum.com'';');
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260316152948_ConfirmAdminEmail'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260316152948_ConfirmAdminEmail', N'8.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260404192841_EmailOtpUserIdFk'
)
BEGIN
    ALTER TABLE [EmailOtps] ADD [UserId] uniqueidentifier NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260404192841_EmailOtpUserIdFk'
)
BEGIN
    IF COL_LENGTH('Users', 'Email') IS NOT NULL
        EXEC(N'
            UPDATE eo
            SET eo.UserId = u.Id
            FROM EmailOtps AS eo
            INNER JOIN Users AS u ON u.Email = eo.Email;
        ');
    ELSE IF COL_LENGTH('Users', 'EmailAddress') IS NOT NULL
        EXEC(N'
            UPDATE eo
            SET eo.UserId = u.Id
            FROM EmailOtps AS eo
            INNER JOIN Users AS u ON u.EmailAddress = eo.Email;
        ');
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260404192841_EmailOtpUserIdFk'
)
BEGIN
    DELETE FROM EmailOtps WHERE UserId IS NULL
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260404192841_EmailOtpUserIdFk'
)
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmailOtps]') AND [c].[name] = N'UserId');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [EmailOtps] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [EmailOtps] ALTER COLUMN [UserId] uniqueidentifier NOT NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260404192841_EmailOtpUserIdFk'
)
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmailOtps]') AND [c].[name] = N'Email');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [EmailOtps] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [EmailOtps] DROP COLUMN [Email];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260404192841_EmailOtpUserIdFk'
)
BEGIN
    CREATE INDEX [IX_EmailOtps_UserId] ON [EmailOtps] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260404192841_EmailOtpUserIdFk'
)
BEGIN
    ALTER TABLE [EmailOtps] ADD CONSTRAINT [FK_EmailOtps_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260404192841_EmailOtpUserIdFk'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260404192841_EmailOtpUserIdFk', N'8.0.11');
END;
GO

COMMIT;
GO

