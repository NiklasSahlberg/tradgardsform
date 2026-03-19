"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Hem" },
  { href: "/tjanster", label: "Tjänster" },
  { href: "/projekt", label: "Projekt" },
  { href: "/om-oss", label: "Om Susanne" },
  { href: "/kontakta-oss", label: "Kontakta oss" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-18 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/bilder/logo_web-250x89.png"
            alt="Trädgårdsform logotyp"
            width={160}
            height={57}
            className="h-10 w-auto"
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
            Boka hembesök
          </Link>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Öppna meny"
        >
          {open ? (
            <X className={scrolled ? "text-forest" : "text-white"} size={24} />
          ) : (
            <Menu className={scrolled ? "text-forest" : "text-white"} size={24} />
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t border-sand-dark">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-forest text-base font-medium py-2 border-b border-sand"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontakta-oss"
              className="mt-2 px-5 py-3 rounded-full bg-sage text-white text-center font-medium"
              onClick={() => setOpen(false)}
            >
              Boka hembesök
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
