"use client";

import Link from "next/link";
import { useState } from "react";

const serviceLinks = [
  { href: "/tjanster#radgivning", label: "Trädgårdsrådgivning" },
  { href: "/tjanster#ideskiss", label: "Idéskiss" },
  { href: "/tjanster#ideskiss-vaxt", label: "Idéskiss med växtförslag" },
  { href: "/tjanster#basritning", label: "Basritning" },
  { href: "/tjanster#komplett", label: "Komplett planering" },
  { href: "/tjanster#belysningsplan", label: "Belysningsplan" },
  { href: "/tjanster#distansradgivning", label: "Distansrådgivning" },
  { href: "/tjanster#bostadsrattsforeningar", label: "Bostadsrättsföreningar" },
  { href: "/tjanster#presentkort", label: "Presentkort" },
] as const;

const VISIBLE_COUNT = 4;

export default function FooterServiceLinks() {
  const [expanded, setExpanded] = useState(false);
  const showToggle = serviceLinks.length > VISIBLE_COUNT;
  const links = expanded ? serviceLinks : serviceLinks.slice(0, VISIBLE_COUNT);

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {showToggle ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-3 text-left text-sm text-white/55 hover:text-white underline underline-offset-2 transition-colors"
        >
          {expanded ? "Visa mindre" : "Visa mer"}
        </button>
      ) : null}
    </div>
  );
}
