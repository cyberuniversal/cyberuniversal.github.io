# Content TODO

Content is from `Resume.pdf`, laid out like the reference (bwu.ai). Edit
`src/data/portfolio.ts`. Any `href: null` renders as plain text — no invented
URLs — so these light up the moment you add them:

| Item | Field |
|---|---|
| GitHub URL | `links[0].href` |
| LinkedIn URL | `links[1].href` |
| Shepherd-AI repo | `projects[0].href` |
| Musahhih repo | `projects[1].href` |
| Production domain | `SITE` in `src/app/layout.tsx` (drives OG + metadata) |

Live now: email (`mailto:`) and phone (`tel:`).

## Decisions

- **Bio line** is written to mirror the reference's cadence, from your résumé's
  research interests. Reword in `profile.bio` if you'd say it differently.
- **No epigraph.** The reference has a personal quote under the bio; I didn't
  invent one. Add a real line to `profile` + render it if you want it.
- **Theme:** light default, dark toggle, follows OS preference on first visit,
  then remembers your choice. Palette matches the reference exactly.
- **`~/mohammed-alnuwaiser/README.txt`** — the reference uses `bwu.ai/README.txt`.
  You have no domain yet, so I used a neutral path. Change `profile.path` once
  the domain is set.

## One accessibility note

The reference's light-mode link blue (`#007bff`) measures **~3.98:1** on white —
just under the WCAG AA 4.5:1 floor for normal text. I kept it because you asked
for an exact match, and dark mode's link colour is fine. If you'd rather clear
AA, change `--link` in `globals.css` to `#0067d6` (≈4.5:1) — visually near
identical. Your call: exact match vs. AA.
