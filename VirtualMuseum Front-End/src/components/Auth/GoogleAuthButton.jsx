"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { googleLogin } from "../../lib/authApi";
import { setAuthSession } from "../../lib/authStorage";
import { consumePostLoginRedirect } from "../../lib/authGate";

function getGoogleClientId() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    return (clientId || "").trim();
}

export default function GoogleAuthButton({ variant = "default" }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);

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
                window.dispatchEvent(new Event("auth:logged-in"));
                const nextPath =
                    searchParams.get("next") || consumePostLoginRedirect();
                if ((response.data.role || "").toLowerCase() === "admin") {
                    router.push("/dashboard");
                } else {
                    router.push(nextPath || "/");
                }
            } catch (e) {
                setError(e?.message || "Google login failed.");
            } finally {
                setLoading(false);
            }
        },
        [router, searchParams],
    );

    useEffect(() => {
        if (!clientId || typeof window === "undefined") return;
        let cancelled = false;
        let attempts = 0;
        const connectGoogle = () => {
            if (cancelled) return;
            const g = window.google?.accounts?.id;
            if (!g) {
                attempts += 1;
                if (attempts < 30) {
                    setTimeout(connectGoogle, 300);
                } else {
                    setError("Google sign-in failed to initialize.");
                }
                return;
            }

            g.initialize({
                client_id: clientId,
                callback: handleCredential,
                auto_select: false,
                cancel_on_tap_outside: true,
            });
            setReady(true);
        };
        connectGoogle();
        return () => {
            cancelled = true;
        };
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
        if (!g || !ready) {
            setError("Google sign-in is still loading. Please try again.");
            return;
        }

        // Trigger Google's One Tap / popup chooser
        g.prompt((notification) => {
            if (notification?.isNotDisplayed?.() || notification?.isSkippedMoment?.()) {
                setError("Google popup was blocked. Please allow popups and try again.");
            }
        });
    }, [clientId, ready]);

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
                        ? "w-full bg-white border border-gray-200 text-gray-700 py-2 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 hover:bg-gray-50 transition-all active:scale-[0.99] disabled:opacity-70"
                        : "w-full bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 hover:bg-gray-50 transition-all active:scale-[0.99] disabled:opacity-70"
                }>
                <svg className="w-4 h-4" viewBox="0 0 18 18" aria-hidden="true">
                    <path fill="#EA4335" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62z"/>
                    <path fill="#4285F4" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/>
                    <path fill="#FBBC05" d="M3.97 10.71A5.41 5.41 0 0 1 3.7 9c0-.59.1-1.16.27-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3.01-2.33z"/>
                    <path fill="#34A853" d="M9 3.58c1.32 0 2.5.45 3.43 1.33l2.57-2.57C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
                </svg>
                {loading ? "Connecting..." : "Continue with Google"}
            </button>
        </div>
    );
}

