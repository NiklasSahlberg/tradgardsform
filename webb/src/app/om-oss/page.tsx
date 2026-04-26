import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Leaf, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Om oss | Trädgårdsdesigner Stockholm | Trädgårdsform",
  description:
    "Susanne Andersson är diplomerad trädgårdsdesigner och trädgårdsarkitekt i Stockholm med lång erfarenhet och gedigen växtkunskap. Läs mer om Trädgårdsform.",
};

const omOssHeroImage =
  "/bilder/galleri/" +
  encodeURIComponent("3-TRÄDGÅRDSFORMS-TRÄDGÅRDSDESIGN-5.jpg");

const credentials = [
  {
    icon: Award,
    text: "Diplomerad trädgårdsdesigner",
  },
  {
    icon: Leaf,
    text: "Certifierad medlem i Svenska Trädgårdsdesigners",
  },
  {
    icon: Award,
    text: "F-skatt registrerad",
  },
  {
    icon: MapPin,
    text: "Kontor i Järfälla — arbetar i hela Stockholm och Mälardalen",
  },
];

const values = [
  {
    title: "Personligt engagemang",
    description:
      "Varje trädgård är unik och varje kund har sina egna drömmar. Jag lägger stor vikt vid att verkligen lyssna in vad du och din familj behöver — och sedan skapa en lösning som passar just er.",
  },
  {
    title: "Gedigen växtkunskap",
    description:
      "Med en djup förståelse för växter, klimat och ståndort kan jag föreslå växter som trivs i just din trädgård och som ger vackra resultat år efter år — utan onödigt jobb.",
  },
  {
    title: "Tydlighet och trygghet",
    description:
      "Fasta priser, kostnadsfria hembesök och tydlig kommunikation genom hela processen. Du ska aldrig behöva undra vad något kostar eller vad nästa steg är.",
  },
];

export default function OmOssPage() {
  return (
    <>
      {/* Hero med bakgrundsbild — samma höjd som övriga heroes (viewport / min 640px) */}
      <section className="relative min-h-screen min-h-[640px] flex items-center overflow-hidden px-6 py-24 md:py-16 lg:py-0">
        <Image
          src={omOssHeroImage}
          alt="Trädgårdsmiljö — bakgrund för Om oss"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-[1]"
          aria-hidden
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col text-center lg:text-left max-w-2xl mx-auto lg:max-w-none lg:mx-0 w-full">
            <p className="text-white text-base font-sans font-medium tracking-[0.2em] uppercase mb-6 [text-shadow:0_1px_10px_rgba(0,0,0,0.65)]">
              Om Trädgårdsform
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 [text-shadow:0_1px_2px_rgba(0,0,0,0.45),0_2px_16px_rgba(0,0,0,0.35)]">
              Susanne Andersson — <em>trädgårdsdesigner</em>
            </h1>
            <p className="text-white text-lg md:text-xl font-sans max-w-2xl mx-auto lg:mx-0 mb-6 leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.88),0_4px_32px_rgba(0,0,0,0.65),0_0_48px_rgba(0,0,0,0.45)]">
              Med passion för trädgårdar och ett skarpt öga för design hjälper
              jag dig att förverkliga din trädgårdsdröm — med fasta priser
              och ett personligt bemötande.
            </p>
            <p className="text-white text-lg md:text-xl font-sans max-w-2xl mx-auto lg:mx-0 mb-2 leading-relaxed italic [text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.88),0_4px_32px_rgba(0,0,0,0.65),0_0_48px_rgba(0,0,0,0.45)]">
              &ldquo;Jag brinner för att mina kunder ska kunna uppnå sin trädgårdsdröm.&rdquo;
            </p>
            <p className="text-white text-lg md:text-xl font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.88),0_4px_32px_rgba(0,0,0,0.65),0_0_48px_rgba(0,0,0,0.45)]">
              — Susanne Andersson
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/bilder/YTo2OntzOjI6ImlkIjtpOjE0NTIxMTI7czoxOiJ3IjtpOjMyMDA7czoxOiJoIjtpOjMyMDA7czoxOiJjIjtpOjA7czoxOiJzIjtpOjA7czoxOiJrIjtzOjQwOiJlMzA0NGYyZmViM2RjYzI1OTA0MjY4MWVkNWM0ODJiZmE1YzNjNTg4Ijt9-683x1024.jpg"
              alt="Susanne Andersson, trädgårdsdesigner i Stockholm"
              width={400}
              height={600}
              className="rounded-2xl shadow-2xl object-cover ring-2 ring-white/20 h-auto w-[min(100%,260px)] sm:w-[min(100%,300px)] md:w-[300px] lg:w-[320px]"
              sizes="(max-width: 639px) 260px, (max-width: 1023px) 300px, 320px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Meriter — samma typografi som About på startsidan */}
      <section className="bg-cream px-6 pt-6 pb-20 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Bakgrund & meriter
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-forest leading-tight mb-6">
              Utbildning och <em>erfarenhet</em>
            </h2>
            <p className="font-sans text-zinc-600 text-lg leading-relaxed mb-4">
              Jag är diplomerad trädgårdsdesigner och trädgårdsarkitekt
              med lång erfarenhet av designarbete och en gedigen växtkunskap.
              Jag arbetar med allt från enstaka rabatter till kompletta
              trädgårdsanläggningar för privatpersoner och bostadsrättsföreningar
              i Stockholm och Mälardalen.
            </p>
            <p className="font-sans text-zinc-600 text-lg leading-relaxed mb-8">
              Trädgårdsform är medlem i Svenska Trädgårdsdesigners — en organisation
              som säkerställer att dess medlemmar har en gedigen och relevant
              utbildning, flera års erfarenhet samt granskade referensarbeten.
            </p>
            <ul className="flex flex-col gap-4">
              {credentials.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="text-sage" size={16} />
                  </div>
                  <span className="font-sans text-zinc-700 leading-snug pt-1.5">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-full min-h-[460px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/bilder/926C0C54-F68D-40D2-B18E-09FEFCEADE84-scaled.jpg"
              alt="Trädgårdsdesign av Susanne Andersson"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Värderingar — samma sektionsrytm som Services/Process */}
      <section className="bg-sand py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Så arbetar vi
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-forest leading-tight">
              Vad som driver <em>Trädgårdsform</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-cream rounded-2xl p-8 shadow-sm">
                <h3 className="font-heading text-2xl text-forest mb-3">{v.title}</h3>
                <p className="font-sans text-zinc-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6 mt-10 md:mt-12 pt-10 md:pt-11 border-t border-sand-dark/25">
          <h2 className="font-heading text-4xl md:text-5xl text-forest leading-tight">
            Vill du träffa <em className="text-sage">Susanne</em>?
          </h2>
          <p className="font-sans text-zinc-600 text-lg leading-relaxed">
            Gör en intresseanmälan och ta första steget mot
            din drömträdgård.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
            <Link
              href="/boka-hembesok"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sage text-white font-medium hover:bg-forest transition-all hover:scale-105 shadow-md"
            >
              Intresseanmälan
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/tjanster"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-forest/25 bg-white text-forest font-medium hover:border-sage/50 hover:bg-sand/40 transition-all"
            >
              Se våra tjänster
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
