/** Landskap = halv rad (6/12), porträtt smalt = fjärdedel (3/12), två porträtt sista i listan = två halvor (6+6). */

export type GalleryOri = "L" | "P";

export type PackedGalleryItem = { index: number; span: 3 | 6 };

/**
 * Packar bildindex i rader om 12 kolumner så att:
 * - två landskap: 6+6
 * - två porträtt + ett landskap: 3+3+6 (samma totalbredd som två landskap)
 * - fyra porträtt: 3+3+3+3
 * - exakt två porträtt sist: 6+6 (samma höjd som landskap, halva raden vardera)
 * - övriga porträtt: 3 (smal kolumn, radhöjd sätts av landskap/granne)
 */
export function packGalleryRows(oris: GalleryOri[]): PackedGalleryItem[][] {
  const n = oris.length;
  const rows: PackedGalleryItem[][] = [];
  let i = 0;

  while (i < n) {
    const row: PackedGalleryItem[] = [];
    let used = 0;

    while (i < n) {
      if (
        i + 2 < n &&
        oris[i] === "P" &&
        oris[i + 1] === "P" &&
        oris[i + 2] === "L"
      ) {
        if (used !== 0) break;
        row.push(
          { index: i, span: 3 },
          { index: i + 1, span: 3 },
          { index: i + 2, span: 6 }
        );
        i += 3;
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

      if (i + 1 === n - 1 && oris[i] === "P" && oris[i + 1] === "P") {
        if (used !== 0) break;
        row.push({ index: i, span: 6 }, { index: i + 1, span: 6 });
        i += 2;
        used = 12;
        break;
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
