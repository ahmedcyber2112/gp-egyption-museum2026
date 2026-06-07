"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { buildMobileAppDeepLink } from "@/src/lib/mobileGoogleAuth";

export default function MobileGoogleReturnClient() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Returning to the app…");

  const deepLink = useMemo(() => {
    const params: Record<string, string> = {};
    for (const key of ["id_token", "error"]) {
      const value = searchParams.get(key);
      if (value) params[key] = value;
    }
    return buildMobileAppDeepLink(params);
  }, [searchParams]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.replace(deepLink);
    }, 150);

    const fallback = window.setTimeout(() => {
      setMessage("If the app did not open, tap the button below.");
    }, 2500);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(fallback);
    };
  }, [deepLink]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f2f2f5] px-6 py-10">
      <div className="w-full max-w-sm rounded-2xl bg-white border border-gray-200 shadow-sm p-8 text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Grand Egyptian Museum</h1>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <a
          href={deepLink}
          className="inline-flex items-center justify-center rounded-full bg-[#1a1a2e] px-6 py-3 text-sm font-semibold text-white"
        >
          Open app
        </a>
      </div>
    </main>
  );
}
