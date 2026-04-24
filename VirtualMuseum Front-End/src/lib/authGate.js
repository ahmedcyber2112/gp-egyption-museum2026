const POST_LOGIN_REDIRECT_KEY = "postLoginRedirect";
const POST_LOGIN_ACTION_KEY = "postLoginAction";

export function setPostLoginRedirect(path) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(POST_LOGIN_REDIRECT_KEY, path);
}

export function consumePostLoginRedirect() {
    if (typeof window === "undefined") return null;
    const value = sessionStorage.getItem(POST_LOGIN_REDIRECT_KEY);
    if (!value) return null;
    sessionStorage.removeItem(POST_LOGIN_REDIRECT_KEY);
    return value;
}

export function setPostLoginAction(action) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(POST_LOGIN_ACTION_KEY, JSON.stringify(action));
}

export function consumePostLoginAction() {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(POST_LOGIN_ACTION_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(POST_LOGIN_ACTION_KEY);
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}
