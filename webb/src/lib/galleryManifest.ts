import galleryManifest from "./gallery-manifest.json";

export const PORTRAIT_ASPECT_THRESHOLD = 1.15;

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

/** Ori per bild-URL; fallback L om okänd. */
export function galleryOrisForUrls(urls: string[], folder: string): ("P" | "L")[] {
  return urls.map((url) => {
    const loc = galleryFileFromPublicUrl(url);
    if (!loc || loc.folder !== folder) return "L";
    return galleryOrientationFromManifest(loc.folder, loc.file) ?? "L";
  });
}
