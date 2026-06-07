import { Suspense } from "react";
import MobileGoogleReturnClient from "./MobileGoogleReturnClient";

export default function MobileGoogleReturnPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-[#f2f2f5]">
          <p className="text-sm text-gray-600">Returning to the app…</p>
        </main>
      }
    >
      <MobileGoogleReturnClient />
    </Suspense>
  );
}
