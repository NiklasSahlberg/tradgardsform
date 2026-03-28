"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const LOGO_ON_HERO = "/bilder/galleri/logo_web-removebg-preview.png";
const LOGO_SCROLLED = "/bilder/galleri/logo_web.png";

const links = [
  { href: "/", label: "Hem" },
  { href: "/tjanster", label: "Tjänster" },
  { href: "/projekt", label: "Projekt" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakta-oss", label: "Kontakta oss" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkIsActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_4px_24px_-4px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-18 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            key={scrolled ? "scrolled" : "hero"}
            src={scrolled ? LOGO_SCROLLED : LOGO_ON_HERO}
            alt="Trädgårdsform logotyp"
            width={220}
            height={79}
            quality={100}
            className={`h-14 w-auto md:h-16 transition-opacity duration-300 ${
              scrolled
                ? ""
                : "brightness-110 contrast-110 saturate-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] drop-shadow-[0_1px_2px_rgba(255,255,255,0.35)]"
            }`}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-sage ${
                scrolled ? "text-forest" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/boka-hembesok"
            className="ml-2 px-5 py-2.5 rounded-full bg-sage text-white text-sm font-medium tracking-wide transition-all hover:bg-forest hover:scale-105"
          >
            Intresseanmälan
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden p-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu-overlay"
          aria-label={open ? "Stäng meny" : "Öppna meny"}
        >
          {open ? (
            <X className={scrolled ? "text-forest" : "text-white"} size={24} />
          ) : (
            <Menu className={scrolled ? "text-forest" : "text-white"} size={24} />
          )}
        </button>
      </div>

      {/* Mobil: fullskärmsmeny */}
      {open && (
        <div
          id="mobile-menu-overlay"
          className="md:hidden fixed inset-0 z-[100] flex flex-col bg-cream min-h-dvh"
          role="dialog"
          aria-modal="true"
          aria-label="Huvudmeny"
        >
          <div className="shrink-0 flex items-center justify-end px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-3 rounded-full text-black hover:bg-sand/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              aria-label="Stäng meny"
            >
              <X size={26} strokeWidth={1.75} />
            </button>
          </div>

          <nav
            className="flex-1 flex flex-col justify-center items-center gap-1 px-8"
            aria-label="Primär navigering"
          >
            {links.map((link) => {
              const active = linkIsActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`w-full max-w-sm text-center py-5 text-xl tracking-wide transition-colors border-b border-sand-dark/15 last:border-0 text-black ${
                    active
                      ? "font-semibold"
                      : "font-medium hover:text-black/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div
            className="shrink-0 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4"
          >
            <Link
              href="/boka-hembesok"
              onClick={() => setOpen(false)}
              className="block w-full max-w-sm mx-auto text-center px-8 py-4 rounded-full bg-forest text-white text-lg font-medium tracking-wide shadow-lg hover:bg-sage hover:text-white transition-colors"
            >
              Intresseanmälan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
