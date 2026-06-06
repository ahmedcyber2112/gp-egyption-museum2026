const SESSION_KEY = "gem_ai_session_id";

export function createAiSessionId() {
    return `web-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function getStoredAiSessionId() {
    if (typeof window === "undefined") return null;
    try {
        const id = sessionStorage.getItem(SESSION_KEY);
        return id && id.trim() ? id.trim() : null;
    } catch {
        return null;
    }
}

export function getOrCreateAiSessionId() {
    const existing = getStoredAiSessionId();
    if (existing) return existing;
    const created = createAiSessionId();
    setStoredAiSessionId(created);
    return created;
}

export function setStoredAiSessionId(sessionId) {
    if (typeof window === "undefined") return;
    try {
        sessionStorage.setItem(SESSION_KEY, sessionId);
    } catch {
        // ignore quota / private mode
    }
}

export function startNewAiSession() {
    const sessionId = createAiSessionId();
    setStoredAiSessionId(sessionId);
    return sessionId;
}
