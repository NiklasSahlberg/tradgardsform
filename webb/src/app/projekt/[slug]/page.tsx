import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  PROJECT_LOCATIONS,
  getImagesForFolder,
  getPreviewImageForFolder,
  getProjectBySlug,
  locationSlug,
} from "@/lib/projectGallery";

export function generateStaticParams() {
  return PROJECT_LOCATIONS.map((p) => ({
    slug: locationSlug(p.folder),
  }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Projekt | Trädgårdsform" };
  }
  return {
    title: `${project.title} — Trädgårdsprojekt | Trädgårdsform`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const images = getImagesForFolder(project.folder, project.previewFile);
  const heroSrc =
    getPreviewImageForFolder(project.folder, project.previewFile) ??
    "/bilder/NY-scaled.jpg";

  return (
    <>
      {/* Sidhuvud med förhandsbild */}
      <section className="relative min-h-[45vh] md:min-h-[50vh] flex flex-col justify-end overflow-hidden pt-28 pb-10 md:pb-14 px-6">
        <Image
          src={heroSrc}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link
            href="/projekt"
            className="inline-flex items-center gap-2 text-white/90 font-sans text-sm font-medium hover:text-white mb-6 transition-colors drop-shadow-md"
          >
            <ArrowLeft size={18} aria-hidden />
            Alla projekt
          </Link>
          <p className="font-sans text-pink-brand-light text-sm font-medium tracking-[0.2em] uppercase mb-2 drop-shadow">
            Projekt
          </p>
          <h1 className="font-heading text-4xl md:text-6xl text-white leading-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
            {project.title}
          </h1>
          <p className="font-sans text-white/90 text-lg md:text-xl max-w-2xl mt-4 leading-relaxed drop-shadow-md">
            {project.description}
          </p>
        </div>
      </section>

      {/* Galleri */}
      <section className="bg-cream px-6 py-14 md:py-20">
        <div className="max-w-7xl mx-auto">
          {images.length === 0 ? (
            <p className="font-sans text-zinc-500 text-center py-12">
              Bilder kommer snart i det här projektet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {images.map((src, i) => (
                <figure
                  key={src}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-dark/20 shadow-sm ring-1 ring-sand-dark/30"
                >
                  <Image
                    src={src}
                    alt={`${project.title} — bild ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </figure>
              ))}
            </div>
          )}

          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/projekt"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-sand-dark/40 text-forest font-sans font-medium hover:bg-sand/80 transition-colors"
            >
              <ArrowLeft size={18} aria-hidden />
              Tillbaka till alla projekt
            </Link>
            <Link
              href="/boka-hembesok"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-sage text-white font-medium hover:bg-forest transition-all shadow-md"
            >
              Intresseanmälan
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
