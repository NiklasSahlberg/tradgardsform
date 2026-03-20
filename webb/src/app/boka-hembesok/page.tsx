"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-sand-dark bg-cream font-sans text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition";

export default function BokaHembesokPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Tillbaka-länk */}
      <div className="px-6 pt-28 pb-4 max-w-2xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sage text-sm font-sans font-medium hover:text-forest transition-colors"
        >
          <ArrowLeft size={15} />
          Tillbaka till startsidan
        </Link>
      </div>

      {/* Formulär */}
      <div className="flex-1 flex items-start justify-center px-6 pb-20">
        <div className="w-full max-w-2xl">
          {submitted ? (
            <div className="flex flex-col items-center text-center gap-6 py-20">
              <div className="w-20 h-20 rounded-full bg-sage/10 flex items-center justify-center">
                <CheckCircle size={40} className="text-sage" />
              </div>
              <h1 className="font-heading text-4xl text-forest">
                Tack, vi hör av oss!
              </h1>
              <p className="font-sans text-zinc-600 text-lg max-w-md leading-relaxed">
                Susanne återkommer inom kort för att följa upp din
                intresseanmälan och boka in ett kostnadsfritt hembesök hos dig.
              </p>
              <Link
                href="/"
                className="mt-2 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sage text-white font-medium hover:bg-forest transition-all"
              >
                <ArrowLeft size={16} />
                Tillbaka till startsidan
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-3">
                  Kostnadsfritt inom Stockholm
                </p>
                <h1 className="font-heading text-4xl md:text-5xl text-forest leading-tight mb-4">
                  Intresseanmälan
                </h1>
                <p className="font-sans text-zinc-600 leading-relaxed">
                  Fyll i formuläret nedan så kontaktar Susanne dig med anledning
                  av din intresseanmälan och bokar in ett kostnadsfritt
                  hembesök. Ha gärna en aktuell tomtkarta tillgänglig till mötet.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-sm font-medium text-zinc-700">
                      Namn <span className="text-pink-brand">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="För- och efternamn"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-sm font-medium text-zinc-700">
                      E-post <span className="text-pink-brand">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="din@email.se"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-sm font-medium text-zinc-700">
                      Telefonnummer <span className="text-pink-brand">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="07XX-XX XX XX"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-sm font-medium text-zinc-700">
                      Adress <span className="text-pink-brand">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Gatuadress, ort"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-sm font-medium text-zinc-700">
                    Beskriv vad du behöver hjälp med{" "}
                    <span className="text-pink-brand">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Berätta gärna om din trädgård, vad du vill förändra och vad du drömmer om..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-sage text-white font-medium font-sans text-base hover:bg-forest transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm mt-2"
                >
                  {loading ? "Skickar..." : "Skicka intresseanmälan"}
                </button>

                <p className="font-sans text-xs text-zinc-400 text-center">
                  Kostnadsfritt hembesök inom Stockholm. Vi svarar inom 1–2 arbetsdagar.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
