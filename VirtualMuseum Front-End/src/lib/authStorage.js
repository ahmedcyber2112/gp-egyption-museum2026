const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "currentUser";

export function setAuthSession(authData) {
    if (typeof window === "undefined") return;

    const existingUser = getCurrentUser();

    // Tokens are kept in sessionStorage to reduce persistence risk on shared devices.
    sessionStorage.setItem(ACCESS_TOKEN_KEY, authData.accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, authData.refreshToken);
    localStorage.setItem(
        USER_KEY,
        JSON.stringify({
            userId: authData.userId,
            email: authData.email,
            fullName: authData.fullName,
            role: authData.role,
            region: authData.region ?? existingUser?.region ?? "",
        }),
    );

    // Keep compatibility with existing navbar/session logic.
    localStorage.setItem("userName", authData.fullName || "User");
    localStorage.setItem("isLoggedIn", "true");
}

export function clearAuthSession() {
    if (typeof window === "undefined") return;

    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
}

export function getCurrentUser() {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function isLoggedIn() {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("isLoggedIn") === "true" && !!getAccessToken();
}

export function getAccessToken() {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
}
