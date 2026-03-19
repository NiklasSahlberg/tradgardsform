"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    <>
      {/* Hero */}
      <section className="relative py-36 md:py-44 px-6 overflow-hidden">
        <Image
          src="/bilder/FUNKAR-DENNA-scaled.jpg"
          alt="Kontakta Trädgårdsform"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="font-sans text-white text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Kontakta oss
          </p>
          <h1 className="font-heading text-4xl md:text-6xl text-white leading-tight mb-5">
            Låt oss prata om din <em>trädgård</em>
          </h1>
          <p className="font-sans text-white/80 text-lg leading-relaxed">
            Hembesöket är alltid kostnadsfritt inom Stockholm. Hör av dig
            — vi svarar inom ett par dagar.
          </p>
        </div>
      </section>

      {/* Kontaktsektion */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Vänster: info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-3">
                Kontaktuppgifter
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-forest leading-tight mb-6">
                Vi finns här för dig
              </h2>
              <p className="font-sans text-zinc-600 leading-relaxed">
                Oavsett om du har en konkret fråga eller bara är nyfiken på hur
                vi arbetar är du välkommen att höra av dig. Susanne återkommer
                så snart som möjligt.
              </p>
            </div>

            <ul className="flex flex-col gap-5">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-sage" />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-zinc-400 uppercase tracking-wide mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="font-sans text-forest font-medium hover:text-sage transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-sans text-forest font-medium">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-sand rounded-2xl p-6 border border-sand-dark">
              <p className="font-heading text-lg text-forest mb-2">
                Hellre ett samtal?
              </p>
              <p className="font-sans text-zinc-600 text-sm leading-relaxed mb-4">
                Ring direkt så berättar Susanne mer om hur processen ser ut och
                svarar på dina frågor.
              </p>
              <a
                href="tel:0705686509"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sage text-white text-sm font-medium hover:bg-forest transition-all"
              >
                <Phone size={15} />
                0705-68 65 09
              </a>
            </div>
          </div>

          {/* Höger: formulär */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-5 py-16 px-8 bg-white rounded-2xl shadow-sm border border-sand-dark">
                <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center">
                  <CheckCircle size={32} className="text-sage" />
                </div>
                <h3 className="font-heading text-3xl text-forest">Tack för ditt meddelande!</h3>
                <p className="font-sans text-zinc-600 max-w-sm leading-relaxed">
                  Susanne återkommer till dig inom kort. Vi ser fram emot att
                  höra om din trädgård.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-sm border border-sand-dark p-8 flex flex-col gap-5"
              >
                <h3 className="font-heading text-2xl text-forest mb-1">
                  Skicka ett meddelande
                </h3>

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
                      className="px-4 py-3 rounded-xl border border-sand-dark bg-cream font-sans text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition"
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
                      className="px-4 py-3 rounded-xl border border-sand-dark bg-cream font-sans text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-sm font-medium text-zinc-700">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="07XX-XX XX XX"
                      className="px-4 py-3 rounded-xl border border-sand-dark bg-cream font-sans text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-sm font-medium text-zinc-700">
                      Intresserad av
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-xl border border-sand-dark bg-cream font-sans text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition"
                    >
                      <option value="">Välj tjänst...</option>
                      <option value="radgivning">Trädgårdsrådgivning (4 000 kr)</option>
                      <option value="ideskiss">Idéskiss (19 500 kr)</option>
                      <option value="ideskiss-vaxt">Idéskiss med växtförslag (24 800 kr)</option>
                      <option value="basritning">Basritning (34 200 kr)</option>
                      <option value="komplett">Komplett planering (45 800 kr)</option>
                      <option value="distans">Distansrådgivning</option>
                      <option value="annat">Annat / Vet inte än</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-sm font-medium text-zinc-700">
                    Meddelande <span className="text-pink-brand">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Berätta lite om din trädgård och vad du önskar hjälp med..."
                    className="px-4 py-3 rounded-xl border border-sand-dark bg-cream font-sans text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-sage text-white font-medium font-sans text-base hover:bg-forest transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? "Skickar..." : "Skicka meddelande"}
                </button>

                <p className="font-sans text-xs text-zinc-400 text-center">
                  Vi svarar vanligtvis inom 1–2 arbetsdagar.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Karta / område */}
      <section className="bg-sand py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Vårt område
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-forest leading-tight mb-4">
            Vi arbetar i hela <em>Stockholm och Mälardalen</em>
          </h2>
          <p className="font-sans text-zinc-600 max-w-xl mx-auto mb-10">
            Kontoret finns i Järfälla. Hembesök inom Stockholm är alltid
            kostnadsfria — för övriga orter kontaktar du oss för pris.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-md h-80 bg-sand-dark flex items-center justify-center">
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
