"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { googleLogin } from "../../lib/authApi";
import { setAuthSession } from "../../lib/authStorage";

function getGoogleClientId() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    return (clientId || "").trim();
}

export default function GoogleAuthButton({ variant = "default" }) {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const clientId = useMemo(() => getGoogleClientId(), []);

    const handleCredential = useCallback(
        async (credentialResponse) => {
            const idToken = credentialResponse?.credential;
            if (!idToken) {
                setError("Google sign-in failed. Please try again.");
                return;
            }

            setError("");
            setLoading(true);
            try {
                const response = await googleLogin({ idToken });
                if (!response?.success || !response?.data) {
                    throw new Error(response?.message || "Google login failed.");
                }

                setAuthSession(response.data);
                if ((response.data.role || "").toLowerCase() === "admin") {
                    router.push("/dashboard");
                } else {
                    router.push("/");
                }
            } catch (e) {
                setError(e?.message || "Google login failed.");
            } finally {
                setLoading(false);
            }
        },
        [router],
    );

    useEffect(() => {
        // We don't render Google's own button; we just use the library to get an ID token.
        // The script is loaded in (auth)/layout.tsx.
        if (!clientId) return;
        if (typeof window === "undefined") return;
        const g = window.google?.accounts?.id;
        if (!g) return;

        g.initialize({
            client_id: clientId,
            callback: handleCredential,
        });
    }, [clientId, handleCredential]);

    const onClick = useCallback(() => {
        setError("");
        if (!clientId) {
            setError(
                "Google client id is not configured. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID.",
            );
            return;
        }
        const g = window.google?.accounts?.id;
        if (!g) {
            setError("Google sign-in is still loading. Please try again.");
            return;
        }

        // Trigger One Tap / popup flow.
        g.prompt();
    }, [clientId]);

    return (
        <div className="space-y-2">
            {error ? (
                <div className="bg-red-50 border border-red-200 p-2 rounded-lg text-red-700 text-xs sm:text-sm font-medium">
                    {error}
                </div>
            ) : null}

            <button
                type="button"
                onClick={onClick}
                disabled={loading}
                className={
                    variant === "compact"
                        ? "w-full bg-white border border-gray-200 text-gray-700 py-1.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-70"
                        : "w-full bg-white border border-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-70"
                }>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="#1f2937" />
                    <circle cx="12" cy="12" r="9" fill="white" />
                    <path
                        d="M7 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0z"
                        fill="#EA4335"
                    />
                    <circle cx="16" cy="12" r="2" fill="#34A853" />
                    <circle cx="8" cy="8" r="2" fill="#FBBC05" />
                </svg>
                {loading ? "Connecting..." : "Google"}
            </button>
        </div>
    );
}

