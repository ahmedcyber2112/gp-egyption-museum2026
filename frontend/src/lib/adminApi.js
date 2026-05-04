import { apiRequest } from "./api";

// Categories
export function getAdminCategories() {
    return apiRequest("/api/categories");
}
export function createCategory(payload) {
    return apiRequest("/api/categories", { method: "POST", body: payload });
}
export function updateCategory(id, payload) {
    return apiRequest(`/api/categories/${id}`, { method: "PUT", body: payload });
}
export function deleteCategory(id) {
    return apiRequest(`/api/categories/${id}`, { method: "DELETE" });
}

// Eras
export function getAdminEras() {
    return apiRequest("/api/eras");
}
export function createEra(payload) {
    return apiRequest("/api/eras", { method: "POST", body: payload });
}
export function updateEra(id, payload) {
    return apiRequest(`/api/eras/${id}`, { method: "PUT", body: payload });
}
export function deleteEra(id) {
    return apiRequest(`/api/eras/${id}`, { method: "DELETE" });
}

// Users
export function getAdminUsers() {
    return apiRequest("/api/users");
}
export function updateAdminUser(id, payload) {
    return apiRequest(`/api/users/${id}`, { method: "PUT", body: payload });
}
export function deleteAdminUser(id) {
    return apiRequest(`/api/users/${id}`, { method: "DELETE" });
}

// Artifacts (used by 3D Models page)
export function getAdminArtifacts() {
    return apiRequest("/api/artifacts");
}
export function getTopViewed3DArtifacts() {
    return apiRequest("/api/artifacts/top-viewed-3d");
}
export function createArtifact(payload) {
    return apiRequest("/api/artifacts", { method: "POST", body: payload });
}
export function updateArtifact(id, payload) {
    return apiRequest(`/api/artifacts/${id}`, { method: "PUT", body: payload });
}
export function deleteArtifact(id) {
    return apiRequest(`/api/artifacts/${id}`, { method: "DELETE" });
}

export function getAdminMaterials() {
    return apiRequest("/api/materials");
}

// Files (for 2D/3D asset URL injection)
export function createAdminFile(payload) {
    return apiRequest("/api/files", { method: "POST", body: payload });
}

// Application status (maintenance open/close)
export function getAppStatus() {
    return apiRequest("/api/app-status");
}

export function setAppStatus(payload) {
    return apiRequest("/api/app-status", { method: "PUT", body: payload });
}

