import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <Image
        src="/bilder/magnolia-hero.png"
        alt="Magnolia i trädgård — inspiration för din trädgårdsdröm"
        fill
        className="object-cover object-[70%_center] md:object-center brightness-[1.08]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/40" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="font-sans text-sage-pale/90 text-sm font-medium tracking-[0.2em] uppercase mb-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
          Redo att komma igång?
        </p>
        <h2 className="font-heading text-4xl md:text-6xl text-white leading-tight mb-6 [text-shadow:0_1px_2px_rgba(0,0,0,0.35),0_2px_20px_rgba(0,0,0,0.45)]">
          Förverkliga din <em>trädgårdsdröm</em> i år
        </h2>
        <p className="font-sans text-white/85 text-sm md:text-lg leading-snug md:leading-relaxed text-balance mb-10 max-w-xl mx-auto [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]">
          Gör en intresseanmälan och ta första steget mot en trädgård du älskar att vara i.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/boka-hembesok"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sage text-white font-medium text-base tracking-wide hover:bg-sage-light hover:text-forest transition-all hover:scale-105 shadow-lg"
          >
            Intresseanmälan
            <ArrowRight size={18} />
          </Link>
          <a
            href="tel:0705686509"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-medium text-base tracking-wide hover:bg-white/20 transition-all"
          >
            <Phone size={18} />
            0705-68 65 09
          </a>
        </div>
      </div>
    </section>
  );
}
