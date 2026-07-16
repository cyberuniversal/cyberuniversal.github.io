/**
 * Download public-domain source images from Wikimedia Commons and record their
 * licence. Verifies the licence via the API rather than trusting the filename.
 * Run once; output is committed. Not part of the build.
 *
 *   node scripts/fetch-assets.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";

const SRC_DIR = "assets-src";
mkdirSync(SRC_DIR, { recursive: true });

// key -> Commons File: title
const WANTED = {
  astrolabe: "File:17th Century Islamic Astrolabe (28624284041).jpg",
  "map-arabia": "File:1771 Bonne Map of Arabia - Geographicus - Arabia-bonne-1771.jpg",
  "map-idrisi": "File:Al-Idrisi's world map.JPG",
  manuscript: "File:Tashelhit manuscript IV in Arabic script page 1.jpg",
  cordoba: "File:Córdoba. Vista interior de la Catedral ó Mezquita LCCN94511958.jpg",
  courtyard: "File:Islam Khodja Madrasa 04.jpg",
  "medical-ms": "File:Cheshm manuscript.jpg",
  geometry: "File:Mekhnes Place El-Hedine Mosaique.jpg",
};

const OK = /^(cc0|public domain|pd-|cc-by-sa|cc-by\b)/i;

const UA = { "User-Agent": "portfolio-asset-fetch/1.0 (contact: site owner)" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Commons rate-limits (429). Retry with backoff rather than saving the error body. */
async function get(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { headers: UA });
    if (r.ok) return r;
    if (r.status === 429 || r.status >= 500) {
      await sleep(1500 * (i + 1));
      continue;
    }
    throw new Error(`${r.status} ${r.statusText}`);
  }
  throw new Error("gave up after retries");
}

const api = async (params) => {
  const u = new URL("https://commons.wikimedia.org/w/api.php");
  u.search = new URLSearchParams({ format: "json", origin: "*", ...params });
  return (await get(u)).json();
};

/** A 429/HTML body saved as .jpg is silent corruption. Check magic bytes. */
const isImage = (b) =>
  (b[0] === 0xff && b[1] === 0xd8) || // jpeg
  (b[0] === 0x89 && b[1] === 0x50) || // png
  (b.slice(0, 4).toString() === "RIFF"); // webp

const manifest = [];

for (const [key, title] of Object.entries(WANTED)) {
  try {
    const data = await api({
      action: "query",
      titles: title,
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "2000",
    });
    const pages = data.query?.pages ?? {};
    const page = Object.values(pages)[0];
    if (!page || page.missing !== undefined || !page.imageinfo) {
      console.log(`MISS  ${key.padEnd(12)} ${title}`);
      continue;
    }
    const info = page.imageinfo[0];
    const md = info.extmetadata ?? {};
    const licence = (md.LicenseShortName?.value ?? "unknown").replace(/<[^>]+>/g, "");
    const artist = (md.Artist?.value ?? "unknown").replace(/<[^>]+>/g, "").trim();
    const usable = OK.test(licence);

    console.log(`${usable ? "OK  " : "SKIP"}  ${key.padEnd(12)} ${licence}`);
    if (!usable) continue;

    const dl = info.thumburl ?? info.url;
    const buf = Buffer.from(await (await get(dl)).arrayBuffer());
    if (!isImage(buf)) {
      console.log(`BAD   ${key.padEnd(12)} not an image (${buf.length}B)`);
      continue;
    }
    writeFileSync(`${SRC_DIR}/${key}.jpg`, buf);
    await sleep(700); // be polite to Commons

    manifest.push({
      key, file: `${key}.jpg`, title,
      licence, artist,
      url: info.descriptionurl ?? `https://commons.wikimedia.org/wiki/${encodeURIComponent(title)}`,
      bytes: buf.length,
    });
  } catch (e) {
    console.log(`ERR   ${key.padEnd(12)} ${String(e.message).slice(0, 60)}`);
  }
}

writeFileSync(`${SRC_DIR}/manifest.json`, JSON.stringify(manifest, null, 2));
console.log(`\n${manifest.length} usable -> ${SRC_DIR}/manifest.json`);
