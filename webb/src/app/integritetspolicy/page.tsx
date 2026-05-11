import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integritetspolicy | Trädgårdsform",
  description:
    "Hur Trädgårdsform hanterar personuppgifter och cookies på webbplatsen tradgardsform.se.",
};

export default function IntegritetspolicyPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-3">
          Juridisk information
        </p>
        <h1 className="font-heading text-4xl md:text-5xl text-forest mb-8">
          Integritetspolicy
        </h1>
        <p className="font-sans text-zinc-500 text-sm mb-10">
          Senast uppdaterad: {new Date().getFullYear()}
        </p>

        <div className="font-sans text-zinc-700 space-y-8 max-w-none">
          <section>
            <h2 className="font-heading text-2xl text-forest mb-3">
              Personuppgiftsansvarig
            </h2>
            <p className="leading-relaxed">
              Trädgårdsform (org.nr 559191-1705) är personuppgiftsansvarig för
              behandlingen av personuppgifter som du lämnar via denna
              webbplats, till exempel genom intresseanmälan eller e-post.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-forest mb-3">
              Vilka uppgifter samlas in
            </h2>
            <p className="leading-relaxed">
              När du fyller i formulär eller kontaktar oss kan vi behandla namn,
              e-postadress, telefonnummer, adress och fritext som du själv
              anger. Uppgifterna används för att kunna återkomma till dig i
              samband med ditt ärende.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-forest mb-3">
              Cookies på webbplatsen
            </h2>
            <p className="leading-relaxed mb-3">
              Vi använder en cookie‑liknande lagring i webbläsaren (
              <code className="rounded bg-sand/80 px-1.5 py-0.5 text-sm">
                localStorage
              </code>
              ) för att komma ihåg ditt val i cookie‑bannern (nödvändigt för
              samtyckeshanteringen).
            </p>
            <p className="leading-relaxed">
              Om du väljer &quot;Acceptera alla&quot; kan vi visa en inbäddad
              karta från Google (Google Maps) på kontaktsidan. Google kan då
              sätta egna cookies enligt deras villkor — därför frågar vi om
              samtycke först. Väljer du endast nödvändiga cookies visas en länk
              till Google Maps i stället för inbäddning.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-forest mb-3">
              Dina rättigheter
            </h2>
            <p className="leading-relaxed">
              Enligt GDPR har du rätt att begära registerutdrag, rättelse,
              begränsning av behandling, invändning och i vissa fall radering.
              Du kan också lämna klagan till Integritetsskyddsmyndigheten (IMY).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-forest mb-3">Kontakt</h2>
            <p className="leading-relaxed">
              Frågor om integritet:{" "}
              <a
                href="mailto:info@tradgardsform.se"
                className="font-medium text-sage underline underline-offset-2 hover:text-forest"
              >
                info@tradgardsform.se
              </a>
              .
            </p>
          </section>

          <p className="pt-4 border-t border-sand-dark/20">
            <Link
              href="/"
              className="font-medium text-sage underline underline-offset-2 hover:text-forest"
            >
              Tillbaka till startsidan
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
