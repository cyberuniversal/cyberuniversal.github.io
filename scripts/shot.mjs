import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = process.argv[2] ?? "shots";
const URL = process.argv[3] ?? "http://localhost:3000";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "desktop-1920x1080", width: 1920, height: 1080 },
  { name: "mobile-390x844", width: 390, height: 844 },
];

const browser = await chromium.launch();
const problems = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text().slice(0, 300));
  });
  page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + e.message.slice(0, 300)));

  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  // Let fonts settle and reveal animations resolve.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);

  // Hero (first viewport)
  await page.screenshot({ path: `${OUT}/${vp.name}-hero.png` });

  // Horizontal overflow check at this width
  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  if (overflow.scrollW > overflow.clientW + 1) {
    problems.push(`${vp.name}: HORIZONTAL OVERFLOW ${overflow.scrollW} > ${overflow.clientW}`);
  }

  // Scroll through and capture full page
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight * 0.9;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 120);
        else res();
      };
      step();
    });
  });
  await page.waitForTimeout(700);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true });

  if (consoleErrors.length) problems.push(`${vp.name} console: ${consoleErrors.join(" || ")}`);
  await ctx.close();
}

// Reduced-motion pass
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/reduced-motion-1440.png` });
// Under reduced motion, revealed content must be visible without scrolling to it.
const hidden = await page.evaluate(() => {
  const els = [...document.querySelectorAll(".u-fade, .u-rise")];
  return els.filter((e) => getComputedStyle(e).opacity === "0").length;
});
if (hidden > 0) problems.push(`reduced-motion: ${hidden} elements still at opacity 0`);
await ctx.close();

await browser.close();

console.log(problems.length ? "PROBLEMS:\n" + problems.join("\n") : "OK: no console errors, no overflow, reduced-motion clean");
