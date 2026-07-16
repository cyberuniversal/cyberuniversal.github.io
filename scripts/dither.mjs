/**
 * Bake archival photos into 1-bit line-screen duotone, the way the reference
 * site does it: the effect lives in the asset, so the browser applies no filter
 * and pays nothing at runtime.
 *
 *   node scripts/dither.mjs
 *
 * Pipeline per image: resize -> grayscale -> normalise -> gamma/contrast ->
 * horizontal line screen + Bayer 4x4 ordered dither -> duotone -> webp.
 *
 * Output is BLACK + paper, never ink + paper. The page composites these with
 * `mix-blend-mode: screen`, and screen(0, bg) == bg exactly — so black drops out
 * with no seam. Any non-black shadow would lighten the image's rectangle and
 * show its edges against the page.
 */
import sharp from "sharp";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SRC = "assets-src";
const OUT = "public/img";
mkdirSync(OUT, { recursive: true });

const PAPER = [0xe9, 0xe1, 0xcf]; // --paper

// Bayer 4x4 — ordered dither. Deterministic (no noise), which keeps the texture
// regular enough to read as a printed line screen rather than film grain.
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((r) => r.map((v) => (v + 0.5) / 16));

/**
 * @param pitch  rows per line-screen cycle (2 = every other row is a gap)
 * @param lineH  how many rows of each cycle carry ink
 * @param gamma  <1 lifts midtones (more ink), >1 crushes them
 * @param invert almost always true. These sources are dark subjects on light
 *   grounds (an astrolabe on studio white, ink on parchment). Un-inverted, the
 *   *ground* survives the dither and the subject drops out — a glowing slab with
 *   a dark hole in it. Inverted, the subject emerges from black, and a map reads
 *   as lit lines on darkness rather than a photo of paper.
 */
async function bake(key, { width = 1200, gamma = 0.9, pitch = 2, lineH = 1, contrast = 1.25, invert = true, clahe = 50 } = {}) {
  const src = `${SRC}/${key}.jpg`;

  // CLAHE before dithering. Global contrast can't help here: after inversion an
  // astrolabe disc is a large, evenly mid-bright field, so every pixel lands on
  // the same side of the threshold and the dither fills it as a solid blob.
  // Adaptive local equalisation lifts the engraving away from the body it sits
  // on, which is the detail the line screen then has something to render.
  const img = sharp(src)
    .resize({ width, withoutEnlargement: true })
    .grayscale()
    .normalise()
    .clahe({ width: clahe, height: clahe, maxSlope: 3 })
    .sharpen({ sigma: 0.6 });
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;

  const rgb = Buffer.alloc(w * h * 3);

  for (let y = 0; y < h; y++) {
    const isGap = y % pitch >= lineH;
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * channels;
      let lum = data[i] / 255;

      if (invert) lum = 1 - lum;

      // contrast around mid-grey, then gamma
      lum = Math.min(1, Math.max(0, (lum - 0.5) * contrast + 0.5));
      lum = Math.pow(lum, gamma);

      // Gap rows stay black: this is what turns a flat dither into a line screen.
      const on = isGap ? false : lum > BAYER[y % 4][x % 4];

      const o = (y * w + x) * 3;
      if (on) {
        rgb[o] = PAPER[0];
        rgb[o + 1] = PAPER[1];
        rgb[o + 2] = PAPER[2];
      } // else leaves 0,0,0 — pure black, drops out under `screen`
    }
  }

  const outPath = `${OUT}/${key}.webp`;
  await sharp(rgb, { raw: { width: w, height: h, channels: 3 } })
    // lossless: 1-bit art turns to mush under lossy compression, and flat
    // two-colour data compresses well anyway.
    .webp({ lossless: true, effort: 6 })
    .toFile(outPath);

  const kb = Math.round(readFileSync(outPath).length / 1024);
  console.log(`${key.padEnd(12)} ${w}x${h}  ${kb}KB`);
  return { key, w, h, kb };
}

// Per-image tuning: dense sources (maps, manuscripts) need a harder gamma or
// they turn into grey mud; sparse ones need lifting.
// gamma > 1 crushes midtones. After inversion these sources sit bright, so most
// need crushing, not lifting, or the dither floods to a solid field.
const TUNING = {
  astrolabe: { gamma: 1.7, contrast: 1.0, clahe: 40 },
  manuscript: { gamma: 1.5, contrast: 1.1 },
  "map-arabia": { gamma: 1.6, contrast: 1.05 },
  "map-idrisi": { gamma: 1.45, contrast: 1.1 },
  "medical-ms": { gamma: 1.4, contrast: 1.1, clahe: 30 },
  cordoba: { gamma: 1.3, contrast: 1.15 },
  // Daylight photo: inverting drops the blown-out sky to black (good), but also
  // pushes the building itself down. Lift the midtones back or the architecture
  // disappears into murk.
  courtyard: { gamma: 0.85, contrast: 1.2, clahe: 60 },
  geometry: { gamma: 1.15, contrast: 1.25 },
};

const manifest = JSON.parse(readFileSync(`${SRC}/manifest.json`, "utf8"));
const out = [];
for (const entry of manifest) {
  try {
    out.push(await bake(entry.key, TUNING[entry.key]));
  } catch (e) {
    console.log(`ERR ${entry.key}: ${String(e.message).slice(0, 70)}`);
  }
}
writeFileSync(`${OUT}/baked.json`, JSON.stringify(out, null, 2));
console.log(`\nbaked ${out.length} -> ${OUT}`);
