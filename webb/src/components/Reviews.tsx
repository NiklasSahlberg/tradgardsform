import { Star } from "lucide-react";

const reviews = [
  {
    name: "Anna L.",
    location: "Bromma",
    rating: 5,
    text: "Susanne förvandlade vår bortglömda tomt till något vi är stolta över. Ritningen var otroligt detaljerad och vi visste exakt vad vi ville ha. Kan varmt rekommendera!",
    service: "Komplett planering",
  },
  {
    name: "Johan & Maria K.",
    location: "Järfälla",
    rating: 5,
    text: "Fantastiskt proffsigt bemötande från start till slut. Hembesöket var avslappnat och Susanne lyssnade verkligen på vad vi ville ha. Priset var precis som utlovat.",
    service: "Basritning",
  },
  {
    name: "Petra H.",
    location: "Lidingö",
    rating: 5,
    text: "Jag hade svårt att visualisera hur min trädgård skulle se ut, men Susannes illustrationsritning gjorde allt så tydligt. Slutresultatet överträffade mina förväntningar.",
    service: "Idéskiss med växtförslag",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="bg-forest py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-sans text-white text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Vad våra kunder säger
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-white leading-tight">
            Nöjda kunder i hela <em>Stockholm</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-4 hover:bg-white/10 transition-colors"
            >
              <Stars count={review.rating} />
              <p className="font-sans text-white/80 leading-relaxed flex-1">
                "{review.text}"
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-sans font-medium text-white">{review.name}</p>
                  <p className="font-sans text-sage-pale/60 text-sm">{review.location}</p>
                </div>
                <span className="font-sans text-xs text-sage-pale/50 bg-white/5 px-3 py-1 rounded-full">
                  {review.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center font-sans text-white/40 text-sm mt-10">
          Se alla recensioner på Google
        </p>
      </div>
    </section>
  );
}
