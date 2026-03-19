import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    src: "/bilder/926C0C54-F68D-40D2-B18E-09FEFCEADE84-scaled.jpg",
    alt: "Trädgårdsdesign av villaträdgård i Bromma, Stockholm",
    title: "Villaträdgård, Bromma",
    tag: "Komplett planering",
  },
  {
    src: "/bilder/5-1024x735.jpg",
    alt: "Trädgårdsdesign med idéskiss och växtförslag, Lidingö Stockholm",
    title: "Sommarstugeträdgård, Lidingö",
    tag: "Idéskiss med växtförslag",
  },
  {
    src: "/bilder/IMG_1547-1024x709.jpg",
    alt: "Trädgårdsdesign för radhustomt i Järfälla, Stockholm",
    title: "Radhustomt, Järfälla",
    tag: "Basritning",
  },
  {
    src: "/bilder/galleri/1-TROSA.jpg",
    alt: "Trädgårdsdesign i Trosa",
    title: "Trädgårdsdesign i Trosa",
    tag: "Ritningsexempel",
  },
];

export default function Projects() {
  return (
    <section className="bg-sand py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-sans text-pink-brand text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Våra projekt
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-forest leading-tight">
              Trädgårdsdesign vi har <em>genomfört</em>
            </h2>
          </div>
          <Link
            href="/projekt"
            className="inline-flex items-center gap-2 text-sage font-medium font-sans hover:text-forest transition-colors whitespace-nowrap border-b border-sage hover:border-forest pb-0.5"
          >
            Se alla projekt <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] shadow-md cursor-pointer"
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block bg-sage/80 text-white text-xs font-sans font-medium px-3 py-1 rounded-full mb-2">
                  {project.tag}
                </span>
                <h3 className="font-heading text-lg text-white leading-snug">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
