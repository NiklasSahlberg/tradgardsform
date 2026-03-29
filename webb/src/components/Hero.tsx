import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      <Image
        src="/bilder/NY-scaled.jpg"
        alt="Professionell trädgårdsdesign i Stockholm av Trädgårdsform"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-white text-base font-sans font-medium tracking-[0.2em] uppercase mb-6 [text-shadow:0_1px_10px_rgba(0,0,0,0.65)]">
          Trädgårdsdesign i Stockholm
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 [text-shadow:0_1px_2px_rgba(0,0,0,0.45),0_2px_16px_rgba(0,0,0,0.35)]">
          Trädgårdsdesign -<br />
          <em>förverkliga din drömträdgård</em>
        </h1>
        <p className="text-white text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10 leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.88),0_4px_32px_rgba(0,0,0,0.65),0_0_48px_rgba(0,0,0,0.45)]">
          Med professionell trädgårdsdesign och fasta priser hjälper jag dig
          att skapa en vacker trädgård som verkligen fungerar som en del av ditt hem.
        </p>

        <div className="flex justify-center">
          <Link
            href="/boka-hembesok"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sage text-white font-medium text-base tracking-wide hover:bg-forest transition-all hover:scale-105 shadow-lg"
          >
            Intresseanmälan
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs font-sans tracking-widest uppercase">Scrolla</span>
        <div className="w-px h-10 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
