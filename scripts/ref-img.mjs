// Throwaway: grab a Hermes source image + a composited crop, to see what the
// effect actually is (baked into the asset vs done by the blend).
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = process.argv[2] ?? "ref";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://hermes-agent.nousresearch.com/", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

// Raw source of one feature image, untouched by CSS.
const url = await page.evaluate(() => {
  const im = [...document.querySelectorAll("img")].find((i) =>
    (i.currentSrc || i.src).includes("feature-memory"),
  );
  return im ? new URL(im.currentSrc || im.src, location.href).href : null;
});
if (url) {
  const buf = await (await page.request.get(url)).body();
  writeFileSync(`${OUT}/raw-feature-memory.png`, buf);
  console.log("raw saved:", url.slice(0, 90));
}

// The same image as composited on the page.
const el = await page.$('img[src*="feature-memory"]');
if (el) {
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await el.screenshot({ path: `${OUT}/composited-feature-memory.png` });
  console.log("composited saved");
}

await browser.close();
