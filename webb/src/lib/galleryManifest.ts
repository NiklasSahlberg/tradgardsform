import galleryManifest from "./gallery-manifest.json";

export const PORTRAIT_ASPECT_THRESHOLD = 1.15;

/** Nära tröskeln: räkna alltid som liggliggande så rutnätet inte får L–P–L och halv tom rad. */
const TREAT_AS_LANDSCAPE: Partial<Record<string, readonly string[]>> = {
  "Skälby Järfälla": ["IMG_1295.JPG"],
};

/** Gallerifiler som ska räknas som porträtt trots manifestmått (t.ex. stående foto tolkat som L). */
const FORCE_PORTRAIT_GALLERY: Partial<Record<string, readonly string[]>> = {
  "Täby": ["6a.jpg", "Foto 2024-08-21 13 19 59.jpg"],
};

type ManifestEntry =
  | string[]
  | {
      files: string[];
      dims?: Record<string, { w: number; h: number }>;
    };

const manifest = galleryManifest as Record<string, ManifestEntry>;

function entry(folder: string): ManifestEntry | undefined {
  return manifest[folder];
}

export function galleryFilesForFolder(folder: string): string[] {
  const e = entry(folder);
  if (!e) return [];
  return Array.isArray(e) ? e : e.files;
}

export function galleryDimsForFolder(
  folder: string
): Record<string, { w: number; h: number }> | undefined {
  const e = entry(folder);
  if (!e || Array.isArray(e)) return undefined;
  return e.dims;
}

/** Publik URL → mapp + filnamn (för manifestnycklar). */
export function galleryFileFromPublicUrl(
  src: string
): { folder: string; file: string } | null {
  try {
    const path = src.startsWith("/") ? src : `/${src}`;
    const segments = path.split("/").filter(Boolean);
    const gi = segments.indexOf("galleri");
    if (gi < 0 || gi + 2 >= segments.length) return null;
    const folder = decodeURIComponent(segments[gi + 1]);
    const file = decodeURIComponent(segments.slice(gi + 2).join("/"));
    return { folder, file };
  } catch {
    return null;
  }
}

export function galleryOrientationFromManifest(
  folder: string,
  file: string
): "P" | "L" | null {
  if (TREAT_AS_LANDSCAPE[folder]?.includes(file)) return "L";
  if (FORCE_PORTRAIT_GALLERY[folder]?.includes(file)) return "P";
  const d = galleryDimsForFolder(folder)?.[file];
  if (!d || d.w <= 0 || d.h <= 0) return null;
  return d.h / d.w >= PORTRAIT_ASPECT_THRESHOLD ? "P" : "L";
}

export function galleryDimsForPublicUrl(
  folder: string,
  src: string
): { w: number; h: number } | null {
  const loc = galleryFileFromPublicUrl(src);
  if (!loc || loc.folder !== folder) return null;
  const d = galleryDimsForFolder(folder)?.[loc.file];
  if (!d || d.w <= 0 || d.h <= 0) return null;
  return d;
}

/** Filer direkt under `/bilder/` (utan galleri-manifest) som ska räknas som porträtt — t.ex. smala «innan»-bilder som annars faller tillbaka till L och bryter raden fel. */
const TREAT_AS_PORTRAIT_PUBLIC_FILES = new Set([
  "IMG_2182.jpeg",
  "IMG_9876.jpeg",
  "taby_nu1.jpg",
  "taby_nu2.jpg",
]);

/**
 * Vertikal bild under `/bilder/` utan mått i manifest: fallback 3/4 blir kortare än närliggande landskap (4/3).
 * Här kan vi sätta ett högre förhållande (smal/stående bild).
 */
const PUBLIC_FLAT_BILDER_ASPECT: Record<string, string> = {
  /** Samma radhöjd som span-6 landskap med `aspect-[4/3]`: vid span 3 är w = hälften av L-rutan → w/h = 2/3. */
  "taby_nu1.jpg": "2 / 3",
  "taby_nu2.jpg": "2 / 3",
};

function filenameFromFlatPublicBilderUrl(url: string): string | null {
  try {
    const path = url.startsWith("/") ? url : `/${url}`;
    if (!path.startsWith("/bilder/")) return null;
    const rest = path.slice("/bilder/".length);
    if (!rest || rest.includes("/")) return null;
    return decodeURIComponent(rest);
  } catch {
    return null;
  }
}

/** CSS aspect-ratio (t.ex. `9 / 16`) för lösa filer under `/bilder/` utan mått i manifest. */
export function galleryFlatBilderAspectRatio(src: string): string | null {
  const name = filenameFromFlatPublicBilderUrl(src);
  if (!name) return null;
  return PUBLIC_FLAT_BILDER_ASPECT[name] ?? null;
}

/** Explicit proportion för vissa gallerifiler (samma logik som flat `/bilder/` för radhöjd). */
const GALLERY_EXPLICIT_ASPECT: Partial<
  Record<string, Partial<Record<string, string>>>
> = {
  "Täby": {
    "6a.jpg": "2 / 3",
    "Foto 2024-08-21 13 19 59.jpg": "2 / 3",
  },
};

/** Flat `/bilder/`-filer eller utvalda gallerifiler — över styr manifestproportion för miniatyr-ruta. */
export function galleryExplicitPortraitAspect(
  src: string,
  galleryFolder: string
): string | null {
  const flat = galleryFlatBilderAspectRatio(src);
  if (flat != null) return flat;
  const loc = galleryFileFromPublicUrl(src);
  if (!loc || loc.folder !== galleryFolder) return null;
  return GALLERY_EXPLICIT_ASPECT[loc.folder]?.[loc.file] ?? null;
}

/** Ori per bild-URL; fallback L om okänd. */
export function galleryOrisForUrls(urls: string[], folder: string): ("P" | "L")[] {
  return urls.map((url) => {
    const flatName = filenameFromFlatPublicBilderUrl(url);
    if (flatName && TREAT_AS_PORTRAIT_PUBLIC_FILES.has(flatName)) return "P";
    const loc = galleryFileFromPublicUrl(url);
    if (!loc || loc.folder !== folder) return "L";
    return galleryOrientationFromManifest(loc.folder, loc.file) ?? "L";
  });
}
