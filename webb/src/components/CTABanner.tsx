import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <Image
        src="/bilder/926C0C54-F68D-40D2-B18E-09FEFCEADE84-scaled.jpg"
        alt="Vacker trädgård i Stockholm"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="font-sans text-sage-pale/70 text-sm font-medium tracking-[0.2em] uppercase mb-4">
          Redo att komma igång?
        </p>
        <h2 className="font-heading text-4xl md:text-6xl text-white leading-tight mb-6">
          Förverkliga din <em>trädgårdsdröm</em> i år
        </h2>
        <p className="font-sans text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Gör en intresseanmälan och ta första steget mot en trädgård
          du älskar att vara i.
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
