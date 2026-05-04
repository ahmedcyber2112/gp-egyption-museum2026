/**
 * Hero "Sacred Galleries" cards and matching category grids use these remote images.
 * Keys matched case-insensitively on category name from API.
 */
export const GALLERY_CARD_IMAGES_BY_CATEGORY_NAME: Record<string, string> = {
    "Main Exhibition Halls":
        "https://artdogistanbul.com/wp-content/uploads/2025/11/grand-egyptian-museum-galleries-1-2048x1466-1-1024x733.webp",
    "Grand Atrium & Entrance":
        "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/15/b6/f9/cd.jpg",
    "Journey to Eternity":
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/c6/e3/b4/caption.jpg?w=800&h=800&s=1",
};

export const DEFAULT_GALLERY_CARD_IMAGE = "/assets/images/eh.png";

export function resolveGalleryCardImage(categoryName: string): string {
    const trimmed = (categoryName || "").trim();
    if (!trimmed) return DEFAULT_GALLERY_CARD_IMAGE;

    const key = Object.keys(GALLERY_CARD_IMAGES_BY_CATEGORY_NAME).find(
        (k) => k.toLowerCase() === trimmed.toLowerCase(),
    );
    return key
        ? GALLERY_CARD_IMAGES_BY_CATEGORY_NAME[key]
        : DEFAULT_GALLERY_CARD_IMAGE;
}
