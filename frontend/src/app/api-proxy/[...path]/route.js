import { NextResponse } from "next/server";
import { getRemoteApiBaseUrl } from "../../../lib/apiConfig";

export const runtime = "nodejs";

function buildTargetUrl(pathSegments, search) {
    const remote = getRemoteApiBaseUrl();
    const path = pathSegments.join("/");
    const query = search || "";
    return `${remote}/${path}${query}`;
}

async function proxyRequest(request, context) {
    const { path = [] } = await context.params;
    const targetUrl = buildTargetUrl(path, request.nextUrl.search);

    const headers = new Headers();
    request.headers.forEach((value, key) => {
        const lower = key.toLowerCase();
        if (lower === "host" || lower === "connection") return;
        headers.set(key, value);
    });

    const init = {
        method: request.method,
        headers,
        redirect: "manual",
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
        init.body = await request.arrayBuffer();
    }

    const upstream = await fetch(targetUrl, init);
    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");

    return new NextResponse(upstream.body, {
        status: upstream.status,
        headers: responseHeaders,
    });
}

export async function GET(request, context) {
    return proxyRequest(request, context);
}

export async function POST(request, context) {
    return proxyRequest(request, context);
}

export async function PUT(request, context) {
    return proxyRequest(request, context);
}

export async function PATCH(request, context) {
    return proxyRequest(request, context);
}

export async function DELETE(request, context) {
    return proxyRequest(request, context);
}

export async function OPTIONS(request, context) {
    return proxyRequest(request, context);
}
