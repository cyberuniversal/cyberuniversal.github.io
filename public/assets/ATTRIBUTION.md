# Asset attribution

_Last verified: 2026-07-16_

## Summary

**Every visual on this site is original SVG, authored in this repository.**

There are no external image assets. No museum scans, no stock photography, no
public-domain reproductions, no AI-generated imagery, and nothing traced from or
copied off the Hermes Agent reference site.

This means the site has **no third-party image licence obligations**. It also
means there is nothing to re-clear if the site is redeployed elsewhere.

## Where the artwork lives

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

Add a row here recording **source, file, author, licence, and URL** before the
asset ships, and keep the "no third-party assets" claim above accurate.
