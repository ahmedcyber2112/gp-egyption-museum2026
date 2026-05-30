import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { DEFAULT_API_BASE_URL, normalizeApiBaseUrl } from "./lib/apiConfig";

const API_BASE = normalizeApiBaseUrl(
    process.env.NEXT_INTERNAL_API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        DEFAULT_API_BASE_URL,
);

const EXEMPT_PREFIXES = [
    "/_next",
    "/api",
    "/api-proxy",
    "/assets",
    "/maintenance",
    "/Signin",
    "/Signup",
    "/forgot-password",
    "/reset-password",
    "/dashboard",
    "/admin",
    "/admincategories",
    "/Models3D",
    "/Users",
    "/workflow",
    "/chatbot",
    "/HistoricalEras",
    "/Reports",
    "/bookings",
    "/settings",
];

function isExemptPath(pathname: string) {
    if (pathname === "/favicon.ico" || pathname === "/robots.txt") {
        return true;
    }
    return EXEMPT_PREFIXES.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );
}

export async function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    if (isExemptPath(pathname)) {
        return NextResponse.next();
    }

    // Public museum pages should not wait on a live API check before HTML is sent.
    const isPublicBrowse =
        pathname === "/" ||
        pathname.startsWith("/ViewAllCategories") ||
        pathname.startsWith("/artifacts") ||
        pathname.startsWith("/favorites") ||
        pathname.startsWith("/Love") ||
        pathname.startsWith("/community");
    if (isPublicBrowse) {
        return NextResponse.next();
    }

    try {
        const res = await fetch(`${API_BASE}/api/app-status`, {
            method: "GET",
            headers: { Accept: "application/json" },
            next: { revalidate: 45 },
        });

        if (!res.ok) {
            return NextResponse.next();
        }

        const payload = await res.json();
        const maintenanceEnabled = !!payload?.data?.maintenanceEnabled;

        if (!maintenanceEnabled) {
            return NextResponse.next();
        }

        const url = request.nextUrl.clone();
        url.pathname = "/maintenance";
        url.searchParams.set("from", `${pathname}${search}`);
        return NextResponse.redirect(url);
    } catch {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/((?!.*\\..*).*)"],
};

