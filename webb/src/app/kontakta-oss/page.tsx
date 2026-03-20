import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakta oss | Trädgårdsform Stockholm",
  description:
    "Kontakta Trädgårdsform för trädgårdsdesign i Stockholm. Telefon, e-post och kostnadsfritt hembesök inom Stockholm.",
};

const contactInfo = [
  {
    icon: Phone,
    label: "Telefon",
    value: "0705-68 65 09",
    href: "tel:0705686509",
  },
  {
    icon: Mail,
    label: "E-post",
    value: "info@tradgardsform.se",
    href: "mailto:info@tradgardsform.se",
  },
  {
    icon: MapPin,
    label: "Område",
    value: "Stockholm & Mälardalen",
    href: null,
  },
  {
    icon: Clock,
    label: "Hembesök",
    value: "Kostnadsfritt inom Stockholm",
    href: null,
  },
];

export default function KontaktPage() {
  return (
    <>
      {/* Hero — samma struktur som startsidan */}
      <section className="relative min-h-screen min-h-[640px] flex items-center overflow-hidden py-24 md:py-16 lg:py-0">
        <Image
          src={
            "/bilder/galleri/" +
            encodeURIComponent("trädgårdsdesign-av-trädgårdsform-4.jpg")
          }
          alt="Kontakta Trädgårdsform för trädgårdsdesign i Stockholm"
          fill
          priority
          className="object-cover object-center md:object-[58%_center] lg:object-[62%_center]"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 lg:pb-52">
          <div className="grid grid-cols-1 gap-10 lg:gap-12 xl:gap-16 items-center">
            {/* Rubrik + ingress + knappar (centrerat) */}
            <div className="text-center">
              <p className="text-white text-base font-sans font-medium tracking-[0.2em] uppercase mb-6">
                Kontakta oss
              </p>
              <h1 className="font-heading text-4xl md:text-5xl xl:text-6xl text-white leading-tight mb-6">
                Låt oss prata om din <br />
                <em className="not-italic">trädgård</em>
              </h1>
              <p className="text-white text-lg md:text-xl font-sans max-w-xl mx-auto mb-10 leading-relaxed [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
                Välj det sätt som passar dig — telefon, e-post eller intresseanmälan.
                Kostnadsfritt hembesök inom Stockholm. Vi återkommer så snart vi kan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/boka-hembesok"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sage text-white font-medium text-base tracking-wide hover:bg-forest transition-all hover:scale-105 shadow-lg"
                >
                  Intresseanmälan
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="tel:0705686509"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/50 bg-white/10 text-white font-medium text-base tracking-wide backdrop-blur-sm shadow-sm hover:bg-white/20 hover:border-white/70 transition-all hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Phone size={18} aria-hidden />
                  Ring oss
                </a>
              </div>
            </div>

            {/* Kontaktdetaljer: 2×2-grid under lg; på lg+ längst ner i hero */}
            <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-5 sm:gap-y-6 md:gap-x-6 md:gap-y-7 w-full max-w-md sm:max-w-lg mx-auto lg:max-w-none lg:mx-0 text-center lg:hidden justify-items-center">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <li
                  key={label}
                  className="flex flex-col items-center gap-2 sm:gap-2.5 min-w-0 w-full max-w-[11.5rem] sm:max-w-[13rem]"
                >
                  <Icon
                    className="shrink-0 text-white w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <div className="min-w-0 w-full">
                    <p className="font-sans text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.1em] text-white/80 mb-1 sm:mb-1.5 leading-tight">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="font-sans text-sm sm:text-base md:text-lg text-white font-semibold leading-snug hover:text-white/95 transition-colors break-words [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-sans text-sm sm:text-base md:text-lg text-white font-semibold leading-snug break-words [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
                        {value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Telefon, e-post, område, hembesök — horisontellt längst ner (endast lg+) */}
        <div
          className="hidden lg:flex absolute bottom-0 left-0 right-0 z-10 justify-center px-6 lg:px-10 pb-10 pt-10 bg-gradient-to-t from-black/65 via-black/40 to-transparent"
          aria-label="Kontaktuppgifter"
        >
          <div className="flex flex-wrap items-start justify-center gap-x-10 xl:gap-x-12 gap-y-8 max-w-7xl w-full mx-auto">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-3 items-start shrink-0">
                <Icon
                  className="shrink-0 text-white mt-1"
                  size={26}
                  strokeWidth={2}
                  aria-hidden
                />
                <div className="text-left whitespace-nowrap">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white/80 mb-1 whitespace-nowrap">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="font-sans text-base xl:text-lg text-white font-semibold leading-snug hover:text-white/95 whitespace-nowrap [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-sans text-base xl:text-lg text-white font-semibold leading-snug whitespace-nowrap [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex lg:hidden flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-sans tracking-widest uppercase">Scrolla</span>
          <div className="w-px h-10 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* Område & karta */}
      <section className="border-t border-sand-dark/30 bg-sand/50 px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-xl md:text-2xl text-forest mb-2">
              Stockholm & Mälardalen
            </h2>
            <p className="font-sans text-zinc-600 text-sm md:text-base leading-relaxed">
              Kontor i Järfälla. Hembesök inom Stockholm är kostnadsfritt — för andra orter,{" "}
              <a
                href="mailto:info@tradgardsform.se"
                className="text-sage font-medium underline underline-offset-2 hover:text-forest"
              >
                mejla oss
              </a>
              .
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-sand-dark/30 h-72 md:h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d130366.82!2d17.8!3d59.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9f5a4ff49793%3A0x7af7a669efaf2cd4!2sJ%C3%A4rf%C3%A4lla!5e0!3m2!1ssv!2sse!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Trädgårdsform — Järfälla, Stockholm"
            />
          </div>
        </div>
      </section>
    </>
  );
}
