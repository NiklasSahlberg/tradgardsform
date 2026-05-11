"use client";

import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  getStoredConsent,
} from "@/lib/cookieConsent";

type Props = {
  embedSrc: string;
  title: string;
  mapUrl: string;
};

export default function ContactMapSection({
  embedSrc,
  title,
  mapUrl,
}: Props) {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const sync = () => setShowMap(getStoredConsent() === "all");
    sync();
    window.addEventListener(COOKIE_CONSENT_EVENT, sync);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, sync);
  }, []);

  if (showMap) {
    return (
      <iframe
        src={embedSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    );
  }

  return (
    <div className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-4 bg-sand/60 px-6 py-10 text-center">
      <p className="font-sans text-sm leading-relaxed text-zinc-600 max-w-md">
        Kartan från Google visas bara om du{" "}
        <strong className="font-medium text-forest">accepterar alla cookies</strong>{" "}
        (funktionellt innehåll från tredje part). Du kan ändra det under{" "}
        <em>Cookie-inställningar</em> i sidfoten.
      </p>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-sage/40 bg-white px-6 py-3 font-sans text-sm font-medium text-forest shadow-sm transition-colors hover:bg-sage/15"
      >
        Öppna platsen i Google Maps
      </a>
    </div>
  );
}
