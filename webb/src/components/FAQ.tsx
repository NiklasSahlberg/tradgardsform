"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Vad ingår i ett kostnadsfritt hembesök?",
    answer:
      "Under hembesöket (ca 1,5 timme) går vi igenom din trädgård och dina önskemål. Vi använder vår Stilguide och Checklista för att klargöra behov, stil och funktioner. Du behöver ha en aktuell tomtkarta tillgänglig. Hembesök inom Stockholm är alltid kostnadsfria.",
  },
  {
    question: "Hur lång tid tar det att få sin trädgårdsritning?",
    answer:
      "Leveranstiden varierar beroende på uppdragets storlek och arbetsbelastning, men normalt räknar vi med 4–8 veckor från hembesöket till levererad ritning. Du får alltid en förhandsskiss för godkännande och revidering innan det slutliga materialet skickas.",
  },
  {
    question: "Kan jag anlita Trädgårdsform om jag bor utanför Stockholm?",
    answer:
      "Ja! Vi erbjuder trädgårdsplanering på distans för hela landet. Du tillhandahåller foton, tomtkarta och mått, så sköter vi resten. Kontakta oss för prisuppgift beroende på uppdragets omfattning.",
  },
  {
    question: "Hjälper ni till att hitta en anläggare?",
    answer:
      "Trädgårdsform har ett kontaktnät med erfarna leverantörer av växter, marksten och markanläggare i Stockholm. Vi kan med glädje tipsa om pålitliga anläggare som kan förverkliga din trädgårdsritning.",
  },
  {
    question: "Vad skiljer en Idéskiss från en Basritning?",
    answer:
      "Idéskissen är en svart/vit ritning som visar trädgårdens rum och struktur — utan detaljerade växtförslag eller exakta material. Basritningen är mer komplett och innehåller materialritning, planteringsritning med växtförteckning samt en belysningsplan. Basritningen fungerar som ett komplett underlag för en anläggare.",
  },
  {
    question: "Erbjuder ni även hjälp med belysning?",
    answer:
      "Ja, vi tar fram belysningsplaner som visar placering, armaturförslag och effekt anpassad för din trädgård. Belysningsplanen ingår i Basritning och Komplett planering, men kan även köpas till separat.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Vanliga frågor
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-forest leading-tight">
            Har du <em>frågor</em>?
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-sand-dark">
          {faqs.map((faq, i) => (
            <div key={i} className="py-5">
              <button
                className="w-full flex items-center justify-between gap-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-heading text-lg text-forest leading-snug">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sand flex items-center justify-center transition-colors group-hover:bg-sage">
                  {open === i ? (
                    <Minus size={16} className="text-sage" />
                  ) : (
                    <Plus size={16} className="text-sage" />
                  )}
                </span>
              </button>
              {open === i && (
                <p className="font-sans text-zinc-600 leading-relaxed mt-4 pr-12">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
