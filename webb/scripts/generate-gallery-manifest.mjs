/**
 * Skannar public/bilder/galleri och skriver src/lib/gallery-manifest.json.
 * Dimensioner med Sharp + EXIF-orientering så layout (P/L) stämmer med hur next/image visar.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const galleryRoot = path.join(root, "public", "bilder", "galleri");
const outFile = path.join(root, "src", "lib", "gallery-manifest.json");

/**
 * @param {Buffer} buf
 * @returns {{ w: number; h: number } | null}
 */
function readDimensions(buf) {
  if (buf.length < 24) return null;

  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let o = 2;
    while (o < buf.length - 8) {
      if (buf[o] !== 0xff) return null;
      const marker = buf[o + 1];
      const len = buf.readUInt16BE(o + 2);
      if (marker >= 0xc0 && marker <= 0xc3) {
        const h = buf.readUInt16BE(o + 5);
        const w = buf.readUInt16BE(o + 7);
        if (w > 0 && h > 0) return { w, h };
        return null;
      }
      if (marker === 0xda || len < 2) break;
      o += 2 + len;
    }
    return null;
  }

  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    if (w > 0 && h > 0) return { w, h };
    return null;
  }

  const riff = buf.toString("ascii", 0, 4);
  const webp = buf.toString("ascii", 8, 12);
  if (riff === "RIFF" && webp === "WEBP" && buf.length >= 30) {
    const tag = buf.toString("ascii", 12, 16);
    if (tag === "VP8 " && buf.length >= 30) {
      const w = buf.readUInt16LE(26) & 0x3fff;
      const h = buf.readUInt16LE(28) & 0x3fff;
      if (w > 0 && h > 0) return { w, h };
    }
  }

  return null;
}

/**
 * @param {string} filePath
 * @returns {{ w: number; h: number } | null}
 */
function dimsFromBufferFallback(filePath) {
  try {
    const fd = fs.openSync(filePath, "r");
    const buf = Buffer.alloc(Math.min(65536, fs.statSync(filePath).size));
    fs.readSync(fd, buf, 0, buf.length, 0);
    fs.closeSync(fd);
    return readDimensions(buf);
  } catch {
    return null;
  }
}

/**
 * Visningsstorlek: byt plats på w/h när EXIF säger 90°/270° (värden 5–8).
 * @param {string} filePath
 * @returns {Promise<{ w: number; h: number } | null>}
 */
async function dimsForFile(filePath) {
  try {
    const m = await sharp(filePath, { failOn: "none" }).metadata();
    if (m.width && m.height) {
      let w = m.width;
      let h = m.height;
      const o = m.orientation ?? 1;
      if (o >= 5 && o <= 8) [w, h] = [h, w];
      return { w, h };
    }
  } catch {
    /* sharp misslyckades */
  }
  return dimsFromBufferFallback(filePath);
}

async function main() {
  if (!fs.existsSync(galleryRoot)) {
    console.warn("generate-gallery-manifest: saknar", galleryRoot, "— skriver tom manifest.");
    fs.writeFileSync(outFile, "{}\n", "utf8");
    process.exit(0);
  }

  /** @type {Record<string, { files: string[]; dims: Record<string, { w: number; h: number }> }>} */
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

    /** @type {Record<string, { w: number; h: number }>} */
    const dims = {};
    await Promise.all(
      files.map(async (f) => {
        const d = await dimsForFile(path.join(dir, f));
        if (d) dims[f] = d;
      })
    );
    result[name] = { files, dims };
  }

  fs.writeFileSync(outFile, JSON.stringify(result, null, 2) + "\n", "utf8");
  console.log("generate-gallery-manifest: wrote", outFile, `(${Object.keys(result).length} folders)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
