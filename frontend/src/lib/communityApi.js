import { getAccessToken } from "./authStorage";
import { apiRequest } from "./api";
import { BROWSER_API_PROXY_PREFIX, getRemoteApiBaseUrl, normalizeApiBaseUrl } from "./apiConfig";

function getUploadBaseUrl() {
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_DIRECT !== "true") {
        return BROWSER_API_PROXY_PREFIX;
    }
    const fromPublic =
        typeof process.env.NEXT_PUBLIC_API_BASE_URL === "string"
            ? process.env.NEXT_PUBLIC_API_BASE_URL.trim()
            : "";
    return normalizeApiBaseUrl(fromPublic || getRemoteApiBaseUrl());
}

function buildUrl(path) {
    const base = getUploadBaseUrl();
    if (base === BROWSER_API_PROXY_PREFIX) {
        return `${BROWSER_API_PROXY_PREFIX}${path}`;
    }
    return `${base}${path}`;
}

export function getCommunityPosts({ take = 50 } = {}) {
    const params = new URLSearchParams();
    params.set("take", String(take));
    return apiRequest(`/api/community/posts?${params.toString()}`);
}

export function createCommunityPost({ content, imageUrl, location }) {
    return apiRequest("/api/community/posts", {
        method: "POST",
        body: {
            content: content || "",
            imageUrl: imageUrl || null,
            location: location || null,
        },
    });
}

export function addCommunityComment(postId, text) {
    return apiRequest(`/api/community/posts/${postId}/comments`, {
        method: "POST",
        body: { text },
    });
}

export function setCommunityReaction(postId, reactionType) {
    return apiRequest(`/api/community/posts/${postId}/reactions`, {
        method: "PUT",
        body: { reactionType },
    });
}

export async function uploadCommunityImage(file) {
    const token = getAccessToken();
    if (!token) {
        throw new Error("Not authenticated");
    }

    const form = new FormData();
    form.append("file", file);

    const response = await fetch(buildUrl("/api/community/upload"), {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: form,
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.success || !payload?.data?.url) {
        throw new Error(payload?.message || "Image upload failed");
    }

    return payload.data.url;
}
