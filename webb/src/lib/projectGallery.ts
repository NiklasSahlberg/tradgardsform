import { galleryFilesForFolder } from "./galleryManifest";

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
  /** Alla miniatyrer i samma 4:3-ruta (ingen blandning av smala/breda kolumner) */
  galleryUniformCells?: boolean;
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
          "1.JPG",
          "Foto 2024-08-21 13 19 59.jpg"
          
        ],
      },
      {
        title: "Innan",
        files: ["2.JPG", "4.JPG", "6.JPG"],
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
    gallerySections: [
      {
        title: "Nu",
        files: [
          "6 - kopia.JPG",
          "8 (2).JPG",
          "8 (3).JPG",
          "IMG_1549.JPG",
          "IMG_1556.JPG",
          "IMG_1574.JPG",
          "IMG_1582.JPG",
        ],
      },
    ],
  },
  {
    folder: "Enebyberg",
    title: "Enebyberg",
    section: "villa",
    description:
      "Uppdraget handlade om att skapa en enhetlig trädgård kring ett hus från sjuttiotalet. Nya gångar i natursten, uppdaterade planteringar och en tydlig entré gjorde stor skillnad utan att tumma på den gröna karaktären.",
    previewFile: "enebyberg-preview.png",
    galleryUniformCells: true,
    gallerySections: [
      {
        title: "Nu",
        files: [
          "Foto 2024-08-21 13 57 35.jpg",
          "Foto 2024-08-21 13 57 41 - kopia.jpg",
          "Foto 2024-08-21 13 58 57.jpg",
          "Foto 2024-08-21 13 59 45.jpg",
        ],
      },
      {
        title: "Innan",
        files: ["Bild före.JPG"],
      },
    ],
  },
  {
    folder: "Silverdal",
    title: "Silverdal",
    section: "villa",
    description:
      "Här var uppdraget att ersätta gräsmattan med sittplats och växtlighet där händelserna avlöser varandra över hela året.",
    previewFile: "silverdal-preview.png",
    gallerySections: [
      {
        title: "Nu",
        files: [
          "Förhandsritning  kopia.jpg",
          "IMG_3547.JPG",
          "IMG_3559.JPG",
          "IMG_8494.JPG",
          "IMG_8496.JPG",
          "Bild före.JPG",
        ],
      },
    ],
  },
  {
    folder: "Costa Tropical",
    title: "Costa Tropical",
    section: "villa",
    description:
      "Trädgård till nybyggt hus vid Medelhavets strand. Stora gröna växter skapar fin balans mot uteplatsernas, hårda material. Även belysningsplan ingick i uppdraget",
    previewFile: "costa-tropical-preview.png",
    gallerySections: [
      {
        title: "Nu",
        files: [
          "406F78A1-7C4C-4932-BB3D-230A3B5BF47E.JPEG",
          "5C27B76D-790E-4EF1-9D28-843AC1CD2C40.JPEG",
          "6CE3A529-EAA1-48A8-8708-433671FFDEED.JPEG",
          "D6B0B2EA-9C32-4D6C-9CF9-06194E5734D9.JPEG",
          /* IMG_9615 före DSC04864 så rad 2 blir tre bilder (P+L+P) i stället för 2+1 ensam sist */
          "IMG_9615.jpg",
          "DSC04864.jpg",
          "E83C02DA-2B1F-4AFD-A6B3-66DDC3FA4E40.JPEG",
          "E9CE00C3-C21F-455F-8AC8-BF45AF4BF86B.jpg",
          "F1CCF7DC-1192-416E-B9CB-B6D4B40663F4.jpg",
          "IMG_1077.jpg",
          "IMG_1078.JPG",
          "IMG_2546.jpg",
          "IMG_5252.jpg",
          "IMG_6628.jpg",
        ],
      },
    ],
  },
  {
    folder: "Djurhamn Värmdö",
    title: "Djurhamn Värmdö",
    section: "villa",
    description:
      "Skärgårdsmiljö med salt vind och mager jord krävde tåliga växter och robusta material. Vi föreslog en mer öppen trädgård mot vattnet med vindskyddande buskage och en altan som följer husets linjer.",
    previewFile: "efter.jpg",
    gallerySections: [
      {
        title: "Nu",
        files: [
          "DSC04052 - Kopia.jpg",
          "DSC04303 - kopia.jpg",
          "efter.jpg",
          "efterbild - kopia.jpg",
          "kvällsbild.jpg",
        ],
      },
      {
        title: "Innan",
        files: ["bild före.JPG"],
      },
    ],
  },
  {
    folder: "Skälby Järfälla",
    title: "Skälby Järfälla",
    section: "villa",
    description:
      "Kunden önskade mindre gräsmatta och mer blomning från tidig vår till sen höst. Rabatterna fick tydliga färgteman och bevattningen förenklades med täckbark och väl valda perenner och buskar.",
    gallerySections: [
      {
        title: "Nu",
        files: [
          "IMG_1291.JPG",
          "IMG_1298.JPG",
          /* Tredje landskap före de två höga — säkrar raden 6+3+3 även om en etableringsbild råkar bli “smal” i data */
          "IMG_1332.JPG",
          "IMG_1326 - kopia.JPG",
          "IMG_1362.JPG",
          "IMG_1295.JPG",
          "IMG_1334.JPG",
          "IMG_1337.JPG",
          "IMG_1348.JPG",
        ],
      },
    ],
  },
  {
    folder: "Brf Fleminggatan",
    title: "Brf Fleminggatan",
    section: "brf",
    description:
      "Föreningen ville fräscha upp innergården utan stora ingrepp i bärande konstruktioner. Nya ytskikt i gångar samt en hel del befintligt material återanvändes, uppdaterade planteringar vid entrén och bättre belysning gjorde miljön tryggare och mer inbjudande.",
    previewFile: "IMG_0137.JPG",
    gallerySections: [
      {
        title: "Nu",
        files: [
          "IMG_0098.JPG",
          "IMG_0105.JPG",
          "IMG_0109.JPG",
          "IMG_0111.JPG",
          "IMG_0116.JPG",
          "IMG_0119.JPG",
          "IMG_0137.JPG",
          "IMG_0144.JPG",
          "IMG_0148.JPG",
          "IMG_0158.JPG",
          "IMG_0165.JPG",
          "IMG_0172.JPG",
          /* 0177 mellan två stående + liggande så raden blir P+L+P (3+6+3); två L sist får egen rad */
          "IMG_0177.JPG",
          "IMG_0173.JPG",
          "IMG_0176.JPG",
        ],
      },
      {
        title: "Innan",
        files: ["Bild före (1).JPG", "Bild före.JPG"],
      },
    ],
  },
  {
    folder: "Brf Helenelund",
    title: "Brf Helenelund",
    section: "brf",
    description:
      "En mycket sliten, gårdsmiljö byttes mot en mer varierad växtlighet med flera flexibla sittplatser och tydliga zoner för passage och förvaring.",
    previewFile: "Foto 2024-08-14 12 45 40.jpg",
    gallerySections: [
      {
        title: "Nu",
        files: [
          "Foto 2024-08-14 12 40 20.jpg",
          "Foto 2024-08-14 12 41 26.jpg",
          "Foto 2024-08-14 12 42 23.jpg",
          "Foto 2024-08-14 12 42 57.jpg",
          "Foto 2024-08-14 12 43 48.jpg",
          "Foto 2024-08-14 12 44 06.jpg",
          "Foto 2024-08-14 12 45 06.jpg",
          "Foto 2024-08-14 12 45 40.jpg",
          "Foto 2024-08-14 12 47 20.jpg",
          "Foto 2024-08-14 12 49 36.jpg",
        ],
      },
      {
        title: "Innan",
        files: ["Bild före 1.JPG", "Bild före 2.JPG"],
      },
    ],
  },
  {
    folder: "Brf Rådmansgatan",
    title: "Brf Rådmansgatan",
    section: "brf",
    description:
    "En helt ny utemiljö skapades på denna innergård från sjuttiotalet. Här blev det flera generösa sittplatser, grönska och en växtlighet där händelserna avlöser varandra över året. Helt nya material i form av granitsten, trä och konstgräsmattor.",
    previewFile: "P1280468.JPG",
    gallerySections: [
      {
        title: "Nu",
        files: [
          "P1280441.JPG",
          "P1280443.JPG",
          "P1280444.JPG",
          "P1280445.JPG",
          "P1280447.JPG",
          "P1280449.JPG",
          "P1280450.JPG",
          "P1280452.JPG",
          "P1280458.JPG",
          "P1280467.JPG",
          "P1280468.JPG",
          "P1280470.JPG",
        ],
      },
      {
        title: "Innan",
        files: ["Bild före 1.JPG", "Bild före 2.JPG"],
      },
    ],
  },
  {
    folder: "Brf St Eriksgatan",
    title: "Brf St Eriksgatan",
    section: "brf",
    description:
      "En total förändring krävdes då takbjälkslag skulle bytas, vackra, blickfång, sittplatser, belysning och funktioner skapades med fin balans för alla boende.",
    previewFile: "IMG_0215.JPG",
    gallerySections: [
      {
        title: "Nu",
        files: [
          "IMG_0185.JPG",
          "IMG_0191.JPG",
          "IMG_0192.JPG",
          "IMG_0212.JPG",
          "IMG_0215.JPG",
          "P1020236.JPG",
        ],
      },
      {
        title: "Innan",
        files: ["Bild före.JPG"],
      },
    ],
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
  const files = galleryFilesForFolder(folderName);
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
  const files = galleryFilesForFolder(folderName);
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
  const known = galleryFilesForFolder(project.folder);
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
