/**
 * WCAG contrast audit of every rendered text node against its effective
 * background. Small text needs 4.5:1; large text (>=24px, or >=18.66px bold)
 * needs 3:1.
 */
import { chromium } from "playwright";

const URL = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const step = () => {
      y += window.innerHeight * 0.8;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 60);
      else res();
    };
    step();
  });
});
await page.waitForTimeout(800);

const results = await page.evaluate(() => {
  const lum = (r, g, b) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);

  const effBg = (el) => {
    let node = el;
    while (node && node !== document.documentElement) {
      const bg = getComputedStyle(node).backgroundColor;
      const p = parse(bg);
      if (p.length >= 3 && (p[3] === undefined || p[3] > 0.5)) return [p[0], p[1], p[2]];
      node = node.parentElement;
    }
    return [2, 17, 15];
  };

  const out = [];
  document.querySelectorAll("p, a, h1, h2, h3, span, dt, dd, li").forEach((el) => {
    const txt = (el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
      ? el.textContent.trim()
      : "";
    if (!txt) return;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    if (cs.visibility === "hidden" || cs.opacity === "0") return;

    const fg = parse(cs.color);
    if (fg.length < 3) return;
    if (fg[3] !== undefined && fg[3] < 0.5) return;
    const bg = effBg(el);

    const L1 = lum(fg[0], fg[1], fg[2]);
    const L2 = lum(bg[0], bg[1], bg[2]);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);

    const size = parseFloat(cs.fontSize);
    const bold = Number(cs.fontWeight) >= 700;
    const large = size >= 24 || (bold && size >= 18.66);
    const need = large ? 3 : 4.5;

    if (ratio < need) {
      out.push({
        text: txt.slice(0, 34).replace(/\s+/g, " "),
        cls: (el.className || "").toString().slice(0, 20),
        color: cs.color,
        size: Math.round(size * 10) / 10,
        ratio: Math.round(ratio * 100) / 100,
        need,
      });
    }
  });
  // dedupe by class+color
  const seen = new Set();
  return out.filter((o) => {
    const k = o.cls + o.color + o.size;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
});

if (results.length === 0) console.log("CONTRAST OK — all text meets WCAG AA");
else {
  console.log(`CONTRAST FAILURES (${results.length} distinct):`);
  for (const r of results) {
    console.log(`  ${r.ratio}:1 (needs ${r.need}) ${r.size}px ${r.color} .${r.cls} — "${r.text}"`);
  }
}
await browser.close();
