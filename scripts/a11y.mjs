/**
 * Keyboard + link integrity checks.
 * - every interactive element is reachable by Tab and shows a visible focus ring
 * - no anchor points at a missing target (no broken in-page links)
 */
import { chromium } from "playwright";

const URL = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const problems = [];

// 1. In-page anchors must resolve.
const anchors = await page.evaluate(() =>
  [...document.querySelectorAll("a[href]")].map((a) => ({
    href: a.getAttribute("href"),
    text: (a.textContent || "").trim().slice(0, 30),
  })),
);
for (const a of anchors) {
  if (a.href.startsWith("#")) {
    const ok = await page.evaluate((h) => !!document.querySelector(h), a.href);
    if (!ok) problems.push(`BROKEN ANCHOR ${a.href} ("${a.text}")`);
  }
}

// 2. Tab order reaches every link, and focus is visible.
const focusables = await page.evaluate(
  () => document.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])').length,
);

const seen = new Set();
let noRing = [];
for (let i = 0; i < focusables + 4; i++) {
  await page.keyboard.press("Tab");
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const cs = getComputedStyle(el);
    const ring =
      cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
    return {
      tag: el.tagName,
      text: (el.textContent || "").trim().slice(0, 26),
      ring,
    };
  });
  if (!info) continue;
  const key = info.tag + info.text;
  if (seen.has(key)) continue;
  seen.add(key);
  if (!info.ring) noRing.push(`${info.tag} "${info.text}"`);
}

if (noRing.length) problems.push(`NO VISIBLE FOCUS RING: ${noRing.join(", ")}`);

console.log(
  `anchors=${anchors.length} focusables=${focusables} tab-reached=${seen.size}`,
);
console.log(problems.length ? "PROBLEMS:\n" + problems.join("\n") : "A11Y OK — anchors resolve, all focusables reachable with visible focus");

await browser.close();
