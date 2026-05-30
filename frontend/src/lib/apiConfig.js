/** Default backend API (Heroku). The live app name is "muesum" (typo on Heroku). */
export const DEFAULT_API_BASE_URL =
    "https://muesum-a252b23f7b32.herokuapp.com";

export const FALLBACK_API_BASE_URL = "https://egymuseum.runasp.net";

/** Browser calls go through Next.js rewrite — same origin, no CORS / OPTIONS to Heroku. */
export const BROWSER_API_PROXY_PREFIX = "/api-proxy";

/** Heroku hostname typo: "museum" host 404s; real API is "muesum". */
const WRONG_HEROKU_HOST = "museum-a252b23f7b32.herokuapp.com";
const CORRECT_HEROKU_HOST = "muesum-a252b23f7b32.herokuapp.com";

export function normalizeApiBaseUrl(url) {
    const trimmed = (url || "").trim();
    const withoutSlash = trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
    return withoutSlash.replace(WRONG_HEROKU_HOST, CORRECT_HEROKU_HOST);
}

export function getDefaultApiBaseUrls() {
    return [
        ...new Set([
            DEFAULT_API_BASE_URL,
            FALLBACK_API_BASE_URL,
        ].map(normalizeApiBaseUrl)),
    ];
}

export function getRemoteApiBaseUrl() {
    const fromPublic =
        typeof process.env.NEXT_PUBLIC_API_BASE_URL === "string"
            ? process.env.NEXT_PUBLIC_API_BASE_URL.trim()
            : "";
    return normalizeApiBaseUrl(fromPublic || DEFAULT_API_BASE_URL);
}
