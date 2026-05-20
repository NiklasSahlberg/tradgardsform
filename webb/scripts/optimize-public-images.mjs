/**
 * Komprimerar / skalar bilder under public/ (för Hobby + images.unoptimized).
 *
 * Hero och about läses från t.ex. `bilder/*.webp` och skrivs till `bilder/opt/*.webp`,
 * så källfiler aldrig skrivs över (praktiskt vid låsta filer på Windows/OneDrive).
 *
 * Körs manuellt: npm run optimize:images
 *
 * Vid omvandling av *-preview.png → .webp körs npm run generate:gallery
 * så gallery-manifest.json får korrekta dimensioner.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..");
const pubRoot = path.join(repoRoot, "public");

/** @param {string} posixRel relativ sökväg med /. */
function absFromPublic(posixRel) {
  const parts = posixRel.split("/");
  return path.join(pubRoot, ...parts);
}

function posixRelFromAbs(absPath) {
  return path.relative(pubRoot, absPath).split(path.sep).join("/");
}

/**
 * Kodar en pipeline som redan avslutas med `.webp(...)` till buffer och skriver till disk.
 */
async function writeSharpWebpPipelineToPath(pipeline, absPath, labelRel) {
  const buf = await pipeline.toBuffer();
  fs.writeFileSync(absPath, buf);
  const kb = fs.statSync(absPath).size / 1024;
  console.log(`[ok] ${labelRel} (${kb.toFixed(1)} KiB)`);
}

/**
 * Läs raster från public, optimera och skriv som NY fil under public (skapar målmapp vid behov).
 * @param {string} sourceRel
 * @param {string} destRel
 */
async function writeOptimizedWebpCopy(sourceRel, destRel, { maxWidth, quality }) {
  const inp = absFromPublic(sourceRel);
  const outp = absFromPublic(destRel);
  if (!fs.existsSync(inp)) {
    console.warn(`[skip] Källa saknas: ${sourceRel}`);
    return false;
  }
  fs.mkdirSync(path.dirname(outp), { recursive: true });

  const meta = await sharp(inp).metadata();
  const w = meta.width ?? 0;

  const baseRotate = sharp(inp).rotate();
  /** @type {import("sharp").Sharp} */
  let chain =
    maxWidth != null && w > maxWidth
      ? sharp(inp).rotate().resize({
          width: maxWidth,
          withoutEnlargement: true,
        })
      : baseRotate;

  await writeSharpWebpPipelineToPath(
    chain.webp({ quality, effort: 6 }),
    outp,
    `${sourceRel} → ${destRel}`,
  );
  return true;
}

/**
 * PNG/JPEG → WebP, valfritt maxbredd, ta bort källfilen efter lyckad skrivning.
 * @param {string} posixRel
 * @param {{ maxWidth: number|null, quality: number }} opts
 */
async function convertRasterToWebpDeleteSource(posixRel, { maxWidth, quality }) {
  const inp = absFromPublic(posixRel);
  if (!fs.existsSync(inp)) {
    console.warn(`[skip] Saknas: ${posixRel}`);
    return false;
  }
  const dir = path.dirname(inp);
  const ext = path.extname(inp).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) {
    console.warn(`[skip] Förväntade raster (png/jpeg): ${posixRel}`);
    return false;
  }
  const outp = path.join(dir, `${path.basename(inp, ext)}.webp`);

  const meta = await sharp(inp).metadata();
  const w = meta.width ?? 0;

  const chainRaw =
    maxWidth != null && w > maxWidth
      ? sharp(inp).rotate().resize({
          width: maxWidth,
          withoutEnlargement: true,
        })
      : sharp(inp).rotate();

  const alphaQ = Math.min(100, quality + 12);
  await writeSharpWebpPipelineToPath(
    chainRaw.webp({
      quality,
      alphaQuality: alphaQ,
      effort: 6,
    }),
    outp,
    `${posixRel} → ${posixRelFromAbs(outp)}`,
  );

  fs.unlinkSync(inp);
  console.log(`     (källfil borttagen: ${path.basename(inp)})`);
  return true;
}

async function safeConvert(label, promise) {
  try {
    return await promise;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn(`[varning] ${label}: ${msg}`);
    return false;
  }
}

async function main() {
  console.log("Optimera bilder under public/\n");

  await writeOptimizedWebpCopy("bilder/ny-hero.webp", "bilder/opt/ny-hero.webp", {
    maxWidth: 1600,
    quality: 72,
  });
  await writeOptimizedWebpCopy(
    "bilder/about-susanne.webp",
    "bilder/opt/about-susanne.webp",
    {
      maxWidth: 1000,
      quality: 70,
    },
  );

  const previewJobs = [
    "bilder/galleri/Vallentuna/vallentuna-preview.png",
    "bilder/galleri/Enebyberg/enebyberg-preview.png",
    "bilder/galleri/Silverdal/silverdal-preview.png",
    "bilder/galleri/Costa Tropical/costa-tropical-preview.png",
  ];

  const previewResults = await Promise.all(
    previewJobs.map((rel) =>
      convertRasterToWebpDeleteSource(rel, { maxWidth: 768, quality: 80 }),
    ),
  );

  await safeConvert(
    "logo_web-removebg-preview.png",
    convertRasterToWebpDeleteSource("bilder/galleri/logo_web-removebg-preview.png", {
      maxWidth: 440,
      quality: 85,
    }),
  );

  await safeConvert(
    "logo_web.png",
    convertRasterToWebpDeleteSource("bilder/galleri/logo_web.png", {
      maxWidth: 440,
      quality: 85,
    }),
  );

  if (previewResults.some(Boolean)) {
    console.log("\nUppdaterar gallery-manifest...");
    execSync("npm run generate:gallery", {
      cwd: repoRoot,
      stdio: "inherit",
      env: process.env,
    });
  }

  console.log("\nKlart.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
