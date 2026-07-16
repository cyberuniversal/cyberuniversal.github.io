# Asset attribution

_Last verified: 2026-07-16_

## Summary

The site uses two kinds of visual, both documented below:

1. **Archival photographic plates** — public-domain and CC0 sources from
   Wikimedia Commons, heavily transformed (see _Processing_). Listed in full.
2. **Original SVG artwork** — authored in this repository.

No stock photography, no AI-generated imagery, and nothing traced from or copied
off the Hermes Agent reference site. Every third-party source is public domain or
CC0, so there are **no attribution-required licences** — the credits below are
kept because they are correct practice, not because a licence compels them.

---

## Archival plates

Sources downloaded by `scripts/fetch-assets.mjs`, which verifies each licence via
the Commons API rather than trusting the filename. Originals are kept in
`assets-src/` (untracked); baked output is `public/img/*.webp`.

| Plate | Source work | Author | Licence | Commons |
|---|---|---|---|---|
| `map-arabia` | *Carte de l'Arabie*, 1771 | Rigobert Bonne | Public domain | [file](https://commons.wikimedia.org/wiki/File:1771_Bonne_Map_of_Arabia_-_Geographicus_-_Arabia-bonne-1771.jpg) |
| `map-idrisi` | Al-Idrisi's world map | unknown | Public domain | [file](https://commons.wikimedia.org/wiki/File:Al-Idrisi%27s_world_map.JPG) |
| `manuscript` | Tashelhit manuscript IV, Arabic script, p.1 | Mohammed Awzal | Public domain | [file](https://commons.wikimedia.org/wiki/File:Tashelhit_manuscript_IV_in_Arabic_script_page_1.jpg) |
| `medical-ms` | Cheshm (ophthalmological) manuscript | unknown | Public domain | [file](https://commons.wikimedia.org/wiki/File:Cheshm_manuscript.jpg) |
| `courtyard` | Islam Khodja madrasa, Khiva | Bgag | CC0 | [file](https://commons.wikimedia.org/wiki/File:Islam_Khodja_Madrasa_04.jpg) |
| `geometry` | Zellij, Place El-Hedine, Meknes | unknown | Public domain | [file](https://commons.wikimedia.org/wiki/File:Mekhnes_Place_El-Hedine_Mosaique.jpg) |

`astrolabe` (CC0, Gary Todd) was fetched but **is not used** — a flat brass disc
with no linework survives dithering as a solid blob. Kept in `assets-src/` only.

### Processing

`scripts/dither.mjs` transforms each source rather than reproducing it:
resize → grayscale → normalise → CLAHE local equalisation → invert → contrast/gamma
→ horizontal line-screen with a Bayer 4×4 ordered dither → duotone (pure black +
`--paper`) → lossless webp.

The output is 1-bit two-colour art, composited with `mix-blend-mode: screen` so
the black drops out to the page. None of these reads as an unedited museum image.

### Where used

`map-arabia` → Shepherd-AI · `courtyard` → Halaqaat · `manuscript` → Youth Ink
Network · `geometry` → BiQiyas · `medical-ms` → Glucose Guardian ·
`map-idrisi` → hero ground layer.

## Where the original SVG artwork lives

Used where no suitable archival source exists, and layered *over* the plates on
the hero and the flagship.

| Artwork | File | Subject |
|---|---|---|
| Hero composition | `src/components/art/HeroArt.tsx` | Andalusi arcade, square minarets, dome, city wall, astrolabe rete, 8-fold geometric construction, caravan routes, graticule |
| Shepherd-AI | `src/components/art/ProjectArt.tsx` | Terrain contours, watchtowers, surveyed mission boundary, task-allocation fan, waypoints |
| Halaqaat | `src/components/art/ProjectArt.tsx` | Madrasa courtyard in plan, concentric study circles, hanging lamp |
| Youth Ink Network | `src/components/art/ProjectArt.tsx` | Manuscript leaves, mistara ruling, marginalia, collation marks, reed pen |
| BiQiyas | `src/components/art/ProjectArt.tsx` | Compass-and-straightedge construction with working arcs left visible, dividers, measured baseline |
| Glucose Guardian | `src/components/art/ProjectArt.tsx` | Botanical specimen study, albarello vessel, measured trace, escalation path |
| Córdoba / Baghdad / Damascus | `src/components/ArchiveBreak.tsx` | Two-tier horseshoe arcade; the Round City with four gates; the Umayyad courtyard plan |
| About | `src/components/About.tsx` | Empty study desk, rihal, inkwell, folded map, star chart |
| Film grain | `src/components/Grain.tsx` | Procedural `feTurbulence` fractal noise |

## Historical grounding

The drawings are schematic and architectural rather than pictorial. Specific
choices made for accuracy:

- **Horseshoe arches** carry the overshoot below the springline that defines the
  Córdoba arcade; a plain semicircle on legs would be a tombstone, not Andalusi.
- **Minarets** are square-shafted (Andalusi/Maghrebi), not Ottoman pencil form.
- **Baghdad** is drawn as the Round City with gates on the diagonals.
- **Damascus** is drawn as a courtyard plan with aisles parallel to the qibla wall.

## Respectful depiction

No prophet, companion, or scholar is depicted. Where a human presence is implied
it is a mark, a seat, or an absence:

- Halaqaat shows students as unmodelled dots around an **open book**, not a figure.
- About uses an **empty desk** in place of a portrait.
- No faces appear anywhere on the site.

## Arabic

Arabic is used only where the word is genuine and carries meaning:

| Text | Meaning | Used for |
|---|---|---|
| الرياض | Riyadh | Location |
| حلقات | "circles" | Halaqaat — the study circles it is named for |
| بقياس | from *qiyās*, "measure" | BiQiyas |
| قرطبة / بغداد / دمشق | Córdoba / Baghdad / Damascus | Archive interstitials |

No Qur'anic verse, hadith, scholarly quotation, historical statement, or Hijri
date appears on this site. Nothing is quoted, so nothing is misattributed. No
decorative or generated Arabic is used anywhere.

## Fonts

Loaded via `next/font/google`, self-hosted at build time. No proprietary font
files from the reference site are copied or redistributed.

| Font | Licence | Role |
|---|---|---|
| Bodoni Moda | SIL Open Font License 1.1 | Display serif |
| IBM Plex Sans | SIL Open Font License 1.1 | Body |
| IBM Plex Mono | SIL Open Font License 1.1 | Metadata |
| Amiri | SIL Open Font License 1.1 | Arabic (classical Naskh) |

## If you add external imagery later

Add the Commons `File:` title to `WANTED` in `scripts/fetch-assets.mjs` and run
it — it verifies the licence via the API and refuses anything that isn't PD/CC0.
Then add a tuning entry in `scripts/dither.mjs` and a row to the table above.

Do not hand-drop images into `public/img/`: they'd skip the licence check and the
dither, and would composite wrong (a non-black shadow shows the plate's
rectangle under `screen`).
