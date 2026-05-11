/** Versionerad nyckel om du ändrar betydelse av värden. */
export const COOKIE_CONSENT_KEY = "tradgardsform.cookieConsent.v1";

/** essential = endast nödvändigt; all = inkl. inbäddad karta (tredje part). */
export type CookieConsentValue = "essential" | "all";

export const COOKIE_CONSENT_EVENT = "tradgardsform-cookie-consent-changed";
export const OPEN_COOKIE_BANNER_EVENT = "tradgardsform-open-cookie-banner";

export function getStoredConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(COOKIE_CONSENT_KEY);
  return v === "essential" || v === "all" ? v : null;
}

export function setStoredConsent(value: CookieConsentValue): void {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}

export function allowsEmbeddedMaps(): boolean {
  return getStoredConsent() === "all";
}
