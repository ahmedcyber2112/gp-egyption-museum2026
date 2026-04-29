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

function normalizeImageUrl(value) {
    const url = String(value || "").trim();
    if (!url) return "";

    // Convert Google Drive share URLs to direct image endpoints.
    const match = url.match(/[?&]id=([^&]+)/i);
    if (url.includes("drive.google.com") && match?.[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w2000`;
    }

    return url;
}

export function mapApiArtifactToUi(artifact) {
    const translation = firstTranslation(artifact);
    const displayName = translation?.name || artifact?.slug || "Artifact";
    const storyKing = translation?.historicalStory?.trim() || "Unknown";

    return {
        id: artifact?.id || "",
        categoryId: artifact?.categoryId || artifact?.category?.id || "",
        categoryName: artifact?.category?.name || "Artifact",
        name: displayName,
        description: translation?.description || "No description available.",
        image:
            normalizeImageUrl(artifact?.thumbnailFile?.url) ||
            normalizeImageUrl(artifact?.thumbnailFileUrl) ||
            "/assets/images/eh.png",
        accessionNumber: artifact?.slug || "N/A",
        period: artifact?.era?.name || "Unknown Era",
        associatedKing: storyKing,
        material: artifact?.material?.name || "Unknown",
        dimensions: {
            height: toDimensionValue(artifact?.height),
            width: toDimensionValue(artifact?.width),
            depth: toDimensionValue(artifact?.depth),
            weight: toDimensionValue(artifact?.weight),
        },
        discoverySite: artifact?.discoveryLocation?.name || "Unknown Site",
        image3D:
            normalizeImageUrl(artifact?.modelFile?.url) ||
            normalizeImageUrl(artifact?.modelFileUrl) ||
            null,
        status: "published",
    };
}
