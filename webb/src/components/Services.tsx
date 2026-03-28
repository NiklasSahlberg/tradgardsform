import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Trädgårdsrådgivning",
    price: "4 000",
    description: "Två timmar på plats i din trädgård. Vi bollar idéer och du får konkreta förslag på utformning, växter och material.",
    features: ["2 timmar på plats", "Idéer & inspiration", "Tips på växter och material"],
    highlight: false,
    image: "/bilder/hostmorker2.jpeg",
  },
  {
    title: "Idéskiss",
    price: "19 500",
    description: "Skalenlig trädgårdsritning i svart/vitt med trädgårdens rum och funktioner — perfekt om du vill fylla på innehållet själv.",
    features: ["Skalenlig ritning", "Rum & funktioner", "1 revideringstillfälle"],
    highlight: false,
    image: "/bilder/Ideskiss-Trad-buskar-Perenner-3-1024x724.jpg",
  },
  {
    title: "Basritning",
    price: "34 200",
    description: "Komplett material- och planteringsritning med växtförteckning, markbeläggning och belysningsplan. Perfekt underlag för anläggare.",
    features: ["Material- & planteringsritning", "Växtförteckning", "Belysningsplan", "1 revidering"],
    highlight: true,
    image: "/bilder/Materialritning-3-1024x724.jpg",
  },
  {
    title: "Komplett planering",
    price: "45 800",
    description: "Allt du behöver — inklusive färglagd illustrationsritning, detaljerad växtförteckning, skötselanvisningar och en komplett pärm.",
    features: ["Färglagd illustration", "Detaljerad växtförteckning", "Skötselkalender", "Komplett pärm per post"],
    highlight: false,
    image: "/bilder/Forhandsritning.-5-1024x724.jpg",
  },
];

export default function Services() {
  return (
    <section className="bg-sand py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Våra tjänster
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-forest leading-tight mb-4">
            Välj din nivå av <em>trädgårdsplanering</em>
          </h2>
          <p className="font-sans text-zinc-600 max-w-xl mx-auto">
            Alla priser är fasta och gäller inkl. moms för tomter upp till 1 000 kvm inom Stockholm.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`relative flex flex-col rounded-2xl overflow-hidden shadow-sm border transition-shadow hover:shadow-md bg-cream ${
                service.highlight
                  ? "border-sage ring-2 ring-sage"
                  : "border-sand-dark"
              }`}
            >
              {service.highlight && (
                <div className="bg-sage text-white text-xs font-sans font-medium text-center py-2 tracking-wider uppercase">
                  Mest populär
                </div>
              )}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div>
                  <h3 className="font-heading text-xl text-forest mb-1">{service.title}</h3>
                  <p className="font-sans text-3xl font-bold text-forest">
                    {service.price}{" "}
                    <span className="text-base font-normal text-zinc-500">kr</span>
                  </p>
                </div>
                <p className="font-sans text-zinc-600 text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="flex flex-col gap-2 mt-auto">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="text-sage flex-shrink-0 mt-0.5" size={16} />
                      <span className="font-sans text-zinc-700 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/boka-hembesok"
                  className="mt-4 w-full text-center py-3 rounded-full text-sm font-medium font-sans transition-all bg-sage text-white hover:bg-forest"
                >
                  Kom igång
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/tjanster"
            className="inline-flex items-center gap-2 text-sage font-medium font-sans hover:text-forest transition-colors border-b border-sage hover:border-forest pb-0.5"
          >
            Se fullständig beskrivning av alla tjänster <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
