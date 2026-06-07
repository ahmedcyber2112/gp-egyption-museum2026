"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const CLIENT_ID = (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "").trim();
const APP_CALLBACK = "com.example.virtual_museum:/google-auth";

function returnToApp(params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  window.location.href = query ? `${APP_CALLBACK}?${query}` : APP_CALLBACK;
}

export default function MobileGoogleAuthPage() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Loading Google Sign-In…");

  useEffect(() => {
    if (!CLIENT_ID) {
      setStatus("Google client is not configured on the server.");
      returnToApp({ error: "no_client_id" });
      return;
    }

    let cancelled = false;
    let attempts = 0;

    const connect = () => {
      if (cancelled) return;
      const g = window.google?.accounts?.id;
      if (!g) {
        attempts += 1;
        if (attempts < 40) {
          window.setTimeout(connect, 250);
          return;
        }
        setStatus("Could not load Google Sign-In.");
        returnToApp({ error: "gsi_load_failed" });
        return;
      }

      g.initialize({
        client_id: CLIENT_ID,
        callback: (response: { credential?: string }) => {
          const idToken = response?.credential;
          if (!idToken) {
            returnToApp({ error: "no_token" });
            return;
          }
          returnToApp({ id_token: idToken });
        },
        auto_select: false,
        cancel_on_tap_outside: false,
        context: "signin",
      });

      if (buttonRef.current) {
        buttonRef.current.innerHTML = "";
        g.renderButton(buttonRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "pill",
          width: 300,
        });
      }

      setStatus("Choose your Google account to return to the app.");
    };

    connect();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#f2f2f5] px-6 py-10">
        <div className="w-full max-w-sm rounded-2xl bg-white border border-gray-200 shadow-sm p-8 text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Grand Egyptian Museum</h1>
          <p className="text-sm text-gray-600 mb-6">{status}</p>
          <div ref={buttonRef} className="flex justify-center min-h-[44px]" />
        </div>
      </main>
    </>
  );
}
