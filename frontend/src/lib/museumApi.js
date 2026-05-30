import { apiRequest } from "./api";
import { cachedMuseumRequest } from "./museumCache";

export async function getArtifacts() {
    return cachedMuseumRequest("/api/artifacts", () => apiRequest("/api/artifacts"));
}

export async function getArtifactById(id) {
    return cachedMuseumRequest(`/api/artifacts/${id}`, () =>
        apiRequest(`/api/artifacts/${id}`),
    );
}

export async function getCategories() {
    return cachedMuseumRequest("/api/categories", () => apiRequest("/api/categories"));
}
