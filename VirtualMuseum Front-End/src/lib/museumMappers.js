import artifactsData from "../Data/artifacts.json";

function firstTranslation(artifact) {
    if (
        !Array.isArray(artifact?.translations) ||
        artifact.translations.length === 0
    ) {
        return null;
    }

    return (
        artifact.translations.find((item) => item?.languageCode === "en") ||
        artifact.translations[0]
    );
}

function toDimensionValue(value) {
    if (value === null || value === undefined) return "N/A";
    return String(value);
}

function slugify(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

const artifactBySlug = new Map(
    artifactsData.map((item) => [slugify(item?.name), item]),
);

export function mapApiArtifactToUi(artifact) {
    const translation = firstTranslation(artifact);
    const displayName = translation?.name || artifact?.slug || "Artifact";
    const fallbackArtifact = artifactBySlug.get(slugify(displayName));
    const storyKing = translation?.historicalStory?.trim();

    return {
        id: artifact?.id || "",
        categoryId: artifact?.categoryId || artifact?.category?.id || "",
        categoryName: artifact?.category?.name || "Artifact",
        name: displayName,
        description: translation?.description || "No description available.",
        image:
            artifact?.thumbnailFile?.url ||
            fallbackArtifact?.image ||
            "/assets/images/eh.png",
        accessionNumber:
            fallbackArtifact?.accessionNumber || artifact?.slug || "N/A",
        period: artifact?.era?.name || "Unknown Era",
        associatedKing: storyKing || fallbackArtifact?.associatedKing || "Unknown",
        material: artifact?.material?.name || fallbackArtifact?.material || "Unknown",
        dimensions: {
            height: toDimensionValue(artifact?.height),
            width: toDimensionValue(artifact?.width),
            depth: toDimensionValue(artifact?.depth),
            weight: toDimensionValue(artifact?.weight),
        },
        discoverySite:
            artifact?.discoveryLocation?.name ||
            fallbackArtifact?.discoverySite ||
            "Unknown Site",
        image3D: artifact?.modelFile?.url || fallbackArtifact?.image3D || null,
        status: "published",
    };
}
