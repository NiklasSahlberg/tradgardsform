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

/** Dela galleri i rubriker (t.ex. Nu / Innan). Filnamn som i gallerimappen. */
export type ProjectGallerySectionFiles = {
  title: string;
  files: string[];
};

export type ProjectLocationConfig = {
  folder: string;
  title: string;
  description: string;
  section: ProjectSectionId;
  /** Om satt: använd denna fil som förhandsbild i stället för första i mappen */
  previewFile?: string;
  /** Valfritt: sektioner med egna rubriker (bilder listas i ordning per sektion) */
  gallerySections?: ProjectGallerySectionFiles[];
};

/** `description` visas på startsidan (projektsektion) och på respektive projektsida. */
export const PROJECT_LOCATIONS: ProjectLocationConfig[] = [
  {
    folder: "Täby",
    title: "Täby",
    section: "villa",
    description:
      "En generös villaträdgård fick tydligare rum och bättre flöde mellan uteplats, gräsmatta och köksträdgård. Vi arbetade med höjdskillnader i rabatterna och valde växter som ger struktur året om.",
    previewFile: "2a.jpg",
    gallerySections: [
      {
        title: "Nu",
        files: [
          "1a.jpg",
          "2a.jpg",
          "4b.jpg",
          "6a.jpg",
          "Foto 2024-08-21 13 19 59.jpg",
        ],
      },
      {
        title: "Innan",
        files: ["1.JPG", "2.JPG", "4.JPG", "6.JPG"],
      },
    ],
  },
  {
    folder: "Vallentuna",
    title: "Vallentuna",
    section: "villa",
    description:
      "Tomten kändes öppen mot grannar men saknade insynskydd och en naturlig plats att sitta. Efter omplanering fick familjen en mer ombonad känsla med häckar, perenner och en avskild sittgrupp i kvällssol.",
    previewFile: "vallentuna-preview.png",
  },
  {
    folder: "Enebyberg",
    title: "Enebyberg",
    section: "villa",
    description:
      "Uppdraget handlade om att skapa en enhetlig trädgård kring ett hus från sjuttiotalet. Nya gångar i natursten, uppdaterade planteringar och en tydlig entré gjorde stor skillnad utan att tumma på den gröna karaktären.",
    previewFile: "enebyberg-preview.png",
  },
  {
    folder: "Silverdal",
    title: "Silverdal",
    section: "villa",
    description:
      "Här var uppdraget att ersätta gräsmattan med sittplats och växtlighet där händelserna avlöser varandra över hela året.",
    previewFile: "silverdal-preview.png",
  },
  {
    folder: "Costa Tropical",
    title: "Costa Tropical",
    section: "villa",
    description:
      "Trädgård till nybyggt hus vid Medelhavets strand. Stora gröna växter skapar fin balans mot uteplatsernas, hårda material. Även belysningsplan ingick i uppdraget",
    previewFile: "costa-tropical-preview.png",
  },
  {
    folder: "Djurhamn Värmdö",
    title: "Djurhamn Värmdö",
    section: "villa",
    description:
      "Skärgårdsmiljö med salt vind och mager jord krävde tåliga växter och robusta material. Vi föreslog en mer öppen trädgård mot vattnet med vindskyddande buskage och en altan som följer husets linjer.",
    previewFile: "efter.jpg",
  },
  {
    folder: "Skälby Järfälla",
    title: "Skälby Järfälla",
    section: "villa",
    description:
      "Kunden önskade mindre gräsmatta och mer blomning från tidig vår till sen höst. Rabatterna fick tydliga färgteman och bevattningen förenklades med täckbark och väl valda perenner och buskar.",
  },
  {
    folder: "Brf Fleminggatan",
    title: "Brf Fleminggatan",
    section: "brf",
    description:
      "Föreningen ville fräscha upp innergården utan stora ingrepp i bärande konstruktioner. Nya ytskikt i gångar, uppdaterade planteringar vid entrén och bättre belysning gjorde miljön tryggare och mer inbjudande.",
    previewFile: "IMG_0137.JPG",
  },
  {
    folder: "Brf Helenelund",
    title: "Brf Helenelund",
    section: "brf",
    description:
      "En mycket sliten, gårdsmiljö byttes mot en mer varierad växtlighet med flera flexibla sittplatser och tydliga zoner för passage och förvaring.",
    previewFile: "Foto 2024-08-14 12 45 40.jpg",
  },
  {
    folder: "Brf Rådmansgatan",
    title: "Brf Rådmansgatan",
    section: "brf",
    description:
      "I en tät innerstadsmiljö handlade det om att maximera grönt på begränsad yta. Vertikala växtytor, kärl vid entré och krukarrabatter längs fasaden gav mer liv utan att skapa onödigt underhåll för styrelsen.",
    previewFile: "P1280468.JPG",
  },
  {
    folder: "Brf St Eriksgatan",
    title: "Brf St Eriksgatan",
    section: "brf",
    description:
      "En total förändring krävdes då takbjälkslag skulle bytas, vackra, blickfång, sittplatser, belysning och funktioner skapades med fin balans för alla boende.",
    previewFile: "IMG_0215.JPG",
  },
];

/** Utvalda projekt på startsidan — mappnamn måste finnas i PROJECT_LOCATIONS */
export const HOME_FEATURED_PROJECT_FOLDERS: readonly string[] = [
  "Enebyberg",
  "Costa Tropical",
  "Brf Helenelund",
  "Vallentuna",
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

export type ProjectGallerySectionResolved = {
  title: string;
  images: string[];
};

/**
 * Bygger sektioner med fulla bild-URL:er. Hoppar över filer som saknas i manifestet.
 * Returnerar null om projektet saknar gallerySections.
 */
export function buildGallerySections(
  project: ProjectLocationConfig
): ProjectGallerySectionResolved[] | null {
  if (!project.gallerySections?.length) return null;
  const known = manifest[project.folder] ?? [];
  const resolved = project.gallerySections.map((sec) => ({
    title: sec.title,
    images: sec.files
      .filter((f) => known.includes(f))
      .map(
        (f) =>
          `/bilder/galleri/${encodeURIComponent(project.folder)}/${encodeURIComponent(f)}`
      ),
  }));
  const nonEmpty = resolved.filter((s) => s.images.length > 0);
  return nonEmpty.length > 0 ? nonEmpty : null;
}

export function getProjectBySlug(slug: string) {
  return PROJECT_LOCATIONS.find((p) => locationSlug(p.folder) === slug);
}
