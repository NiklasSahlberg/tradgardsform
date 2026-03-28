"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type Review = {
  name: string;
  location: string;
  rating: number;
  text: string;
  headline?: string;
  /** Om true: ingen hopfällning / "Se mer" */
  noExpand?: boolean;
};

const reviews: Review[] = [
  {
    headline: "Japan möter skärgården",
    name: "Ulrika",
    location: "Skärgården",
    rating: 5,
    text: `Japan möter skärgården som du löste på ett strålande sätt.
När vi flyttade dit så använde vi inte trädgården alls då det bara var en igenväxt yta som slutade. Ett eldorado för alla maskrosor. Då var det terrassen en trappa upp som var den plats som gällde.
På en liten yta fick vi nu många rum. Det stora däcket med morgonsoffan i solen och sittgrupp för att umgås med familj och vänner. Allt väldigt privat fast vi hade grannar vägg i vägg.
Vi trodde innan att vi inte skulle gå ner en trappa för att sitta där och äta när vi hade terrassen där uppe, men det blev verkligen helt tvärtom. Vi satt nästan aldrig där uppe längre.
Pergolan blev ett annat rum med odlingsbäddar och även en sittplats för kvällssolen. ”Bryggan” tycker jag gav riktig skärgårdskänsla som blev som en gång ner till sjön för oss.
Vi hade många tankar och idéer innan men vi hade aldrig fått ihop det själva med det resultat som nu blev. Vi var supernöjda.`,
  },
  {
    headline: "Skälby",
    name: "Niclas och Jessica",
    location: "Skälby",
    rating: 5,
    text: "Ni har en väldigt positiv inställning, visat stor lyhördhet för våra behov och önskemål i kombination med en stor portion kreativitet. Detta skapade ett trädgårdsförslag som vi själva aldrig skulle ha kommit på. Samtidigt som det var precis det vi ville ha",
    noExpand: true,
  },
  {
    headline: "Händelserik trädgård i skärgårdsstad",
    name: "Sirkka och Pentti",
    location: "Skärgårdsstad",
    rating: 5,
    text: `Vilket lyft det blev för vår tomt, från mitten av 1970-talet, med de nya murarna, välplanerade stenpartierna och gångstigarna samt alla de nya växterna som tillsammans med några bevarade gamla och kära buskar och träd bildar en harmonisk enhet och inramning av villan! Nu väntar vi på våren och sommaren för att kunna njuta av blomsterprakten och allt det nya.

Tack Susanne.`,
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

function reviewNeedsExpand(text: string): boolean {
  if (text.length > 220) return true;
  const paragraphs = text.split(/\n/).filter((p) => p.trim().length > 0);
  return paragraphs.length > 1;
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const expandable =
    !review.noExpand && reviewNeedsExpand(review.text);
  const multiline = review.text.includes("\n");

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col gap-3 hover:bg-white/10 transition-colors">
      {review.headline ? (
        <p className="font-heading text-lg md:text-xl text-white/95 leading-snug">
          {review.headline}
        </p>
      ) : null}
      <Stars count={review.rating} />
      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <p
          className={`font-sans text-white/80 leading-relaxed ${
            multiline ? "whitespace-pre-line" : ""
          } ${expandable && !expanded ? "line-clamp-6" : ""}`}
        >
          &ldquo;{review.text}&rdquo;
        </p>
        {expandable ? (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
            className="self-start text-sm font-sans font-medium text-sage-pale hover:text-white underline underline-offset-2 decoration-white/30 hover:decoration-white/60 transition-colors"
          >
            {expanded ? "Visa mindre" : "Se mer"}
          </button>
        ) : null}
      </div>
      <div className="pt-2.5 border-t border-white/10">
        <p className="font-sans font-medium text-white">{review.name}</p>
        {review.location ? (
          <p className="font-sans text-sage-pale/60 text-sm">{review.location}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="bg-forest py-8 md:py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-7 md:mb-8">
          <p className="font-sans text-white text-sm font-medium tracking-[0.2em] uppercase mb-2">
            Vad våra kunder säger
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-white leading-tight">
            Nöjda kunder i hela <em>Stockholm</em>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review.name + review.text.slice(0, 32)}
              review={review}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
