import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  PROJECT_LOCATIONS,
  PROJECT_SECTION_ORDER,
  PROJECT_SECTIONS,
  getPreviewImageForFolder,
  locationSlug,
} from "@/lib/projectGallery";

export const metadata: Metadata = {
  title: "Projekt & referenser | Trädgårdsform Stockholm",
  description:
    "Se utvalda trädgårdsprojekt från Täby, Vallentuna, Enebyberg, Silverdal, Costa Tropical, Djurhamn i Värmdö, Skälby i Järfälla, 80-tals villa, 60-tals villa och utvalda BRF-uppdrag i Stockholm — trädgårdsdesign av Trädgårdsform.",
};

type ProjectCardProps = {
  title: string;
  slug: string;
  description: string;
  preview: string | null;
};

function ProjectCard({ title, slug, description, preview }: ProjectCardProps) {
  return (
    <Link
      href={`/projekt/${slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white ring-1 ring-black/[0.07] shadow-[0_2px_12px_-4px_rgba(61,80,48,0.1)] transition-all duration-300 hover:shadow-[0_18px_40px_-14px_rgba(61,80,48,0.18)] hover:ring-sage/30 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
    >
      <div className="relative aspect-[16/10] bg-sand-dark/20">
        {preview ? (
          <Image
            src={preview}
            alt={`${title} — förhandsbild`}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-sans text-sm text-zinc-400">
            Bild kommer snart
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.72] via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <h3 className="font-heading text-xl md:text-2xl lg:text-[1.65rem] text-white leading-snug tracking-tight drop-shadow-sm">
            {title}
          </h3>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6 md:p-7 border-t border-sand-dark/20">
        <p className="font-sans text-zinc-500 text-[15px] md:text-base leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-forest font-sans font-semibold text-sm tracking-wide group-hover:text-sage transition-colors">
          Visa galleri
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

export default function ProjektPage() {
  const projects = PROJECT_LOCATIONS.map((loc) => {
    const slug = locationSlug(loc.folder);
    const preview = getPreviewImageForFolder(loc.folder, loc.previewFile);
    return { ...loc, slug, preview };
  });

  const groupedSections = PROJECT_SECTION_ORDER.map((sectionId) => ({
    id: sectionId,
    ...PROJECT_SECTIONS[sectionId],
    items: projects.filter((p) => p.section === sectionId),
  })).filter((g) => g.items.length > 0);

  const heroImage =
    projects.find((p) => p.preview)?.preview ?? "/bilder/ny-hero.webp";

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage}
          alt="Trädgårdsdesign — utvalda projekt av Trädgårdsform"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white text-base font-sans font-medium tracking-[0.2em] uppercase mb-6 [text-shadow:0_1px_10px_rgba(0,0,0,0.65)]">
            Våra projekt
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 [text-shadow:0_1px_2px_rgba(0,0,0,0.45),0_2px_16px_rgba(0,0,0,0.35)]">
            Trädgårdsdesign i <em>praktiken</em>
          </h1>
          <p className="text-white text-lg md:text-xl font-sans max-w-2xl mx-auto mb-8 leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.88),0_4px_32px_rgba(0,0,0,0.65),0_0_48px_rgba(0,0,0,0.45)]">
            Utforska våra projekt — sorterade efter typ av uppdrag. Varje kort
            leder till hela bildgalleriet.
          </p>

          <nav
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8"
            aria-label="Hoppa till sektion"
          >
            {groupedSections.map(({ id, label }) => (
              <a
                key={id}
                href={`#projekt-sektion-${id}`}
                className="rounded-full border border-white/35 bg-white/12 backdrop-blur-sm px-4 py-2 text-sm font-sans font-medium text-white/95 hover:bg-white/22 transition-colors [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#projekt-kort"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/35 px-6 py-3 text-sm font-sans font-medium text-white hover:bg-white/25 transition-colors [text-shadow:0_1px_10px_rgba(0,0,0,0.65)]"
          >
            Se alla projekt
            <span className="inline-block translate-y-px" aria-hidden>
              ↓
            </span>
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-sans tracking-widest uppercase">Scrolla</span>
          <div className="w-px h-10 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* Kort per sektion */}
      <section
        id="projekt-kort"
        className="scroll-mt-24 relative bg-cream px-0 md:px-6 pt-4 pb-20 md:pb-28"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl mx-auto mb-10 md:mb-14 pt-8 md:pt-10 px-6 md:px-0 text-center">
            <div
              className="w-12 h-0.5 bg-sage/60 mb-6 rounded-full mx-auto"
              aria-hidden
            />
            <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase">
              Referenser
            </p>
          </div>

          <div className="flex flex-col gap-16 md:gap-24 max-md:gap-0 max-md:divide-y max-md:divide-sand-dark/25">
            {groupedSections.map(({ id, label, lead, items }) => (
              <div
                key={id}
                id={`projekt-sektion-${id}`}
                className="scroll-mt-28 w-full px-6 py-10 sm:py-12 md:px-0 md:py-0 max-md:pt-10 max-md:pb-10 first:max-md:pt-6"
              >
                <header className="mb-9 md:mb-11 border-b border-sand-dark/20 pb-8 md:pb-10 text-center">
                  <h3 className="font-heading text-3xl md:text-4xl lg:text-[2.5rem] text-forest leading-[1.15] tracking-tight mb-4">
                    {label}
                  </h3>
                  <p className="font-sans text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    {lead}
                  </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
                  {items.map((p) => (
                    <ProjectCard
                      key={p.folder}
                      title={p.title}
                      slug={p.slug}
                      description={p.description}
                      preview={p.preview}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-forest py-20 md:py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,var(--color-sage-pale),transparent_50%)]"
          aria-hidden
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col gap-6">
          <p className="font-sans text-sage-pale/80 text-xs font-medium tracking-[0.25em] uppercase">
            Nästa steg
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.5rem] text-white leading-tight tracking-tight">
            Sugen på din egen <em className="text-sage-pale">drömträdgård</em>?
          </h2>
          <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed">
            Berätta om din tomt — så tar vi första steget tillsammans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
            <Link
              href="/boka-hembesok"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sage text-white font-medium text-base tracking-wide hover:bg-sage-light hover:text-forest transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              Intresseanmälan
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/kontakta-oss"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/25 text-white font-medium text-base tracking-wide hover:bg-white/15 transition-colors"
            >
              Kontakta oss
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
