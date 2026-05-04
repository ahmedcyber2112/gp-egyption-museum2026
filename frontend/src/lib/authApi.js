import { apiRequest } from "./api";

export async function registerUser(payload) {
    return apiRequest("/api/auth/register", {
        method: "POST",
        body: payload,
    });
}

export async function loginUser(payload) {
    return apiRequest("/api/auth/login", {
        method: "POST",
        body: payload,
    });
}

export async function sendOtp(payload) {
    return apiRequest("/api/auth/send-otp", {
        method: "POST",
        body: payload,
    });
}

export async function verifyOtp(payload) {
    return apiRequest("/api/auth/verify-otp", {
        method: "POST",
        body: payload,
    });
}

export async function refreshToken(payload) {
    return apiRequest("/api/auth/refresh-token", {
        method: "POST",
        body: payload,
    });
}

export async function googleLogin(payload) {
    return apiRequest("/api/auth/google-login", {
        method: "POST",
        body: payload,
    });
}

export async function verifyAuthToken() {
    return apiRequest("/api/auth/verify");
}

export async function requestPasswordReset(payload) {
    return apiRequest("/api/auth/forgot-password/request", {
        method: "POST",
        body: payload,
    });
}

export async function resetPasswordWithOtp(payload) {
    return apiRequest("/api/auth/forgot-password/reset", {
        method: "POST",
        body: payload,
    });
}

export async function getMyProfile() {
    return apiRequest("/api/profile/me");
}

export async function updateMyProfile(payload) {
    return apiRequest("/api/profile/me", {
        method: "PUT",
        body: payload,
    });
}
