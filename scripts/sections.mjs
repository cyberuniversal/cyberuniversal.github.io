import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = process.argv[2] ?? "sections";
const URL = process.argv[3] ?? "http://localhost:3000";
const W = Number(process.argv[4] ?? 1440);
const H = Number(process.argv[5] ?? 900);
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);

// Trigger every reveal, then return to top.
await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const step = () => {
      y += window.innerHeight * 0.8;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 90);
      else res();
    };
    step();
  });
});
await page.waitForTimeout(1200);

const targets = await page.evaluate(() =>
  [...document.querySelectorAll("section[id], article[id], footer[id], aside")].map((el, i) => ({
    key: el.id || `aside-${i}`,
  })),
);

const asides = await page.$$("aside");
let asideIdx = 0;

for (const t of targets) {
  try {
    const el = t.key.startsWith("aside-") ? asides[asideIdx++] : await page.$(`#${t.key}`);
    if (!el) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await el.screenshot({ path: `${OUT}/${t.key}.png` });
  } catch (e) {
    console.log(`skip ${t.key}: ${e.message.slice(0, 60)}`);
  }
}

console.log("captured: " + targets.map((t) => t.key).join(", "));
await browser.close();
