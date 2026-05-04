using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VirtualMuseum.API.DTOs;
using VirtualMuseum.Application.Services;
using VirtualMuseum.Domain.Entities;
using VirtualMuseum.Infrastructure.Data;

namespace VirtualMuseum.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArtifactsController : ControllerBase
{
    private readonly ArtifactService _artifactService;
    private readonly MuseumDbContext _db;
    private readonly ILogger<ArtifactsController> _logger;

    public ArtifactsController(
        ArtifactService artifactService,
        MuseumDbContext db,
        ILogger<ArtifactsController> logger)
    {
        _artifactService = artifactService;
        _db = db;
        _logger = logger;
    }

    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<ArtifactResponseDto>>), 200)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var artifacts = await _artifactService.GetAllAsync(cancellationToken);
        var response = artifacts.Select(MapArtifact).ToList();
        return Ok(new ApiResponse<IEnumerable<ArtifactResponseDto>>(true, response));
    }

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiResponse<ArtifactResponseDto>), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var artifact = await _artifactService.GetByIdAsync(id, cancellationToken);
        if (artifact == null)
            return NotFound(new ApiResponse(false, "Artifact not found"));
        return Ok(new ApiResponse<ArtifactResponseDto>(true, MapArtifact(artifact)));
    }

    [HttpGet("top-viewed-3d")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<TopViewed3DArtifactDto>>), 200)]
    public async Task<IActionResult> GetTopViewed3D(CancellationToken cancellationToken)
    {
        var viewCounts = await _db.ArtifactViews
            .AsNoTracking()
            .GroupBy(v => v.ArtifactId)
            .Select(g => new { ArtifactId = g.Key, Views = g.Count() })
            .ToListAsync(cancellationToken);

        var countMap = viewCounts.ToDictionary(x => x.ArtifactId, x => x.Views);

        var artifacts = await _db.Artifacts
            .AsNoTracking()
            .Where(a => a.ModelFileId != null)
            .Select(a => new { a.Id, a.Slug })
            .ToListAsync(cancellationToken);

        var result = artifacts
            .Select(a => new TopViewed3DArtifactDto(
                a.Id,
                a.Slug,
                countMap.TryGetValue(a.Id, out var views) ? views : 0))
            .OrderByDescending(a => a.Views)
            .ThenBy(a => a.Slug)
            .Take(5)
            .ToList();

        return Ok(new ApiResponse<IEnumerable<TopViewed3DArtifactDto>>(true, result));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<Artifact>), 201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] Artifact? artifact, CancellationToken cancellationToken)
    {
        if (artifact == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));
        var created = await _artifactService.CreateAsync(artifact, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, new ApiResponse<ArtifactResponseDto>(true, MapArtifact(created)));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<Artifact>), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(Guid id, [FromBody] Artifact? artifact, CancellationToken cancellationToken)
    {
        if (artifact == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));
        var existing = await _artifactService.GetByIdAsync(id, cancellationToken);
        if (existing == null)
            return NotFound(new ApiResponse(false, "Artifact not found"));
        existing.Slug = artifact.Slug;
        existing.EraId = artifact.EraId;
        existing.CategoryId = artifact.CategoryId;
        existing.MaterialId = artifact.MaterialId;
        existing.DiscoveryLocationId = artifact.DiscoveryLocationId;
        existing.ModelFileId = artifact.ModelFileId;
        existing.ThumbnailFileId = artifact.ThumbnailFileId;
        existing.Height = artifact.Height;
        existing.Width = artifact.Width;
        existing.Depth = artifact.Depth;
        existing.Weight = artifact.Weight;
        existing.CreatedBy = artifact.CreatedBy;
        await _artifactService.UpdateAsync(existing, cancellationToken);
        return Ok(new ApiResponse<ArtifactResponseDto>(true, MapArtifact(existing)));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var artifact = await _artifactService.GetByIdAsync(id, cancellationToken);
        if (artifact == null)
            return NotFound(new ApiResponse(false, "Artifact not found"));
        await _artifactService.DeleteAsync(artifact, cancellationToken);
        return NoContent();
    }

    private static ArtifactResponseDto MapArtifact(Artifact artifact) =>
        new(
            artifact.Id,
            artifact.Slug,
            artifact.EraId,
            artifact.CategoryId,
            artifact.MaterialId,
            artifact.DiscoveryLocationId,
            artifact.ModelFileId,
            artifact.ThumbnailFileId,
            artifact.Height,
            artifact.Width,
            artifact.Depth,
            artifact.Weight,
            artifact.CreatedBy,
            artifact.CreatedAt,
            artifact.Era is null ? null : new NamedRefDto(artifact.Era.Id, artifact.Era.Name),
            artifact.Category is null ? null : new NamedRefDto(artifact.Category.Id, artifact.Category.Name),
            artifact.Material is null ? null : new NamedRefDto(artifact.Material.Id, artifact.Material.Name),
            artifact.DiscoveryLocation is null ? null : new DiscoveryLocationDto(
                artifact.DiscoveryLocation.Id,
                artifact.DiscoveryLocation.Name,
                artifact.DiscoveryLocation.Latitude,
                artifact.DiscoveryLocation.Longitude),
            artifact.ModelFile is null ? null : new FileDto(
                artifact.ModelFile.Id,
                artifact.ModelFile.FileName,
                artifact.ModelFile.FileType,
                artifact.ModelFile.Url,
                artifact.ModelFile.StorageProvider),
            artifact.ThumbnailFile is null ? null : new FileDto(
                artifact.ThumbnailFile.Id,
                artifact.ThumbnailFile.FileName,
                artifact.ThumbnailFile.FileType,
                artifact.ThumbnailFile.Url,
                artifact.ThumbnailFile.StorageProvider),
            artifact.Translations.Select(t => new ArtifactTranslationDto(
                t.Id,
                t.LanguageCode,
                t.Name,
                t.Description,
                t.HistoricalStory)).ToList()
        );

    public sealed record NamedRefDto(Guid Id, string Name);

    public sealed record FileDto(Guid Id, string FileName, string FileType, string Url, string StorageProvider);

    public sealed record DiscoveryLocationDto(
        Guid Id,
        string Name,
        decimal? Latitude,
        decimal? Longitude);

    public sealed record ArtifactTranslationDto(
        Guid Id,
        string LanguageCode,
        string Name,
        string? Description,
        string? HistoricalStory);

    public sealed record ArtifactResponseDto(
        Guid Id,
        string Slug,
        Guid? EraId,
        Guid? CategoryId,
        Guid? MaterialId,
        Guid? DiscoveryLocationId,
        Guid? ModelFileId,
        Guid? ThumbnailFileId,
        decimal? Height,
        decimal? Width,
        decimal? Depth,
        decimal? Weight,
        Guid? CreatedBy,
        DateTime CreatedAt,
        NamedRefDto? Era,
        NamedRefDto? Category,
        NamedRefDto? Material,
        DiscoveryLocationDto? DiscoveryLocation,
        FileDto? ModelFile,
        FileDto? ThumbnailFile,
        List<ArtifactTranslationDto> Translations);

    public sealed record TopViewed3DArtifactDto(
        Guid Id,
        string Slug,
        int Views);
}
