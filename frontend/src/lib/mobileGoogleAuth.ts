export const MOBILE_APP_SCHEME = "com.example.virtual_museum";
export const MOBILE_APP_CALLBACK_HOST = "google-auth";

/** Deep link the Flutter app listens for (must use `://`, not `:/`). */
export function buildMobileAppDeepLink(params: Record<string, string>): string {
  const query = new URLSearchParams(params).toString();
  return `${MOBILE_APP_SCHEME}://${MOBILE_APP_CALLBACK_HOST}${query ? `?${query}` : ""}`;
}

/** HTTPS hop so the browser never treats the scheme as a relative path. */
export function buildMobileReturnUrl(params: Record<string, string>): string {
  const query = new URLSearchParams(params).toString();
  const path = "/auth/mobile-google/return";
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path}${query ? `?${query}` : ""}`;
  }
  return `https://egyptianmuseum.me${path}${query ? `?${query}` : ""}`;
}

export function openMobileApp(params: Record<string, string>) {
  const httpsReturn = buildMobileReturnUrl(params);
  window.location.replace(httpsReturn);
}
