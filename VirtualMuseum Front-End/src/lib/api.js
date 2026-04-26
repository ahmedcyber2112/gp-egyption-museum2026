import {
    clearAuthSession,
    getAccessToken,
    getRefreshToken,
    setAuthSession,
} from "./authStorage";

const DEFAULT_API_BASE_URL = "http://localhost:8090";

function getApiBaseUrl() {
    const fromPublic = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fromInternal = process.env.NEXT_INTERNAL_API_BASE_URL;
    const selected =
        typeof window === "undefined"
            ? fromInternal || fromPublic || DEFAULT_API_BASE_URL
            : fromPublic || DEFAULT_API_BASE_URL;
    const normalized = selected.trim();
    return normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
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
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}${path}`;

    const bearer = token || getAccessToken();
    const requestHeaders = {
        "Content-Type": "application/json",
        ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
        ...headers,
    };

    let response = await sendRequest(url, method, requestHeaders, body);
    let payload = await parsePayload(response);

    if (response.status === 401 && retryOnAuthError) {
        const newAccessToken = await tryRefreshToken(baseUrl);
        if (newAccessToken) {
            const retryHeaders = {
                ...requestHeaders,
                Authorization: `Bearer ${newAccessToken}`,
            };
            response = await sendRequest(url, method, retryHeaders, body);
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
