"use client";

import Link from "next/link";
import { OPEN_COOKIE_BANNER_EVENT } from "@/lib/cookieConsent";

export default function CookieFooterControls() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:justify-end">
      <Link
        href="/integritetspolicy"
        className="text-white/35 transition-colors hover:text-white/55"
      >
        Integritet
      </Link>
      <span className="text-white/20" aria-hidden>
        ·
      </span>
      <button
        type="button"
        onClick={() =>
          window.dispatchEvent(new Event(OPEN_COOKIE_BANNER_EVENT))
        }
        className="text-white/35 transition-colors hover:text-white/55"
      >
        Cookie-inställningar
      </button>
    </div>
  );
}
