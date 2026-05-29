import {
    clearAuthSession,
    getAccessToken,
    getRefreshToken,
    setAuthSession,
} from "./authStorage";
import {
    DEFAULT_API_BASE_URL,
    FALLBACK_API_BASE_URL,
    normalizeApiBaseUrl,
} from "./apiConfig";

function getApiBaseUrl() {
    const fromPublic = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fromInternal = process.env.NEXT_INTERNAL_API_BASE_URL;
    const selected =
        typeof window === "undefined"
            ? fromInternal || fromPublic || DEFAULT_API_BASE_URL
            : fromPublic || DEFAULT_API_BASE_URL;
    return normalizeApiBaseUrl(selected);
}

export class ApiError extends Error {
    constructor(message, status, details = null) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.details = details;
    }
}

async function parsePayload(response) {
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    return isJson ? await response.json() : null;
}

async function sendRequest(url, method, headers, body) {
    return fetch(url, {
        method,
        headers,
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
}

function getCandidateBaseUrls() {
    const configured = getApiBaseUrl();
    return [...new Set([configured, DEFAULT_API_BASE_URL, FALLBACK_API_BASE_URL])];
}

async function tryRefreshToken(baseUrl) {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        return null;
    }

    const refreshResponse = await fetch(`${baseUrl}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    });

    const refreshPayload = await parsePayload(refreshResponse);
    if (
        !refreshResponse.ok ||
        !refreshPayload?.success ||
        !refreshPayload?.data
    ) {
        clearAuthSession();
        return null;
    }

    setAuthSession(refreshPayload.data);
    return refreshPayload.data.accessToken;
}

export async function apiRequest(path, options = {}) {
    const {
        method = "GET",
        body,
        token,
        headers = {},
        retryOnAuthError = true,
    } = options;
    const candidateBases = getCandidateBaseUrls();
    const lastBase = candidateBases[candidateBases.length - 1];
    const primaryBase = candidateBases[0];

    const bearer = token || getAccessToken();
    const requestHeaders = {
        "Content-Type": "application/json",
        ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
        ...headers,
    };

    let response = null;
    let payload = null;
    let lastNetworkError = null;
    for (const base of candidateBases) {
        const candidateUrl = `${base}${path}`;
        try {
            const candidateResponse = await sendRequest(
                candidateUrl,
                method,
                requestHeaders,
                body,
            );
            const candidatePayload = await parsePayload(candidateResponse);

            // Retry on other base URLs when this host is clearly wrong for API routing.
            if (candidateResponse.status === 404 && base !== lastBase) {
                continue;
            }
            // Some deployments misconfigure NEXT_PUBLIC_API_BASE_URL to a frontend host
            // that returns HTML with 200 OK. In that case payload is null (non-JSON) and
            // we should try other candidate API hosts.
            if (
                candidateResponse.ok &&
                candidatePayload === null &&
                base !== lastBase
            ) {
                continue;
            }

            response = candidateResponse;
            payload = candidatePayload;
            break;
        } catch (networkError) {
            lastNetworkError = networkError;
            if (base === lastBase) {
                throw networkError;
            }
        }
    }

    if (!response) {
        throw lastNetworkError || new Error("Unable to reach API host.");
    }

    if (response.status === 401 && retryOnAuthError) {
        const newAccessToken = await tryRefreshToken(primaryBase);
        if (newAccessToken) {
            const retryHeaders = {
                ...requestHeaders,
                Authorization: `Bearer ${newAccessToken}`,
            };
            response = await sendRequest(
                `${primaryBase}${path}`,
                method,
                retryHeaders,
                body,
            );
            payload = await parsePayload(response);
        }
    }

    if (!response.ok) {
        const message =
            payload?.message || `Request failed with status ${response.status}`;
        throw new ApiError(message, response.status, payload?.details || null);
    }

    return payload;
}

export function getConfiguredApiBaseUrl() {
    return getApiBaseUrl();
}
