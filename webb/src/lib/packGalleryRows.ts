/** Landskap = halv rad (6/12); porträtt 3 eller 4 (4 när tre P fyller en rad); 6 enbart för landskap. */

export type GalleryOri = "L" | "P";

export type PackedGalleryItem = { index: number; span: 3 | 4 | 6 | 12 };

/**
 * Packar bildindex i rader om 12 kolumner så att:
 * - två landskap: 6+6
 * - två porträtt + ett landskap: 3+3+6 (även när första P redan lagt used=3)
 * - landskap + två porträtt: 6+3+3 (smala bredvid varann)
 * - efter ett landskap (used=6): två porträtt som 3+3 i samma rad
 * - tre porträtt i rad (ej följt av fjärde P): 4+4+4 — större än 3+3+3 på desktop
 * - fyra porträtt: 3+3+3+3
 * - övriga porträtt: 3
 */
export function packGalleryRows(oris: GalleryOri[]): PackedGalleryItem[][] {
  const n = oris.length;
  const rows: PackedGalleryItem[][] = [];
  let i = 0;

  while (i < n) {
    const row: PackedGalleryItem[] = [];
    let used = 0;

    while (i < n) {
      // P + P + L (3+3+6) — även när raden redan börjat med en P (used=3)
      if (
        i + 2 < n &&
        oris[i] === "P" &&
        oris[i + 1] === "P" &&
        oris[i + 2] === "L" &&
        (used === 0 || used === 3) &&
        used + 9 <= 12
      ) {
        row.push(
          { index: i, span: 3 },
          { index: i + 1, span: 3 },
          { index: i + 2, span: 6 }
        );
        i += 3;
        used = 12;
        break;
      }

      // L + P + P (6+3+3) — smala bredvid varann efter bred bild
      if (
        used === 0 &&
        i + 2 < n &&
        oris[i] === "L" &&
        oris[i + 1] === "P" &&
        oris[i + 2] === "P"
      ) {
        row.push(
          { index: i, span: 6 },
          { index: i + 1, span: 3 },
          { index: i + 2, span: 3 }
        );
        i += 3;
        used = 12;
        break;
      }

      // Tre P direkt efter varann utan fjärde P på samma “streak” — bredare miniatyrer än 3+3+3
      if (
        used === 0 &&
        i + 2 < n &&
        oris[i] === "P" &&
        oris[i + 1] === "P" &&
        oris[i + 2] === "P" &&
        (i + 3 >= n || oris[i + 3] !== "P")
      ) {
        row.push(
          { index: i, span: 4 },
          { index: i + 1, span: 4 },
          { index: i + 2, span: 4 }
        );
        i += 3;
        used = 12;
        break;
      }

      // Halv rad redan landskap (6) — fyll med två porträtt 3+3
      if (
        used === 6 &&
        i + 1 < n &&
        oris[i] === "P" &&
        oris[i + 1] === "P"
      ) {
        row.push({ index: i, span: 3 }, { index: i + 1, span: 3 });
        i += 2;
        used = 12;
        break;
      }

      if (oris[i] === "L") {
        if (used + 6 > 12) break;
        row.push({ index: i, span: 6 });
        used += 6;
        i++;
        continue;
      }

      if (used + 3 > 12) break;
      row.push({ index: i, span: 3 });
      used += 3;
      i++;
    }

    rows.push(row);
  }

  return rows;
}
