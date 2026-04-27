"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/faqContent";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl md:text-5xl text-forest leading-tight">
            Vanliga <em>frågor</em>
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
                <span className="font-heading text-lg text-black leading-snug">
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
