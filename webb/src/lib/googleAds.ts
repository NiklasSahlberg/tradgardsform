import { getStoredConsent } from "@/lib/cookieConsent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Samma nivå som karta + annons/reklam-cookies — bara efter ”Acceptera alla”. */
export function canUseGoogleAds(): boolean {
  return getStoredConsent() === "all";
}

/**
 * Anropa när intresseanmälan / lead är bekräftat skickat.
 * Gör inget om samtycke eller env saknas eller gtag inte laddat ännu.
 */
export function fireGoogleAdsConversion(): void {
  if (typeof window === "undefined") return;
  if (!canUseGoogleAds()) return;

  const id = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (!id || !label) return;

  const sendTo = `${id}/${label}`;
  const send = () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: sendTo,
      });
    }
  };

  send();
  // gtag kan ladda asynkront precis efter samtycke — en extra försök
  window.setTimeout(send, 200);
}
