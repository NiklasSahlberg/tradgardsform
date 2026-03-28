import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  HOME_FEATURED_PROJECT_FOLDERS,
  PROJECT_LOCATIONS,
  PROJECT_SECTIONS,
  getPreviewImageForFolder,
  locationSlug,
} from "@/lib/projectGallery";

function buildFeaturedCards() {
  return HOME_FEATURED_PROJECT_FOLDERS.map((folderName) => {
    const project = PROJECT_LOCATIONS.find((p) => p.folder === folderName);
    if (!project) return null;
    const src =
      getPreviewImageForFolder(project.folder, project.previewFile) ??
      "/bilder/NY-scaled.jpg";
    const href = `/projekt/${locationSlug(project.folder)}`;
    const tag = PROJECT_SECTIONS[project.section].label;
    const alt = `${project.title} — trädgårdsprojekt av Trädgårdsform`;
    return { project, src, href, tag, alt };
  }).filter((x): x is NonNullable<typeof x> => x !== null);
}

export default function Projects() {
  const featured = buildFeaturedCards();

  return (
    <section className="bg-sand py-12 md:py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Våra projekt
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-forest leading-tight">
            Trädgårdsdesign jag har <em>genomfört</em>
          </h2>
        </div>

        <div className="flex flex-col">
          {featured.map(({ project, src, href, tag, alt }, index) => {
            const ctaBase =
              "items-center gap-2 text-sage font-medium font-sans hover:text-forest transition-colors border-b border-sage hover:border-forest pb-0.5 w-fit";
            return (
              <article
                key={project.folder}
                className={`flex flex-col gap-8 md:gap-12 md:items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                }${
                  index > 0
                    ? " border-t-2 border-sand-dark pt-14 md:border-t-0 md:pt-20"
                    : ""
                }`}
              >
                <div className="order-1 md:order-2 w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                  <span className="hidden md:inline-block md:self-start bg-sage/15 text-sage text-xs font-sans font-medium px-3 py-1 rounded-full mb-3">
                    {tag}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl text-forest mb-4">
                    {project.title}
                  </h3>
                  <p className="font-sans text-forest/80 leading-relaxed max-w-xl mx-auto md:mx-0">
                    {project.description}
                  </p>
                  <Link
                    href={href}
                    className={`hidden md:inline-flex ${ctaBase} mt-6 self-center md:self-start justify-center md:justify-start`}
                  >
                    Se projektet <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="order-2 md:order-1 w-full md:w-1/2 flex flex-col gap-4 shrink-0">
                  <Link
                    href={href}
                    className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>
                  <Link
                    href={href}
                    className={`inline-flex md:hidden ${ctaBase} self-center justify-center mx-auto ${
                      index < featured.length - 1 ? "mb-10" : ""
                    }`}
                  >
                    Se projektet <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex flex-col items-center text-center gap-4 mt-10 md:mt-14 max-w-lg mx-auto px-2">
          <p className="font-sans text-sm md:text-base text-forest/75 leading-relaxed">
            Vill du läsa mer om alla våra projekt så hittar du det i länken nedanför.
          </p>
          <Link
            href="/projekt"
            className="inline-flex items-center gap-2 text-sage font-medium font-sans hover:text-forest transition-colors whitespace-nowrap border-b border-sage hover:border-forest pb-0.5"
          >
            Se alla projekt <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
