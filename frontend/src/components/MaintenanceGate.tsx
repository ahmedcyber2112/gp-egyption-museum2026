"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
    clearAuthSession,
    getCurrentUser,
} from "../lib/authStorage";

function apiBaseUrls(): string[] {
    const fromEnv =
        typeof process.env.NEXT_PUBLIC_API_BASE_URL === "string"
            ? process.env.NEXT_PUBLIC_API_BASE_URL.trim()
            : "";
    const defaults = [
        "https://egymuseum.runasp.net",
        "https://virtualmuseum.runasp.net",
    ];

    const list = [...(fromEnv ? [fromEnv] : []), ...defaults];
    return [...new Set(list.map((x) => (x.endsWith("/") ? x.slice(0, -1) : x)))];
}

function isExcludedPath(pathname: string): boolean {
    const p = pathname || "";

    const role = (getCurrentUser()?.role || "").toLowerCase();
    if (role === "admin") return true;

    if (
        p === "/Signin" ||
        p.startsWith("/Signin/") ||
        p === "/Signup" ||
        p.startsWith("/Signup/") ||
        p === "/forgot-password" ||
        p.startsWith("/forgot-password/") ||
        p === "/reset-password" ||
        p.startsWith("/reset-password/") ||
        p === "/maintenance" ||
        p.startsWith("/maintenance/")
    ) {
        return true;
    }

    /* Admin SPA routes remain reachable for non-admin only after server guard — keep blocked when closed. */

    return false;
}

export default function MaintenanceGate() {
    const pathname = usePathname();
    const router = useRouter();
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const bases = useMemo(() => apiBaseUrls(), []);

    useEffect(() => {
        async function probe(): Promise<boolean> {
            let lastMaintenance = false;

            for (const base of bases) {
                try {
                    const res = await fetch(`${base}/api/app-status`, {
                        method: "GET",
                        headers: { Accept: "application/json" },
                        cache: "no-store",
                    });
                    const payload = await res.json().catch(() => null);
                    const maintenanceEnabled = !!payload?.data?.maintenanceEnabled;
                    if (maintenanceEnabled) return true;

                    lastMaintenance = maintenanceEnabled;

                    // If backend responded normally, prefer this host answer.
                    if (res.ok) return maintenanceEnabled;

                    continue;
                } catch {
                    continue;
                }
            }

            return lastMaintenance;
        }

        async function evaluate() {
            if (!pathname || isExcludedPath(pathname)) return;

            const maintenanceEnabled = await probe();
            if (!maintenanceEnabled) return;

            clearAuthSession();
            window.dispatchEvent(new Event("storage"));

            const from = pathname + window.location.search;

            router.replace(
                `/maintenance?from=${encodeURIComponent(from)}`,
            );
        }

        evaluate();

        if (pathname && !isExcludedPath(pathname)) {
            intervalRef.current = window.setInterval(() => evaluate(), 8000);
        }

        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
        };
    }, [pathname, bases, router]);

    return null;
}
