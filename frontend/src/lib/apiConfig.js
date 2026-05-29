/** Default backend API (Heroku). Override with NEXT_PUBLIC_API_BASE_URL in production. */
export const DEFAULT_API_BASE_URL =
    "https://muesum-a252b23f7b32.herokuapp.com";

export const FALLBACK_API_BASE_URL = "https://egymuseum.runasp.net";

export function normalizeApiBaseUrl(url) {
    const trimmed = (url || "").trim();
    return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

export function getDefaultApiBaseUrls() {
    return [
        ...new Set([
            DEFAULT_API_BASE_URL,
            FALLBACK_API_BASE_URL,
        ].map(normalizeApiBaseUrl)),
    ];
}
