/**
 * Skannar public/bilder/galleri och skriver src/lib/gallery-manifest.json.
 * Körs vid prebuild så Next/Vercel inte bundlar alla bilder in i serverless-funktionen
 * (fs.readdir i app-kod får file tracing att dra in hela mappen, ofta >300 MB).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const galleryRoot = path.join(root, "public", "bilder", "galleri");
const outFile = path.join(root, "src", "lib", "gallery-manifest.json");

if (!fs.existsSync(galleryRoot)) {
  console.warn("generate-gallery-manifest: saknar", galleryRoot, "— skriver tom manifest.");
  fs.writeFileSync(outFile, "{}\n", "utf8");
  process.exit(0);
}

/** @type {Record<string, string[]>} */
const result = {};

for (const entry of fs.readdirSync(galleryRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const name = entry.name;
  const dir = path.join(galleryRoot, name);
  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((f) => /\.(jpe?g|jpeg|png|webp|gif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, "sv"));
  result[name] = files;
}

fs.writeFileSync(outFile, JSON.stringify(result, null, 2) + "\n", "utf8");
console.log("generate-gallery-manifest: wrote", outFile, `(${Object.keys(result).length} folders)`);
