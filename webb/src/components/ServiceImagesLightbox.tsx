"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type TouchEvent,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ServiceImagesLightboxProps = {
  images: string[];
  alts: string[];
  contextLabel: string;
  variant: "single" | "grid";
  /** t.ex. `object-[center_62%]` för att visa lite lägre i bilden vid object-cover */
  thumbnailObjectPosition?: string;
  /** false = bara visa bilder, ingen lightbox eller klick */
  interactive?: boolean;
};

const ZOOM_MIN = 1;
const ZOOM_MAX = 5;
const ZOOM_STEP = 1.09;
const DESKTOP_ZOOM_MIN_PX = 640;

/** Håll pan inom så att den skalade bilden inte lämnar tom yta i clip-rutan (centrerad origins-modell). */
function clampLightboxPan(
  pan: { x: number; y: number },
  zoom: number,
  cw: number,
  ch: number,
  bw: number,
  bh: number
): { x: number; y: number } {
  if (!cw || !ch || !bw || !bh || zoom <= 0) return pan;
  const halfX = Math.max(0, (bw * zoom - cw) / 2);
  const halfY = Math.max(0, (bh * zoom - ch) / 2);
  return {
    x: Math.min(halfX, Math.max(-halfX, pan.x)),
    y: Math.min(halfY, Math.max(-halfY, pan.y)),
  };
}

export default function ServiceImagesLightbox({
  images,
  alts,
  contextLabel,
  variant,
  thumbnailObjectPosition,
  interactive = true,
}: ServiceImagesLightboxProps) {
  const thumbObjectPos = thumbnailObjectPosition ?? "object-center";
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [lightboxPan, setLightboxPan] = useState({ x: 0, y: 0 });

  const desktopZoomRef = useRef<HTMLDivElement>(null);
  const desktopPanContainerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(1);
  zoomRef.current = lightboxZoom;
  /** Pek-session: panorering vid zoom > 1; liten rörelse räknas som klick-zoom */
  const pointerSessionRef = useRef({
    down: false,
    capture: false,
    lastX: 0,
    lastY: 0,
    totalDrag: 0,
  });
  const ignoreClickZoomRef = useRef(false);
  const clickZoomDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      if (!start || images.length <= 1) return;
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
    [images.length, goNext, goPrev]
  );

  const onLightboxTouchCancel = useCallback(() => {
    lightboxTouchRef.current = null;
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (images.length > 1) {
        if (e.key === "ArrowLeft") goPrev();
        if (e.key === "ArrowRight") goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, close, goPrev, goNext, images.length]);

  useEffect(() => {
    setLightboxZoom(1);
    setLightboxPan({ x: 0, y: 0 });
    if (clickZoomDelayRef.current) {
      clearTimeout(clickZoomDelayRef.current);
      clickZoomDelayRef.current = null;
    }
  }, [openIndex]);

  useLayoutEffect(() => {
    if (openIndex === null) return;
    const container = desktopPanContainerRef.current;
    const inner = desktopZoomRef.current;
    if (!container || !inner) return;
    const applyClamp = () => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const bw = inner.offsetWidth;
      const bh = inner.offsetHeight;
      setLightboxPan((p) =>
        clampLightboxPan(p, zoomRef.current, cw, ch, bw, bh)
      );
    };
    const ro = new ResizeObserver(applyClamp);
    ro.observe(container);
    ro.observe(inner);
    applyClamp();
    return () => ro.disconnect();
  }, [openIndex, lightboxZoom]);

  useEffect(() => {
    if (openIndex === null) return;
    const el = desktopZoomRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < DESKTOP_ZOOM_MIN_PX) return;
      e.preventDefault();
      e.stopPropagation();
      const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
      setLightboxZoom((z) => {
        const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z * factor));
        if (next <= ZOOM_MIN) setLightboxPan({ x: 0, y: 0 });
        return next;
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [openIndex]);

  const bumpDesktopZoomFromClick = useCallback(() => {
    setLightboxZoom((z) => {
      if (z >= ZOOM_MAX - 0.02) {
        setLightboxPan({ x: 0, y: 0 });
        return ZOOM_MIN;
      }
      const next = Math.min(ZOOM_MAX, z * ZOOM_STEP);
      if (next <= ZOOM_MIN) setLightboxPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const onDesktopImageClick = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (window.innerWidth < DESKTOP_ZOOM_MIN_PX) return;
      if (ignoreClickZoomRef.current) {
        ignoreClickZoomRef.current = false;
        return;
      }
      if (e.detail !== 1) {
        if (clickZoomDelayRef.current) {
          clearTimeout(clickZoomDelayRef.current);
          clickZoomDelayRef.current = null;
        }
        return;
      }
      if (clickZoomDelayRef.current) clearTimeout(clickZoomDelayRef.current);
      clickZoomDelayRef.current = setTimeout(() => {
        clickZoomDelayRef.current = null;
        bumpDesktopZoomFromClick();
      }, 280);
    },
    [bumpDesktopZoomFromClick]
  );

  const onDesktopPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 || window.innerWidth < DESKTOP_ZOOM_MIN_PX) return;
      ignoreClickZoomRef.current = false;
      const capture = lightboxZoom > ZOOM_MIN;
      pointerSessionRef.current = {
        down: true,
        capture,
        lastX: e.clientX,
        lastY: e.clientY,
        totalDrag: 0,
      };
      if (capture) e.currentTarget.setPointerCapture(e.pointerId);
    },
    [lightboxZoom]
  );

  const onDesktopPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const s = pointerSessionRef.current;
      if (!s.down) return;
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      s.totalDrag += Math.hypot(dx, dy);
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      if (s.totalDrag > 14) ignoreClickZoomRef.current = true;
      if (lightboxZoom > ZOOM_MIN) {
        const container = desktopPanContainerRef.current;
        const inner = desktopZoomRef.current;
        const cw = container?.clientWidth ?? 0;
        const ch = container?.clientHeight ?? 0;
        const bw = inner?.offsetWidth ?? 0;
        const bh = inner?.offsetHeight ?? 0;
        setLightboxPan((p) => {
          const next = { x: p.x + dx, y: p.y + dy };
          return clampLightboxPan(next, zoomRef.current, cw, ch, bw, bh);
        });
      }
    },
    [lightboxZoom]
  );

  const onDesktopPointerUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const s = pointerSessionRef.current;
    if (!s.down) return;
    s.down = false;
    if (s.capture) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const resetDesktopZoom = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (window.innerWidth < DESKTOP_ZOOM_MIN_PX) return;
    if (clickZoomDelayRef.current) {
      clearTimeout(clickZoomDelayRef.current);
      clickZoomDelayRef.current = null;
    }
    ignoreClickZoomRef.current = true;
    setLightboxZoom(1);
    setLightboxPan({ x: 0, y: 0 });
  }, []);

  const thumbButtonClass = interactive
    ? "block w-full cursor-zoom-in overflow-hidden rounded-xl ring-0 transition-shadow hover:ring-2 hover:ring-sage/50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 border-0 bg-transparent p-0 text-left max-sm:h-auto sm:h-full sm:min-h-0"
    : "block w-full overflow-hidden rounded-xl border-0 bg-transparent p-0 text-left max-sm:h-auto sm:h-full sm:min-h-0";

  /** Naturlig höjd + hel bild på mobil; beskuren ruta från sm och uppåt */
  const thumbIntrinsicW = 1400;
  const thumbIntrinsicH = 1000;

  const singleThumbClass = interactive
    ? "max-sm:relative max-sm:inset-auto max-sm:block max-sm:min-h-[200px] max-sm:w-full cursor-zoom-in border-0 bg-transparent p-0 transition-opacity hover:opacity-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 sm:absolute sm:inset-0"
    : "max-sm:relative max-sm:inset-auto max-sm:block max-sm:min-h-[200px] max-sm:w-full border-0 bg-transparent p-0 sm:absolute sm:inset-0";

  return (
    <>
      {variant === "single" ? (
        interactive ? (
          <button
            type="button"
            onClick={() => setOpenIndex(0)}
            className={singleThumbClass}
            aria-label={`${alts[0] ?? contextLabel} — visa i helskärm`}
          >
            <Image
              src={images[0]}
              alt={alts[0] ?? contextLabel}
              width={thumbIntrinsicW}
              height={thumbIntrinsicH}
              className={`bg-sand/40 object-contain sm:hidden h-auto w-full ${thumbObjectPos}`}
              sizes="100vw"
            />
            <Image
              src={images[0]}
              alt={alts[0] ?? contextLabel}
              fill
              className={`hidden object-cover sm:block ${thumbObjectPos}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </button>
        ) : (
          <div className={singleThumbClass}>
            <Image
              src={images[0]}
              alt={alts[0] ?? contextLabel}
              width={thumbIntrinsicW}
              height={thumbIntrinsicH}
              className={`bg-sand/40 object-contain sm:hidden h-auto w-full ${thumbObjectPos}`}
              sizes="100vw"
            />
            <Image
              src={images[0]}
              alt={alts[0] ?? contextLabel}
              fill
              className={`hidden object-cover sm:block ${thumbObjectPos}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        )
      ) : (
        <div className="grid h-full w-full max-sm:h-auto grid-cols-1 gap-2 sm:grid-cols-2">
          {images.map((src, i) =>
            interactive ? (
              <button
                key={src}
                type="button"
                onClick={() => setOpenIndex(i)}
                className={`relative min-w-0 ${thumbButtonClass}`}
                aria-label={`${alts[i] ?? contextLabel} — visa i helskärm`}
              >
                <Image
                  src={src}
                  alt={alts[i] ?? contextLabel}
                  width={thumbIntrinsicW}
                  height={thumbIntrinsicH}
                  className="bg-sand/40 object-contain sm:hidden h-auto w-full"
                  sizes="100vw"
                />
                <Image
                  src={src}
                  alt={alts[i] ?? contextLabel}
                  fill
                  className="hidden object-cover object-center sm:block"
                  sizes="(max-width: 639px) 100vw, 50vw"
                />
              </button>
            ) : (
              <div key={src} className={`relative min-w-0 ${thumbButtonClass}`}>
                <Image
                  src={src}
                  alt={alts[i] ?? contextLabel}
                  width={thumbIntrinsicW}
                  height={thumbIntrinsicH}
                  className="bg-sand/40 object-contain sm:hidden h-auto w-full"
                  sizes="100vw"
                />
                <Image
                  src={src}
                  alt={alts[i] ?? contextLabel}
                  fill
                  className="hidden object-cover object-center sm:block"
                  sizes="(max-width: 639px) 100vw, 50vw"
                />
              </div>
            )
          )}
        </div>
      )}

      {interactive && openIndex !== null && (
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
                {contextLabel}
                {images.length > 1
                  ? ` — ${openIndex + 1} / ${images.length}`
                  : ""}
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

            <div
              className="relative min-h-0 w-full flex-1 cursor-default pointer-events-auto"
              onClick={close}
            >
              {/* Mobil: scroll + hel bild */}
              <div className="max-sm:absolute max-sm:inset-0 max-sm:overflow-y-auto max-sm:overflow-x-hidden max-sm:overscroll-y-contain max-sm:px-2 max-sm:pb-3 max-sm:pt-1 sm:hidden">
                <div
                  className="pointer-events-auto mx-auto w-full max-w-full touch-pan-y"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={onLightboxTouchStart}
                  onTouchEnd={onLightboxTouchEnd}
                  onTouchCancel={onLightboxTouchCancel}
                >
                  <Image
                    src={images[openIndex]}
                    alt={alts[openIndex] ?? contextLabel}
                    width={2400}
                    height={3200}
                    className="mx-auto h-auto w-full max-w-full object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>

              {/* Desktop: mushjul zoom + dra när zoomat — yttre yta klickas igenom till onClick={close} */}
              <div
                ref={desktopPanContainerRef}
                className="relative hidden max-h-[calc(100dvh-6rem)] w-full min-h-0 flex-1 overflow-hidden pointer-events-none sm:flex sm:items-center sm:justify-center sm:px-3 sm:pb-2 md:px-0"
              >
                <div
                  ref={desktopZoomRef}
                  className={`pointer-events-auto select-none ${
                    lightboxZoom > ZOOM_MIN
                      ? "cursor-grab active:cursor-grabbing"
                      : "cursor-zoom-in"
                  }`}
                  style={{
                    transform: `translate(${lightboxPan.x}px, ${lightboxPan.y}px) scale(${lightboxZoom})`,
                    transformOrigin: "center center",
                  }}
                  onClick={onDesktopImageClick}
                  onPointerDown={onDesktopPointerDown}
                  onPointerMove={onDesktopPointerMove}
                  onPointerUp={onDesktopPointerUp}
                  onPointerCancel={onDesktopPointerUp}
                  onDoubleClick={resetDesktopZoom}
                  onTouchStart={onLightboxTouchStart}
                  onTouchEnd={onLightboxTouchEnd}
                  onTouchCancel={onLightboxTouchCancel}
                >
                  <Image
                    src={images[openIndex]}
                    alt={alts[openIndex] ?? contextLabel}
                    width={2400}
                    height={3200}
                    className="mx-auto h-auto max-h-[calc(100dvh-6rem)] w-auto max-w-full object-contain"
                    sizes="100vw"
                    priority
                    draggable={false}
                  />
                </div>
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="pointer-events-auto fixed left-1 top-1/2 z-[210] -translate-y-1/2 rounded-full p-2 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] sm:absolute sm:left-1 sm:top-1/2 md:left-3 md:p-3"
                    aria-label="Föregående bild"
                  >
                    <ChevronLeft
                      size={32}
                      strokeWidth={1.5}
                      className="text-white md:h-9 md:w-9"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className="pointer-events-auto fixed right-1 top-1/2 z-[210] -translate-y-1/2 rounded-full p-2 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] sm:absolute sm:right-1 sm:top-1/2 md:right-3 md:p-3"
                    aria-label="Nästa bild"
                  >
                    <ChevronRight
                      size={32}
                      strokeWidth={1.5}
                      className="text-white md:h-9 md:w-9"
                    />
                  </button>
                </>
              )}
            </div>

            <p className="pointer-events-none shrink-0 px-4 pb-4 text-center font-sans text-xs text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] max-sm:max-w-[min(100%,20rem)] max-sm:mx-auto">
              {images.length > 1 ? (
                <>
                  <span className="sm:hidden">
                    Scrolla för att se hela bilden · svep sidledes eller pilar byter bild · Esc stänger
                  </span>
                  <span className="hidden sm:inline">
                    Klick eller scrollhjul zoomar · dra för att flytta när du zoomat · dubbelklick återställer ·
                    pilar eller svep byter bild · Esc stänger
                  </span>
                </>
              ) : (
                <>
                  <span className="sm:hidden">Scrolla vid behov · Esc eller klick utanför stänger</span>
                  <span className="hidden sm:inline">
                    Klick eller scrollhjul zoomar · dra när zoomat · dubbelklick återställer · Esc eller klick
                    utanför stänger
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
