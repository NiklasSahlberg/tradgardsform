"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type ProjectGalleryProps = {
  images: string[];
  projectTitle: string;
};

export default function ProjectGallery({
  images,
  projectTitle,
}: ProjectGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const goPrev = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null || images.length <= 1) return i;
      return i === 0 ? images.length - 1 : i - 1;
    });
  }, [images.length]);

  const goNext = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null || images.length <= 1) return i;
      return i === images.length - 1 ? 0 : i + 1;
    });
  }, [images.length]);

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

  if (images.length === 0) {
    return (
      <p className="font-sans text-zinc-500 text-center py-12">
        Bilder kommer snart i det här projektet.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-dark/20 shadow-sm ring-1 ring-sand-dark/30 text-left cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
            aria-label={`Visa bild ${i + 1} i helskärm`}
          >
            <Image
              src={src}
              alt={`${projectTitle} — bild ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

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
              {projectTitle} — {openIndex + 1} / {images.length}
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
                src={images[openIndex]}
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
