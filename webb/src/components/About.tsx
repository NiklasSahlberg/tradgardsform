import Image from "next/image";
import Link from "next/link";
import { Award, Leaf } from "lucide-react";

export default function About() {
  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="relative h-[360px] md:h-[560px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/bilder/FUNKAR-DENNA-scaled.jpg"
              alt="Susanne Andersson, trädgårdsdesigner i Stockholm — Trädgårdsform"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-sage text-white rounded-2xl px-6 py-5 shadow-lg hidden lg:block">
            <p className="font-heading text-3xl font-bold">15+</p>
            <p className="font-sans text-sm text-white/80 mt-1">års erfarenhet</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase">
            Om Trädgårdsform
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-forest leading-tight">
            Susanne Andersson — <em>din trädgårdsdesigner i Stockholm</em>
          </h2>
          <p className="font-sans text-zinc-600 text-lg leading-relaxed">
            Susanne är diplomerad trädgårdsdesigner och trädgårdsarkitekt med lång
            erfarenhet av trädgårdsdesign och en gedigen växtkunskap. Hennes styrka är
            framförallt engagemanget för att varje kund ska kunna uppnå sin trädgårdsdröm.
          </p>
          <p className="font-sans text-zinc-600 leading-relaxed">
            Med kontor i Järfälla erbjuder Trädgårdsform trädgårdsdesign i hela Stockholm
            och Mälardalen — alltid med ett personligt och omsorgsfullt bemötande.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center gap-3">
              <Award className="text-sage flex-shrink-0" size={20} />
              <span className="font-sans text-zinc-700">
                Diplomerad trädgårdsdesigner & trädgårdsarkitekt
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Leaf className="text-sage flex-shrink-0" size={20} />
              <span className="font-sans text-zinc-700">
                Certifierad medlem i Svenska Trädgårdsdesigners
              </span>
            </div>
          </div>

          <blockquote className="mt-4 border-l-4 border-pink-brand pl-5 py-2">
            <p className="font-heading text-xl text-pink-brand italic leading-snug">
              "Jag brinner för att mina kunder ska kunna uppnå sin trädgårdsdröm."
            </p>
            <footer className="font-sans text-pink-brand text-sm mt-2">
              — Susanne Andersson
            </footer>
          </blockquote>

          <Link
            href="/om-oss"
            className="mt-2 self-start inline-flex items-center gap-2 text-sage font-medium font-sans hover:text-forest transition-colors border-b border-sage hover:border-forest pb-0.5"
          >
            Läs mer om Susanne
          </Link>
        </div>
      </div>
    </section>
  );
}
