# Design reference

Primary reference: **Hermes Agent** (Nous Research)
- https://hermes-agent.nousresearch.com/
- https://nousresearch.net/hermes-agent/ (identical site)

Measured live on 2026-07-16 via computed styles, not by eye.

---

## 1. What the reference actually is

| Property | Measured value |
|---|---|
| `html` / `body` background | `rgb(0, 0, 242)` — saturated electric blue |
| Foreground | `rgb(245, 245, 245)` off-white |
| Accent | `rgb(237, 255, 69)` acid yellow |
| Pure black | `rgb(0, 0, 0)` — structural blocks |
| Teal / green elements | **0** |
| Feature panel | `rgb(255,255,255)` white, ~1762px tall |
| SVG noise filters | **0** |
| Media | 12 `<img>`, 2 `<video>`, 1 `<canvas>` |

### Typography (measured at 1440×900)

| Role | Value |
|---|---|
| Display | `displayFont`, serif (Times fallback), **weight 300**, uppercase |
| H1 | `80.54px` / line-height `70.88px` (**0.88**) / letter-spacing `2.42px` |
| H2 | `39.05px` / line-height `39.05px` (**1.0**) / weight 300 |
| Body | `ui-sans-serif` system stack, `14px` |
| Mono | `monoFont` (Courier New fallback) — labels, indexes, install strings |
| Spacing unit | `--vsq: calc(.5vw + .5vh)` — viewport-square unit |

Three typographic voices confirmed: **display serif / neutral sans / mono**.

---

## 2. Deliberate divergence from the reference

The brief specifies a dark near-black teal palette and explicitly bans "bright electric
blue" — which is the reference's defining colour. These cannot both hold.

**Decision (confirmed with Mohammed, 2026-07-16): keep the dark teal palette.**
Match the reference on everything *except* colour.

Three further points where the brief diverges from the measured reference, resolved in
favour of the brief:

1. **Type scale** — brief suggests `clamp(5rem, 13vw, 13rem)` (~187px at 1440). Reference
   H1 is 80px. Brief wins, but line-height `0.88` and weight `300` are taken from the
   reference; these are what make it read as Hermes rather than the raw size.
2. **Grain** — reference has no procedural noise. Brief requires a film-grain overlay, so
   grain is original procedural SVG (`feTurbulence`). This is an addition, not a copy.
3. **Case** — reference is near-universally uppercase. Brief says don't uppercase
   everything. Uppercase is therefore reserved for display headings and mono metadata;
   paragraphs stay sentence case.

---

## 3. What we take from the reference

- **Weight 300 uppercase serif display** with line-height 0.88–0.95 and positive tracking.
  This single decision carries most of the resemblance.
- **Mono for all metadata**: indexes, statuses, dates, coordinates, archive codes.
- **Full-bleed compositions** that run edge to edge; no content cards, no floating panels.
- **Viewport-relative spacing unit** (`--vsq`) so rhythm scales with the screen rather than
  stepping at breakpoints.
- **Numbered sections** (`#1 CONNECT`, `#2 REMEMBER` …) → our `#01 SHEPHERD-AI` …
- **A bright inversion panel** mid-page to break the dark run. Reference uses white; we use
  aged paper (`--paper`) with dark ink text.
- **Extreme restraint**: thin rules, generous negative space, no decoration that isn't
  structural.

## 4. What we explicitly do not take

Logo, wordmark, copy, proprietary fonts, illustrations, the blue palette, brand identity.

---

## 5. Locked visual system

- Palette: dark teal base (`--ink` … `--oxidized-teal`), warm ivory/paper foreground.
- Display: **Bodoni Moda** — high-contrast editorial serif, weight 300–400, uppercase.
- Sans: **IBM Plex Sans** — restrained, readable paragraphs.
- Mono: **IBM Plex Mono** — archival metadata.
- Arabic: **Amiri** — classical Naskh, RTL, used sparingly and only with verified text.
- Texture: original procedural `feTurbulence` grain, fixed, `pointer-events: none`,
  reduced under `prefers-reduced-motion`.
- Imagery: **100% original SVG**. No external/museum assets, so no licence risk.
- Section order: hero → statement → selected work (5 projects, archive breaks
  interleaved) → research index → ledger → about → contact.
