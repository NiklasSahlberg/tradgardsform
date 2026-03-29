import { ShieldCheck, Home, Calendar } from "lucide-react";

const usps = [
  {
    icon: ShieldCheck,
    title: "Fasta priser",
    description:
      "Du vet exakt vad trädgårdsdesignen kostar redan från start — inga dolda avgifter eller överraskningar.",
  },
  {
    icon: Home,
    title: "Kostnadsfritt hembesök i Stockholm",
    description:
      "Vi träffas i din trädgård i Stockholm för ett förutsättningslöst möte — utan kostnad. Först efter besöket bestämmer du om du vill gå vidare.",
  },
  {
    icon: Calendar,
    title: "Fungerande trädgård",
    description:
      "Vi reder ut hela familjens behov och skapar en trädgård som är vacker, praktisk och hållbar år efter år.",
  },
];

export default function USP() {
  return (
    <section className="bg-forest px-6 pt-4 pb-6 md:pt-6 md:pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {usps.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-sage/30 flex items-center justify-center flex-shrink-0">
                <Icon className="text-sage-pale" size={22} />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-white mb-1.5">{title}</h3>
                <p className="font-sans text-white/70 leading-relaxed text-base">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
