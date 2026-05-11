"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  getStoredConsent,
} from "@/lib/cookieConsent";
import type { CookieConsentValue } from "@/lib/cookieConsent";

const AW_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

/**
 * Laddar googletagmanager/gtag för Google Ads när besökaren valt ”Acceptera alla”.
 * Sätt NEXT_PUBLIC_GOOGLE_ADS_ID i .env.local / Vercel.
 */
export default function GoogleAdsLoader() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);

  useEffect(() => {
    const sync = () => setConsent(getStoredConsent());
    sync();
    window.addEventListener(COOKIE_CONSENT_EVENT, sync);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, sync);
  }, []);

  if (!AW_ID || consent !== "all") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(AW_ID)}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-datalayer" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(AW_ID)});
        `}
      </Script>
    </>
  );
}
