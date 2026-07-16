# Mohammed Alnuwaiser — portfolio

A single-scroll editorial portfolio. Dark teal, monumental serif, procedural
grain, and original SVG artwork rooted in Islamic intellectual history.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4.

```bash
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Read these first

| File | What it is |
|---|---|
| [`CONTENT-TODO.md`](./CONTENT-TODO.md) | **Start here.** Real values the brief didn't state — contact links, dates, résumé. |
| [`design-reference.md`](./design-reference.md) | Measured findings from the Hermes Agent reference and where this site deliberately diverges. |
| [`public/assets/ATTRIBUTION.md`](./public/assets/ATTRIBUTION.md) | Asset provenance. All artwork is original SVG; there are no third-party image licences. |

## Editing content

Everything is in [`src/data/portfolio.ts`](./src/data/portfolio.ts) — projects,
research, ledger, archive breaks, contact. Optional fields are typed `| null`
and simply don't render when null, so there are no broken links or empty labels.
**Nothing is hardcoded in components.**

## Structure

```
src/
  app/
    layout.tsx        fonts, metadata, OG
    page.tsx          section composition
    globals.css       design tokens + primitives
  components/
    Grain.tsx         procedural feTurbulence film grain
    Nav, Hero, Statement, ProjectSection, ArchiveBreak,
    Research, Ledger, About, Contact
    Reveal.tsx        IntersectionObserver scroll reveal
    art/
      HeroArt.tsx     hero city composition
      ProjectArt.tsx  five project artworks
  data/portfolio.ts   all content
  lib/svg.ts          coordinate quantisation (see below)
scripts/              verification harness
```

## Design tokens

All colour, spacing, type and grain intensity live as CSS variables in
`globals.css`. Notable ones:

- `--vsq: calc(.5vw + .5vh)` — viewport-square rhythm unit, borrowed from the
  reference, so spacing scales continuously rather than stepping at breakpoints.
- `--grain-opacity` — global grain intensity.
- `--fs-display` — `clamp(2.6rem, 13vw, 13rem)`.

## Two things that will bite you if you don't know them

**1. Quantise SVG coordinates.** `Math.cos`/`Math.sin` aren't guaranteed
bit-identical across JS engines, and Node and the browser can serialise the same
double differently in the last digit. Rendering raw trig into an SVG attribute
causes hydration mismatches. Use `n()` / `pt()` / `poly()` from
[`src/lib/svg.ts`](./src/lib/svg.ts) for any computed coordinate.

**2. Never use negative z-index for artwork.** `html` and `body` carry an opaque
background, so a `-z-10` child paints *behind* it and vanishes. Artwork sits at
`z-0` with content at `relative z-10`.

## Verification

Requires a server running (`npm run build && npm start`, port 3100).

```bash
node scripts/shot.mjs shots http://localhost:3100   # screenshots @ 1440/1920/390
                                                    # + console errors, overflow,
                                                    #   clipped text, reduced-motion
node scripts/contrast.mjs http://localhost:3100     # WCAG AA audit of every text node
node scripts/a11y.mjs     http://localhost:3100     # tab order, focus rings, anchors
```

`shot.mjs` measures text boxes against the viewport rather than trusting
`document.scrollWidth` — `overflow-x: hidden` on `<body>` hides clipping from the
usual check. That's what caught the hero name being cut off at 390px.

## Accessibility

- All text meets WCAG AA (verified, not assumed — `scripts/contrast.mjs`).
- `prefers-reduced-motion` resolves every reveal to its final state and stops the
  grain drift.
- Visible focus rings on all interactive elements; skip link to content.
