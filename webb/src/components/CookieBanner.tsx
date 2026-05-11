"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  COOKIE_CONSENT_EVENT,
  getStoredConsent,
  OPEN_COOKIE_BANNER_EVENT,
  setStoredConsent,
  type CookieConsentValue,
} from "@/lib/cookieConsent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  const syncVisibility = useCallback(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  useEffect(() => {
    syncVisibility();

    const onConsentChanged = () => syncVisibility();
    const onOpenSettings = () => setVisible(true);

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsentChanged);
    window.addEventListener(OPEN_COOKIE_BANNER_EVENT, onOpenSettings);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, onConsentChanged);
      window.removeEventListener(OPEN_COOKIE_BANNER_EVENT, onOpenSettings);
    };
  }, [syncVisibility]);

  const choose = (value: CookieConsentValue) => {
    setStoredConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[300] border-t border-sand-dark/25 bg-cream/98 px-4 py-4 shadow-[0_-8px_32px_-8px_rgba(61,80,48,0.18)] backdrop-blur-md md:px-6"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="min-w-0">
          <p
            id="cookie-banner-title"
            className="font-heading text-lg text-forest md:text-xl"
          >
            Cookies och integritet
          </p>
          <p
            id="cookie-banner-desc"
            className="mt-2 font-sans text-sm leading-relaxed text-zinc-600"
          >
            Vi använder nödvändiga cookies för att webbplatsen ska fungera och
            för att komma ihåg ditt val. Om du godkänner alla cookies kan vi
            visa inbäddad karta från Google på kontaktsidan och använda Googles
            tagg för att mäta annonskonverteringar. Läs mer i{" "}
            <Link
              href="/integritetspolicy"
              className="font-medium text-sage underline underline-offset-2 hover:text-forest"
            >
              integritetspolicyn
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-full border border-sand-dark/40 px-5 py-2.5 font-sans text-sm font-medium text-forest transition-colors hover:bg-sand/80"
          >
            Endast nödvändiga
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="rounded-full bg-sage px-5 py-2.5 font-sans text-sm font-medium text-white shadow-sm transition-colors hover:bg-forest"
          >
            Acceptera alla
          </button>
        </div>
      </div>
    </div>
  );
}
