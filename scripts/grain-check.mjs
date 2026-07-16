/**
 * Isolate whether the global grain layer degrades text rendering.
 * Captures the same text crop at 3x DPI with the grain on and off.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = process.argv[2] ?? "grain";
const URL = process.argv[3] ?? "http://localhost:3000";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

for (const grain of [true, false]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 3,
  });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  if (!grain) {
    await page.evaluate(() => {
      document.querySelectorAll(".grain-layer").forEach((e) => e.remove());
    });
  }
  await page.waitForTimeout(500);

  await page.screenshot({
    path: `${OUT}/text-grain-${grain ? "on" : "off"}.png`,
    clip: { x: 56, y: 540, width: 560, height: 110 },
  });
  await page.close();
}

await browser.close();
console.log("captured grain on/off text crops at 3x");
