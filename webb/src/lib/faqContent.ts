/** Vanliga frågor — delad mellan FAQ-komponenten och FAQPage-schema (SEO / AI-svar). */
export const faqs = [
  {
    question: "Vad ingår i ett kostnadsfritt hembesök?",
    answer:
      "Under hembesöket (ca 1,5 timme) går vi igenom din trädgård och dina önskemål. Vi använder vår Stilguide och Checklista för att klargöra behov, stil och funktioner. Du behöver ha en aktuell tomtkarta tillgänglig. Hembesök inom Stockholm norrort är alltid kostnadsfria.",
  },
  {
    question: "Hur funkar priserna hos er – är det fast pris?",
    answer:
      "Ja. Hos Trädgårdsform har våra huvudpaket för trädgårdsdesign och trädgårdsplanering fasta priser, så du vet vad det kostar innan du beställer — utan löpande timdebitering för själva paketen. På sidan Tjänster hittar du aktuella priser inklusive moms för bland annat trädgårdsrådgivning, idéskiss, idéskiss med växtförslag, basritning och komplett planering. Priserna gäller för villatomter upp till 1 000 kvm i Stockholm enligt den prisinformation som anges där. Bor du längre bort, har en större tomt eller vill lägga till något utöver standardpaketen får du en tydlig offert så du fortfarande har full koll på kostnaden.",
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
      "Trädgårdsform har ett kontaktnät med erfarna leverantörer av växter, marksten och markanläggare i Stockholm. Vi kan gärna tipsa om anläggare som kan förverkliga din trädgårdsritning.",
  },
  {
    question: "Vad skiljer en Idéskiss från en Basritning?",
    answer:
      "Idéskissen är en ritning som visar trädgårdens rum och struktur — utan detaljerade växtförslag eller exakta material. Basritningen är mer komplett och innehåller materialritning, planteringsritning med växtförteckning samt en belysningsplan. Basritningen fungerar som ett komplett underlag för en anläggare.",
  },
  {
    question: "Erbjuder ni även hjälp med belysning?",
    answer:
      "Ja, vi tar fram belysningsplaner som visar placering, armaturförslag och effekt anpassad för din trädgård. Belysningsplanen ingår i Basritning och Komplett planering, men kan även köpas till separat.",
  },
] as const;

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
