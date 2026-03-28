import galleryManifest from "./gallery-manifest.json";

/** Filnamn per gallerimapp — genereras av scripts/generate-gallery-manifest.mjs (prebuild). */
type GalleryManifest = Record<string, string[]>;

const manifest: GalleryManifest = galleryManifest;

/** Gruppering på projektsidan (översikt) */
export type ProjectSectionId = "villa" | "brf" | "inspiration";

export const PROJECT_SECTION_ORDER: ProjectSectionId[] = [
  "villa",
  "brf",
  "inspiration",
];

export const PROJECT_SECTIONS: Record<
  ProjectSectionId,
  { label: string; lead: string }
> = {
  villa: {
    label: "Villor & tomter",
    lead: "Privata uppdrag — från idé till färdig trädgård.",
  },
  brf: {
    label: "Bostadsrättsföreningar",
    lead: "Gemensamma utemiljöer för föreningar i Stockholm.",
  },
  inspiration: {
    label: "Inspiration",
    lead: "Form och växter från varmare klimat — referensgalleri.",
  },
};

export type ProjectLocationConfig = {
  folder: string;
  title: string;
  description: string;
  section: ProjectSectionId;
  /** Om satt: använd denna fil som förhandsbild i stället för första i mappen */
  previewFile?: string;
};

/** Mappnamn i public/bilder/galleri/ (exakt som på disk) */
export const PROJECT_LOCATIONS: ProjectLocationConfig[] = [
  {
    folder: "Täby",
    title: "Täby",
    section: "villa",
    description:
      "Utvalda bilder från trädgårdsprojekt i Täby — från idé till färdig trädgård.",
    previewFile: "2a.jpg",
  },
  {
    folder: "Vallentuna",
    title: "Vallentuna",
    section: "villa",
    description:
      "Inspiration från uppdrag i Vallentuna och närområdet.",
    previewFile: "vallentuna-preview.png",
  },
  {
    folder: "Enebyberg",
    title: "Enebyberg",
    section: "villa",
    description:
      "Projekt och trädgårdsdesign i Enebyberg.",
    previewFile: "enebyberg-preview.png",
  },
  {
    folder: "Silverdal",
    title: "Silverdal",
    section: "villa",
    description:
      "Bilder från genomförda projekt i Silverdal.",
    previewFile: "silverdal-preview.png",
  },
  {
    folder: "Costa Tropical",
    title: "Costa Tropical",
    section: "villa",
    description:
      "Trädgårdsinspiration från varmare klimat — form, växter och rum.",
    previewFile: "costa-tropical-preview.png",
  },
  {
    folder: "Djurhamn Värmdö",
    title: "Djurhamn Värmdö",
    section: "villa",
    description:
      "Trädgårdsprojekt i Djurhamn, Värmdö — alla bilder från samma uppdrag.",
    previewFile: "efter.jpg",
  },
  {
    folder: "Skälby Järfälla",
    title: "Skälby Järfälla",
    section: "villa",
    description:
      "Trädgårdsprojekt i Skälby, Järfälla — alla bilder från samma uppdrag.",
  },
  {
    folder: "Brf Fleminggatan",
    title: "Brf Fleminggatan",
    section: "brf",
    description:
      "Trädgårdsprojekt för bostadsrättsföreningen på Fleminggatan — alla bilder från samma uppdrag.",
    previewFile: "IMG_0137.JPG",
  },
  {
    folder: "Brf Helenelund",
    title: "Brf Helenelund",
    section: "brf",
    description:
      "Trädgårdsprojekt för bostadsrättsföreningen i Helenelund — alla bilder från samma uppdrag.",
    previewFile: "Foto 2024-08-14 12 42 23.jpg",
  },
  {
    folder: "Brf Rådmansgatan",
    title: "Brf Rådmansgatan",
    section: "brf",
    description:
      "Trädgårdsprojekt för bostadsrättsföreningen på Rådmansgatan — alla bilder från samma uppdrag.",
    previewFile: "P1280468.JPG",
  },
  {
    folder: "Brf St Eriksgatan",
    title: "Brf St Eriksgatan",
    section: "brf",
    description:
      "Trädgårdsprojekt för bostadsrättsföreningen på Sankt Eriksgatan — alla bilder från samma uppdrag.",
    previewFile: "IMG_0215.JPG",
  },
];

export type ProjectLocation = ProjectLocationConfig;

/** HTML-id för ankarlänkar (gemener, bindestreck) */
export function locationSlug(folder: string): string {
  return folder
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Returnerar publika URL:er till alla bilder i en undermapp till galleriet.
 * Om `previewFile` anges och filnamnet innehåller "preview", visas den inte i listan
 * (så samma fil inte ligger både som kort/hero och i rutnätet).
 *
 * Använder gallery-manifest.json (inte fs) så Vercel-serverlessfunktionen inte får
 * alla bildfiler inbakade via file tracing.
 */
export function getImagesForFolder(
  folderName: string,
  previewFile?: string
): string[] {
  const files = manifest[folderName] ?? [];
  return files
    .filter((f) => {
      if (previewFile && f === previewFile && /preview/i.test(f)) {
        return false;
      }
      return true;
    })
    .map(
      (file) =>
        `/bilder/galleri/${encodeURIComponent(folderName)}/${encodeURIComponent(file)}`
    );
}

/**
 * Förhandsbild: `previewFile` om den finns i manifestet, annars första bilden i mappen.
 */
export function getPreviewImageForFolder(
  folderName: string,
  previewFile?: string
): string | null {
  const files = manifest[folderName] ?? [];
  if (previewFile && files.includes(previewFile)) {
    return `/bilder/galleri/${encodeURIComponent(folderName)}/${encodeURIComponent(previewFile)}`;
  }
  const imgs = getImagesForFolder(folderName, previewFile);
  return imgs[0] ?? null;
}

export function getProjectBySlug(slug: string) {
  return PROJECT_LOCATIONS.find((p) => locationSlug(p.folder) === slug);
}
