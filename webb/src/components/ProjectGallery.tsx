"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  galleryDimsForPublicUrl,
  galleryExplicitPortraitAspect,
  galleryOrisForUrls,
} from "@/lib/galleryManifest";
import {
  packGalleryRows,
  type GalleryOri,
  type PackedGalleryItem,
} from "@/lib/packGalleryRows";

export type ProjectGallerySection = {
  title: string;
  images: string[];
};

type ProjectGalleryProps = {
  projectTitle: string;
  /** Mappnamn i gallery-manifest (samma som projektets `folder`). */
  galleryFolder: string;
  /** Alla miniatyrer i samma 4:3-ruta (t.ex. Enebyberg). */
  uniformGalleryCells?: boolean;
  /** Sektionstitlar där sista miniatyren på desktop görs fullbredd (12 kolumner). */
  galleryWideLastImageSectionTitles?: readonly string[];
  images?: string[];
  sections?: ProjectGallerySection[];
};

const SIZES_MOBILE = "100vw";
const SIZES_DESK_LAND = "(max-width: 1024px) 50vw, 50vw";
const SIZES_DESK_NARROW = "(max-width: 1024px) 25vw, 25vw";

/** Enhetligt rutnät: två lika breda kolumner från sm, alla rutor 4:3 i komponenten. */
const UNIFORM_GRID_CLASS =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8";

type UniformGridThumbProps = {
  src: string;
  globalIndex: number;
  projectTitle: string;
  sectionTitle?: string;
  onOpen: () => void;
  sizes: string;
};

function UniformGridThumb({
  src,
  globalIndex,
  projectTitle,
  sectionTitle,
  onOpen,
  sizes,
}: UniformGridThumbProps) {
  const alt =
    sectionTitle !== undefined
      ? `${projectTitle} — ${sectionTitle}, bild ${globalIndex + 1}`
      : `${projectTitle} — bild ${globalIndex + 1}`;

  const ariaLabel =
    sectionTitle !== undefined
      ? `Visa bild ${globalIndex + 1} i helskärm (${sectionTitle})`
      : `Visa bild ${globalIndex + 1} i helskärm`;

  const baseRing =
    "shadow-sm ring-1 ring-sand-dark/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage";

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-sand-dark/20 ${baseRing}`}
      aria-label={ariaLabel}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        sizes={sizes}
      />
    </button>
  );
}

type DesktopThumbCellProps = {
  src: string;
  globalIndex: number;
  projectTitle: string;
  sectionTitle?: string;
  galleryFolder: string;
  span: PackedGalleryItem["span"];
  ori: GalleryOri;
  /** Om satt: samma aspect för hela porträtt-raden (max h/w bland bilderna). */
  portraitRowMaxHOverW?: number;
  /** Rad med både L och P: porträtt fyller radhöjd (samma som landskap i mitten). */
  portraitFillMixedRow?: boolean;
  onOpen: () => void;
};

function DesktopThumbCell({
  src,
  globalIndex,
  projectTitle,
  sectionTitle,
  galleryFolder,
  span,
  ori,
  portraitRowMaxHOverW,
  portraitFillMixedRow,
  onOpen,
}: DesktopThumbCellProps) {
  const colClass =
    span === 12
      ? "sm:col-span-12"
      : span === 3
        ? "sm:col-span-3"
        : span === 4
          ? "sm:col-span-4"
          : "sm:col-span-6";

  const alt =
    sectionTitle !== undefined
      ? `${projectTitle} — ${sectionTitle}, bild ${globalIndex + 1}`
      : `${projectTitle} — bild ${globalIndex + 1}`;

  const ariaLabel =
    sectionTitle !== undefined
      ? `Visa bild ${globalIndex + 1} i helskärm (${sectionTitle})`
      : `Visa bild ${globalIndex + 1} i helskärm`;

  const baseRing =
    "shadow-sm ring-1 ring-sand-dark/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage";

  if (ori === "L") {
    return (
      <div className={`col-span-12 ${colClass}`}>
        <button
          type="button"
          onClick={onOpen}
          className={`group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-sand-dark/20 ${baseRing}`}
          aria-label={ariaLabel}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes={SIZES_DESK_LAND}
          />
        </button>
      </div>
    );
  }

  if (span === 6) {
    return (
      <div className={`col-span-12 ${colClass}`}>
        <button
          type="button"
          onClick={onOpen}
          className={`group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-sand-dark/20 ${baseRing}`}
          aria-label={ariaLabel}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            sizes={SIZES_DESK_LAND}
          />
        </button>
      </div>
    );
  }

  if (portraitFillMixedRow) {
    return (
      <div
        className={`col-span-12 ${colClass} h-full min-h-0 self-stretch`}
      >
        <button
          type="button"
          onClick={onOpen}
          className={`group relative h-full min-h-0 w-full cursor-zoom-in overflow-hidden rounded-2xl bg-sand-dark/20 text-left ${baseRing}`}
          aria-label={ariaLabel}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            sizes={SIZES_DESK_NARROW}
          />
        </button>
      </div>
    );
  }

  const dims = galleryDimsForPublicUrl(galleryFolder, src);
  const explicitAspect = galleryExplicitPortraitAspect(src, galleryFolder);
  const portraitAspectStyle =
    explicitAspect != null
      ? ({ aspectRatio: explicitAspect } as const)
      : portraitRowMaxHOverW != null
        ? ({ aspectRatio: `1 / ${portraitRowMaxHOverW}` } as const)
        : dims != null
          ? ({ aspectRatio: `${dims.w} / ${dims.h}` } as const)
          : ({ aspectRatio: "3 / 4" } as const);

  return (
    <div className={`col-span-12 ${colClass}`}>
      <button
        type="button"
        onClick={onOpen}
        style={portraitAspectStyle}
        className={`group relative w-full cursor-zoom-in overflow-hidden rounded-2xl bg-sand-dark/20 text-left ${baseRing}`}
        aria-label={ariaLabel}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          sizes={span === 12 ? SIZES_DESK_LAND : SIZES_DESK_NARROW}
        />
      </button>
    </div>
  );
}

type MobileThumbProps = {
  src: string;
  globalIndex: number;
  projectTitle: string;
  sectionTitle?: string;
  galleryFolder: string;
  uniformCells?: boolean;
  onOpen: () => void;
};

function MobileThumbnail({
  src,
  globalIndex,
  projectTitle,
  sectionTitle,
  galleryFolder,
  uniformCells = false,
  onOpen,
}: MobileThumbProps) {
  if (uniformCells) {
    return (
      <UniformGridThumb
        src={src}
        globalIndex={globalIndex}
        projectTitle={projectTitle}
        sectionTitle={sectionTitle}
        onOpen={onOpen}
        sizes={SIZES_MOBILE}
      />
    );
  }

  const isP =
    galleryOrisForUrls([src], galleryFolder)[0] === "P";

  const dims = galleryDimsForPublicUrl(galleryFolder, src);
  const explicitAspect = galleryExplicitPortraitAspect(src, galleryFolder);

  const alt =
    sectionTitle !== undefined
      ? `${projectTitle} — ${sectionTitle}, bild ${globalIndex + 1}`
      : `${projectTitle} — bild ${globalIndex + 1}`;

  const ariaLabel =
    sectionTitle !== undefined
      ? `Visa bild ${globalIndex + 1} i helskärm (${sectionTitle})`
      : `Visa bild ${globalIndex + 1} i helskärm`;

  const baseRing =
    "shadow-sm ring-1 ring-sand-dark/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage";

  const portraitAspectStyle =
    isP && explicitAspect != null
      ? ({ aspectRatio: explicitAspect } as const)
      : isP && dims != null
        ? ({ aspectRatio: `${dims.w} / ${dims.h}` } as const)
        : undefined;
  const portraitAspectClass =
    isP && explicitAspect == null && dims == null ? "aspect-[3/4]" : "";

  if (isP) {
    return (
      <button
        type="button"
        onClick={onOpen}
        style={portraitAspectStyle ?? undefined}
        className={`group relative w-full cursor-zoom-in overflow-hidden rounded-2xl bg-sand-dark/20 ${portraitAspectClass} ${baseRing}`}
        aria-label={ariaLabel}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          sizes={SIZES_MOBILE}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-sand-dark/20 ${baseRing}`}
      aria-label={ariaLabel}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes={SIZES_MOBILE}
      />
    </button>
  );
}

type DesktopGalleryRowsProps = {
  urls: string[];
  galleryFolder: string;
  indexOffset: number;
  projectTitle: string;
  sectionTitle?: string;
  uniformCells?: boolean;
  /** Sista miniatyren på egen rad i full bredd (12 kolumner). */
  wideLastImage?: boolean;
  onOpen: (globalIndex: number) => void;
};

function DesktopGalleryRows({
  urls,
  galleryFolder,
  indexOffset,
  projectTitle,
  sectionTitle,
  uniformCells = false,
  wideLastImage = false,
  onOpen,
}: DesktopGalleryRowsProps) {
  if (urls.length === 0) return null;

  if (uniformCells) {
    return (
      <div className={`hidden sm:grid ${UNIFORM_GRID_CLASS}`}>
        {urls.map((src, index) => (
          <UniformGridThumb
            key={`${src}-${indexOffset + index}`}
            src={src}
            globalIndex={indexOffset + index}
            projectTitle={projectTitle}
            sectionTitle={sectionTitle}
            onOpen={() => onOpen(indexOffset + index)}
            sizes={SIZES_DESK_LAND}
          />
        ))}
      </div>
    );
  }

  const oris = useMemo(
    () => galleryOrisForUrls(urls, galleryFolder),
    [urls, galleryFolder]
  );
  const rows = useMemo(() => {
    if (!wideLastImage || urls.length === 0) return packGalleryRows(oris);
    if (urls.length === 1) return [[{ index: 0, span: 12 as const }]];
    const headRows = packGalleryRows(oris.slice(0, -1));
    return [...headRows, [{ index: urls.length - 1, span: 12 as const }]];
  }, [oris, urls.length, wideLastImage]);

  return (
    <div className="hidden sm:flex flex-col gap-6 lg:gap-8">
      {rows.map((row, ri) => {
        const allNarrow = row.length > 0 && row.every((x) => x.span === 3);
        const narrowRowSpanSum = row.reduce((acc, x) => acc + x.span, 0);
        /** Endast ofullständiga smala rader (t.ex. 3+3+3); full 12-kolumnsrad ska inte w-1/2-placeholder — blir för låg mot nästa rad. */
        const incompleteNarrowRow = allNarrow && narrowRowSpanSum < 12;
        const allPortraitInRow =
          row.length > 0 &&
          row.every(({ index }) => oris[index] === "P");
        const rowHasLandscape = row.some(
          ({ index }) => oris[index] === "L"
        );
        const rowHasPortrait = row.some(
          ({ index }) => oris[index] === "P"
        );
        const portraitFillMixedRow = rowHasLandscape && rowHasPortrait;
        let portraitRowMaxHOverW: number | undefined;
        if (allPortraitInRow) {
          let maxHw = 0;
          for (const { index } of row) {
            const d = galleryDimsForPublicUrl(galleryFolder, urls[index]);
            if (d && d.w > 0) maxHw = Math.max(maxHw, d.h / d.w);
          }
          portraitRowMaxHOverW = maxHw > 0 ? maxHw : undefined;
        }
        return (
          <div key={ri} className="relative">
            {incompleteNarrowRow ? (
              <div
                className="pointer-events-none invisible aspect-[4/3] w-1/2 shrink-0 select-none"
                aria-hidden
              />
            ) : null}
            <div
              className={
                incompleteNarrowRow
                  ? "absolute inset-0 grid grid-cols-12 items-stretch gap-4 sm:gap-6 lg:gap-8"
                  : "grid grid-cols-12 items-stretch gap-4 sm:gap-6 lg:gap-8"
              }
            >
              {row.map(({ index, span }) => {
                const src = urls[index];
                const ori = oris[index];
                const gi = indexOffset + index;
                return (
                  <DesktopThumbCell
                    key={`${src}-${gi}`}
                    src={src}
                    globalIndex={gi}
                    span={span}
                    ori={ori}
                    portraitRowMaxHOverW={portraitRowMaxHOverW}
                    portraitFillMixedRow={
                      portraitFillMixedRow && ori === "P"
                    }
                    galleryFolder={galleryFolder}
                    projectTitle={projectTitle}
                    sectionTitle={sectionTitle}
                    onOpen={() => onOpen(gi)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ProjectGallery({
  images = [],
  sections,
  projectTitle,
  galleryFolder,
  uniformGalleryCells = false,
  galleryWideLastImageSectionTitles,
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

  const lightboxTouchRef = useRef<{ x: number; y: number } | null>(null);

  const onLightboxTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    lightboxTouchRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const onLightboxTouchEnd = useCallback(
    (e: TouchEvent) => {
      const start = lightboxTouchRef.current;
      lightboxTouchRef.current = null;
      if (!start || flatImages.length <= 1) return;
      const t = e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const minSwipe = 50;
      if (Math.abs(dx) < minSwipe) return;
      if (Math.abs(dx) < Math.abs(dy) * 1.15) return;
      if (dx < 0) goNext();
      else goPrev();
    },
    [flatImages.length, goNext, goPrev]
  );

  const onLightboxTouchCancel = useCallback(() => {
    lightboxTouchRef.current = null;
  }, []);

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

  if (flatImages.length === 0) {
    return (
      <p className="font-sans text-zinc-500 text-center py-12">
        Bilder kommer snart i det här projektet.
      </p>
    );
  }

  const lightboxDims =
    openIndex !== null
      ? galleryDimsForPublicUrl(galleryFolder, flatImages[openIndex])
      : null;
  const lightboxW = lightboxDims?.w ?? 1920;
  const lightboxH = lightboxDims?.h ?? 1080;

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
                    ? "mt-14 border-t-2 border-sand-dark pt-14"
                    : undefined
                }
              >
                <h2 className="font-heading text-2xl text-forest md:mb-8 md:text-3xl mb-6">
                  {sec.title}
                </h2>
                <div
                  className={
                    uniformGalleryCells
                      ? `grid gap-4 sm:hidden ${UNIFORM_GRID_CLASS}`
                      : "flex flex-col gap-4 sm:hidden"
                  }
                >
                  {sec.images.map((src, ii) => (
                    <MobileThumbnail
                      key={`${src}-${offset + ii}`}
                      src={src}
                      globalIndex={offset + ii}
                      projectTitle={projectTitle}
                      sectionTitle={sec.title}
                      galleryFolder={galleryFolder}
                      uniformCells={uniformGalleryCells}
                      onOpen={() => setOpenIndex(offset + ii)}
                    />
                  ))}
                </div>
                <DesktopGalleryRows
                  urls={sec.images}
                  galleryFolder={galleryFolder}
                  indexOffset={offset}
                  projectTitle={projectTitle}
                  sectionTitle={sec.title}
                  uniformCells={uniformGalleryCells}
                  wideLastImage={Boolean(
                    galleryWideLastImageSectionTitles?.includes(sec.title)
                  )}
                  onOpen={setOpenIndex}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div
            className={
              uniformGalleryCells
                ? `grid gap-4 sm:hidden ${UNIFORM_GRID_CLASS}`
                : "flex flex-col gap-4 sm:hidden"
            }
          >
            {flatImages.map((src, i) => (
              <MobileThumbnail
                key={`${src}-${i}`}
                src={src}
                globalIndex={i}
                projectTitle={projectTitle}
                galleryFolder={galleryFolder}
                uniformCells={uniformGalleryCells}
                onOpen={() => setOpenIndex(i)}
              />
            ))}
          </div>
          <DesktopGalleryRows
            urls={flatImages}
            galleryFolder={galleryFolder}
            indexOffset={0}
            projectTitle={projectTitle}
            uniformCells={uniformGalleryCells}
            onOpen={setOpenIndex}
          />
        </>
      )}

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex flex-col bg-black/28 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Bild i helskärm"
        >
          <button
            type="button"
            className="absolute inset-0 z-0 cursor-default border-0 bg-transparent p-0"
            onClick={close}
            aria-label="Stäng bildvisning"
          />

          <div className="relative z-10 flex min-h-0 flex-1 flex-col pointer-events-none">
            <div
              className="flex shrink-0 items-center justify-between gap-4 px-4 pt-4 pb-2 text-white/90 pointer-events-auto"
              onClick={close}
            >
              <p className="font-sans text-sm truncate">
                {projectTitle} — {openIndex + 1} / {flatImages.length}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="shrink-0 rounded-full p-2.5 hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Stäng"
              >
                <X size={26} strokeWidth={1.75} />
              </button>
            </div>

            <div className="relative flex flex-1 min-h-0 w-full items-center justify-center px-3 pb-2 pointer-events-none md:px-0 md:pb-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="pointer-events-auto absolute top-1/2 left-1 z-20 -translate-y-1/2 rounded-full p-2 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] md:left-3 md:p-3"
                aria-label="Föregående bild"
              >
                <ChevronLeft
                  size={32}
                  strokeWidth={1.5}
                  className="text-white md:h-9 md:w-9"
                />
              </button>

              <div className="relative z-10 flex w-full min-h-0 items-center justify-center pointer-events-none">
                <div
                  className="pointer-events-auto flex max-w-full touch-pan-y items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={onLightboxTouchStart}
                  onTouchEnd={onLightboxTouchEnd}
                  onTouchCancel={onLightboxTouchCancel}
                >
                  <Image
                    src={flatImages[openIndex]}
                    alt={`${projectTitle} — bild ${openIndex + 1}`}
                    width={lightboxW}
                    height={lightboxH}
                    className="max-h-[calc(100vh-8rem)] w-auto max-w-full object-contain md:max-h-[calc(100vh-6rem)]"
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="pointer-events-auto absolute top-1/2 right-1 z-20 -translate-y-1/2 rounded-full p-2 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] md:right-3 md:p-3"
                aria-label="Nästa bild"
              >
                <ChevronRight
                  size={32}
                  strokeWidth={1.5}
                  className="text-white md:h-9 md:w-9"
                />
              </button>
            </div>

            <p className="pointer-events-none shrink-0 px-4 pb-4 text-center font-sans text-xs text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
              Svep åt sidan, pilar eller Esc · klick utanför bilden stänger
            </p>
          </div>
        </div>
      )}
    </>
  );
}
