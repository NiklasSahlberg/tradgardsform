/**
 * Alt-texter för bild-SEO och tillgänglighet — fokus på trädgårdsdesign (Stockholm/Mälardalen).
 * Filnamn ger sällan söksignal; konkret alt ger mer för sök och skärmläsare.
 */

export function projectGalleryImageAlt(
  projectTitle: string,
  photoNumberOneBased: number,
  sectionTitle?: string
): string {
  const sec = sectionTitle?.trim();
  if (sec) {
    return `${projectTitle} — ${sec}: bild ${photoNumberOneBased} från ett trädgårdsdesignprojekt. Trädgårdsform Stockholm.`;
  }
  return `${projectTitle}: bild ${photoNumberOneBased} — trädgårdsdesign utförd av Trädgårdsform Stockholm.`;
}

export function projectGalleryAriaOpenLabel(
  sectionTitle: string | undefined,
  photoNumberOneBased: number
): string {
  const sec = sectionTitle?.trim();
  if (sec) {
    return `Visa trädgårdsdesignbild ${photoNumberOneBased} i helskärm (${sec})`;
  }
  return `Visa trädgårdsdesignbild ${photoNumberOneBased} i helskärm`;
}

export function featuredProjectCardAlt(projectTitle: string): string {
  return `${projectTitle} — genomförd trädgårdsdesign och trädgårdsanläggning i Stockholm · Trädgårdsform`;
}

export function projectPreviewCardAlt(projectTitle: string): string {
  return `${projectTitle} — genomförd trädgårdsdesign på plats i Stockholm. Referensprojekt · Trädgårdsform.`;
}

export function projectListingPageHeroAlt(): string {
  return "Trädgårdsdesign Stockholm och Mälardalen: utvalda referensprojekt och inspirationsbilder — Trädgårdsform.";
}

export function projectDetailHeroAlt(projectTitle: string): string {
  return `Trädgårdsdesign · ${projectTitle}: inspirationsbild från genomfört projekt, Trädgårdsform Stockholm.`;
}
