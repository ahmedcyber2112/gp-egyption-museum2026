const TTL_MS = 60_000;
const store = new Map();

export function getCachedMuseum(key) {
    const entry = store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expires) {
        store.delete(key);
        return null;
    }
    return entry.data;
}

export function setCachedMuseum(key, data, ttlMs = TTL_MS) {
    store.set(key, { data, expires: Date.now() + ttlMs });
}

export async function cachedMuseumRequest(key, loader) {
    const hit = getCachedMuseum(key);
    if (hit) return hit;
    const data = await loader();
    setCachedMuseum(key, data);
    return data;
}
