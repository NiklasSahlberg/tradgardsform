"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type ProjectGallerySection = {
  title: string;
  images: string[];
};

type ProjectGalleryProps = {
  projectTitle: string;
  /** Platt rutnät när inga sektioner används */
  images?: string[];
  /** Sektioner med rubriker (t.ex. Nu / Innan); har företräde framför `images` */
  sections?: ProjectGallerySection[];
};

export default function ProjectGallery({
  images = [],
  sections,
  projectTitle,
}: ProjectGalleryProps) {
  const flatImages =
    sections && sections.length > 0
      ? sections.flatMap((s) => s.images)
      : images;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const goPrev = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null || flatImages.length <= 1) return i;
      return i === 0 ? flatImages.length - 1 : i - 1;
    });
  }, [flatImages.length]);

  const goNext = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null || flatImages.length <= 1) return i;
      return i === flatImages.length - 1 ? 0 : i + 1;
    });
  }, [flatImages.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, close, goPrev, goNext]);

  const useSections = Boolean(sections && sections.length > 0);

  const gridButton = (
    src: string,
    globalIndex: number,
    sectionTitle?: string
  ) => (
    <button
      key={`${src}-${globalIndex}`}
      type="button"
      onClick={() => setOpenIndex(globalIndex)}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-dark/20 shadow-sm ring-1 ring-sand-dark/30 text-left cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
      aria-label={
        sectionTitle
          ? `Visa bild ${globalIndex + 1} i helskärm (${sectionTitle})`
          : `Visa bild ${globalIndex + 1} i helskärm`
      }
    >
      <Image
        src={src}
        alt={
          sectionTitle
            ? `${projectTitle} — ${sectionTitle}, bild ${globalIndex + 1}`
            : `${projectTitle} — bild ${globalIndex + 1}`
        }
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </button>
  );

  if (flatImages.length === 0) {
    return (
      <p className="font-sans text-zinc-500 text-center py-12">
        Bilder kommer snart i det här projektet.
      </p>
    );
  }

  return (
    <>
      {useSections && sections ? (
        <div className="flex flex-col gap-0">
          {sections.map((sec, si) => {
            let offset = 0;
            for (let j = 0; j < si; j++) {
              offset += sections[j].images.length;
            }
            return (
              <div
                key={sec.title}
                className={
                  si > 0
                    ? "mt-14 pt-14 border-t-2 border-sand-dark"
                    : undefined
                }
              >
                <h2 className="font-heading text-2xl md:text-3xl text-forest mb-6 md:mb-8">
                  {sec.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {sec.images.map((src, ii) =>
                    gridButton(src, offset + ii, sec.title)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {flatImages.map((src, i) => gridButton(src, i))}
        </div>
      )}

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Bild i helskärm"
          onClick={close}
        >
          <div
            className="flex shrink-0 items-center justify-between gap-4 px-4 pt-4 pb-2 text-white/90"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-sans text-sm truncate">
              {projectTitle} — {openIndex + 1} / {flatImages.length}
            </p>
            <button
              type="button"
              onClick={close}
              className="shrink-0 rounded-full p-2.5 hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Stäng"
            >
              <X size={26} strokeWidth={1.75} />
            </button>
          </div>

          <div className="flex flex-1 min-h-0 items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 pb-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="shrink-0 rounded-full p-2 sm:p-3 hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Föregående bild"
            >
              <ChevronLeft size={32} strokeWidth={1.5} className="text-white sm:w-9 sm:h-9" />
            </button>

            <div
              className="relative h-full w-full min-h-[min(70vh,800px)] flex-1 max-h-[calc(100vh-8rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={flatImages[openIndex]}
                alt={`${projectTitle} — bild ${openIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="shrink-0 rounded-full p-2 sm:p-3 hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Nästa bild"
            >
              <ChevronRight size={32} strokeWidth={1.5} className="text-white sm:w-9 sm:h-9" />
            </button>
          </div>

          <p className="shrink-0 px-4 pb-4 text-center font-sans text-xs text-white/45">
            Klicka på den mörka ytan eller tryck Esc för att stänga
          </p>
        </div>
      )}
    </>
  );
}
