const ADMIN_NOTIFICATIONS_KEY = "admin_notifications";
const ADMIN_BOOKINGS_KEY = "admin_bookings";

function safeRead(key) {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function safeWrite(key, value) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
}

export function getAdminNotifications() {
    return safeRead(ADMIN_NOTIFICATIONS_KEY);
}

export function pushAdminNotification(notification) {
    const list = getAdminNotifications();
    const item = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        createdAt: new Date().toISOString(),
        ...notification,
    };
    safeWrite(ADMIN_NOTIFICATIONS_KEY, [item, ...list].slice(0, 50));
    return item;
}

export function removeAdminNotification(id) {
    const list = getAdminNotifications().filter((n) => n.id !== id);
    safeWrite(ADMIN_NOTIFICATIONS_KEY, list);
}

export function getAdminBookings() {
    return safeRead(ADMIN_BOOKINGS_KEY);
}

export function pushAdminBooking(booking) {
    const list = getAdminBookings();
    const item = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        createdAt: new Date().toISOString(),
        ...booking,
    };
    safeWrite(ADMIN_BOOKINGS_KEY, [item, ...list].slice(0, 200));
    return item;
}
