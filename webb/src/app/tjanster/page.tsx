import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Phone, MapPin, Gift, Building2, Lightbulb, Wifi } from "lucide-react";

const tjansterHeroImage =
  "/bilder/galleri/" +
  encodeURIComponent("3-TRÄDGÅRDSFORMS-TRÄDGÅRDSDESIGN-5.jpg");

export const metadata: Metadata = {
  title: "Trädgårdsdesign & Tjänster Stockholm | Trädgårdsform",
  description:
    "Professionell trädgårdsdesign i Stockholm med fasta priser. Från enkel idéskiss till komplett trädgårdsplanering — vi hjälper dig att förverkliga din drömträdgård.",
};

const services = [
  {
    id: "radgivning",
    title: "Trädgårdsrådgivning",
    subtitle: "Kom igång med dina idéer",
    price: "4 000",
    duration: "2 timmar",
    description:
      "Perfekt när du vill bolla idéer och få expertråd utan att ta fram en fullständig ritning. Under två timmar i din trädgård går vi igenom dina tankar och du får konkreta förslag på utformning, växter, material och belysning.",
    features: [
      "2 timmar på plats i din trädgård",
      "Genomgång av önskemål och behov",
      "Förslag på utformning och design",
      "Tips på växter, material och belysning",
      "Du antecknar själv",
    ],
    forWho: "Passar dig som vill ha konkreta råd och inspiration utan en fullständig ritning.",
    image: "/bilder/5-1024x735.jpg",
    highlight: false,
  },
  {
    id: "ideskiss",
    title: "Idéskiss",
    subtitle: "Struktur och form för din trädgård",
    price: "19 500",
    duration: "Inkl. förhandsskiss",
    description:
      "En skalenlig trädgårdsritning i svart/vitt som visar trädgårdens rum, funktioner och övergripande karaktär — utan detaljerade växtförslag. Perfekt om du vill ha en tydlig struktur att arbeta vidare med själv.",
    features: [
      "Skalenlig ritning i svart/vitt",
      "Trädgårdens rum och funktioner",
      "Övergripande design och karaktär",
      "Förhandsskiss med 1 revideringstillfälle",
      "Leverans via e-post",
    ],
    forWho: "Passar dig som vill ha hjälp med trädgårdens struktur men vill fylla på innehållet själv.",
    image: "/bilder/Ideskiss-Trad-buskar-Perenner-3-1024x724.jpg",
    highlight: false,
  },
  {
    id: "ideskiss-vaxt",
    title: "Idéskiss med växtförslag",
    subtitle: "En komplett plan att arbeta från",
    price: "24 800",
    duration: "Inkl. förhandsskiss",
    description:
      "Utöver trädgårdens rum och funktioner får du även detaljerade växtförslag med svenska artnamn. Sittplatser, gångar, spaljéer och pergola ritas ut med materialangivelser.",
    features: [
      "Skalenlig ritning med rum och funktioner",
      "Växtförslag med svenska artnamn",
      "Sittplatser, gångar och markbeläggning",
      "Spaljéer, pergola och förråd inritade",
      "Förhandsskiss med revidering",
      "Leverans via e-post",
    ],
    forWho: "Passar dig som vill ha en komplett plan att själv arbeta vidare med.",
    image: "/bilder/Forhandsritning-2-1024x724.jpg",
    highlight: false,
  },
  {
    id: "basritning",
    title: "Basritning",
    subtitle: "Perfekt underlag för anläggare",
    price: "34 200",
    duration: "Inkl. förhandsskiss",
    description:
      "Trädgårdsforms mest populära alternativ. En komplett material- och planteringsritning med allt du behöver för att ta in offerter från anläggare och påbörja anläggningen.",
    features: [
      "Skalenlig material- och planteringsritning",
      "Växtförteckning med art och storlek",
      "Material och markbeläggning med sort",
      "Belysningsplan med armaturförslag",
      "Förhandsskiss med 1 revidering",
      "Leverans via e-post",
    ],
    forWho: "Passar dig som ska anlita en anläggare och behöver ett professionellt underlag.",
    image: "/bilder/Materialritning-3-1024x724.jpg",
    highlight: true,
  },
  {
    id: "komplett",
    title: "Komplett planering",
    subtitle: "Allt på ett ställe",
    price: "45 800",
    duration: "Inkl. förhandsskiss + pärm",
    description:
      "Det mest omfattande alternativet — med allt från färglagd illustrationsritning till detaljerade skötselanvisningar och en komplett pärm per post. Perfekt när du vill ha ett fullständigt beslutsunderlag.",
    features: [
      "Färglagd illustrationsritning",
      "Detaljerad material- och planteringsritning",
      "Växtförteckning med latin, bilder och cc-mått",
      "Utförliga planterings- och skötselanvisningar",
      "Skötselkalender",
      "Belysningsplan med armatur och effekt",
      "Förslag på konstruktioner (pergola, spaljéer)",
      "Komplett pärm med dataminne per post",
    ],
    forWho: "Passar dig som vill ha ett komplett och gediget material och tar hjälp av anläggare.",
    image: "/bilder/Forhandsritning.-5-1024x724.jpg",
    highlight: false,
  },
];

const extras = [
  {
    icon: Wifi,
    title: "Trädgårdsplanering på distans",
    description:
      "Bor du utanför Stockholm eller föredrar distansarbete? Du tillhandahåller foton, tomtkarta och mått — vi sköter resten. Gäller allt från enstaka rabatter till hela trädgårdar.",
    cta: "Kontakta oss för pris",
  },
  {
    icon: Lightbulb,
    title: "Belysningsplan",
    description:
      "En belysningsplan som visar placering, armaturförslag och effekt anpassad för din trädgård. Ingår i Basritning och Komplett planering — kan även köpas till separat.",
    cta: "Kontakta oss för pris",
  },
  {
    icon: Building2,
    title: "Bostadsrättsföreningar",
    description:
      "Vi planerar gårdar och grönområden för bostadsrättsföreningar i Stockholm och Mälardalen. Kontakta oss för ett förutsättningslöst möte.",
    cta: "Kontakta oss",
  },
  {
    icon: Gift,
    title: "Presentkort",
    description:
      "En uppskattad och inspirerande present! Välj fritt vilken tjänst eller vilket värde du önskar. Beställ enkelt via e-post.",
    cta: "Beställ presentkort",
  },
];

export default function TjansterPage() {
  return (
    <>
      {/* Hero — samma upplägg som startsidan */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <Image
          src={tjansterHeroImage}
          alt="Trädgårdsdesign av Trädgårdsform — exempel från genomfört projekt i Stockholm"
          fill
          priority
          className="object-cover object-center brightness-[1.06]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/12 to-black/32" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white text-base font-sans font-medium tracking-[0.2em] uppercase mb-6 [text-shadow:0_1px_10px_rgba(0,0,0,0.65)]">
            Våra tjänster
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 [text-shadow:0_2px_16px_rgba(0,0,0,0.75)]">
            Trädgårdsdesign med <em>fasta priser</em>
          </h1>
          <p className="text-white text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10 leading-relaxed [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
            Vi erbjuder allt från en enkel rådgivning till en komplett trädgårdsplanering.
            Du väljer den nivå som passar dig — alltid med tydliga priser från start.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/boka-hembesok"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sage text-white font-medium text-base tracking-wide hover:bg-forest transition-all hover:scale-105 shadow-lg"
            >
              Intresseanmälan
              <ArrowRight size={18} />
            </Link>
            <Link
              href="#radgivning"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/40 text-white font-medium text-base tracking-wide hover:bg-white/20 transition-all"
            >
              Se paketen
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-sans tracking-widest uppercase">Scrolla</span>
          <div className="w-px h-10 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* Tjänster */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Bild */}
              <div className="relative h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {service.highlight && (
                  <div className="absolute top-4 left-4 bg-sage text-white text-xs font-sans font-medium px-4 py-1.5 rounded-full shadow">
                    Mest populär
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-2">
                    {service.subtitle}
                  </p>
                  <h2 className="font-heading text-3xl md:text-4xl text-forest leading-tight mb-1">
                    {service.title}
                  </h2>
                  <p className="font-sans text-3xl font-bold text-forest">
                    {service.price}{" "}
                    <span className="text-base font-normal text-zinc-400">kr inkl. moms</span>
                  </p>
                </div>

                <p className="font-sans text-zinc-600 leading-relaxed">
                  {service.description}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={16} className="text-sage flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-zinc-700 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-sand rounded-xl px-5 py-4 border border-sand-dark">
                  <p className="font-sans text-zinc-600 text-sm leading-relaxed">
                    <span className="font-medium text-forest">Passar för: </span>
                    {service.forWho}
                  </p>
                </div>

                <Link
                  href="/kontakta-oss"
                  className="self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sage text-white font-medium text-sm hover:bg-forest transition-all hover:scale-105"
                >
                  Kom igång
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Prisinfo — under alla paket */}
        <div className="max-w-7xl mx-auto mt-16 pt-12 border-t border-sand-dark">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-sans text-zinc-500 text-sm mb-1">Alla priser gäller</p>
              <p className="font-sans text-zinc-700 font-medium">
                Inkl. moms · Tomter upp till 1 000 kvm · Stockholm · Fr.o.m. 2025-01-23
              </p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-sage flex-shrink-0" />
              <p className="font-sans text-zinc-600 text-sm">
                Andra storlekar eller lägen?{" "}
                <Link href="/kontakta-oss" className="text-sage font-medium hover:text-forest underline underline-offset-2">
                  Begär offert
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Övriga tjänster */}
      <section className="bg-sand py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Mer vi kan hjälpa med
            </p>
            <h2 className="font-heading text-4xl text-forest leading-tight">
              Övriga <em>tjänster</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {extras.map((extra) => (
              <div
                key={extra.title}
                className="bg-cream rounded-2xl p-7 flex flex-col gap-4 shadow-sm border border-sand-dark hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-full bg-sage/10 flex items-center justify-center">
                  <extra.icon size={20} className="text-sage" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-forest mb-2">{extra.title}</h3>
                  <p className="font-sans text-zinc-600 text-sm leading-relaxed">
                    {extra.description}
                  </p>
                </div>
                <Link
                  href="/kontakta-oss"
                  className="mt-auto inline-flex items-center gap-1 text-sage font-sans text-sm font-medium hover:text-forest transition-colors"
                >
                  {extra.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest py-20 px-6">
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <h2 className="font-heading text-4xl md:text-5xl text-white leading-tight">
            Osäker på vilket paket som <em>passar dig</em>?
          </h2>
          <p className="font-sans text-white/70 text-lg leading-relaxed">
            Gör en intresseanmälan — så hjälper Susanne dig att
            välja rätt nivå utifrån dina behov och din budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
            <Link
              href="/boka-hembesok"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sage text-white font-medium hover:bg-sage-light hover:text-forest transition-all hover:scale-105"
            >
              Intresseanmälan
              <ArrowRight size={18} />
            </Link>
            <a
              href="tel:0705686509"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-medium hover:bg-white/20 transition-all"
            >
              <Phone size={18} />
              0705-68 65 09
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
