# Content TODO

All site content now comes from `Resume.pdf` and lives in
`src/data/portfolio.ts`. Figures are quoted as the résumé states them, hedges
included ("approximately 11,000", "roughly 350", "approximately 97%").

Optional fields are typed `| null` — anything null simply doesn't render, so
there are no broken links or empty labels.

---

## Still missing (not on the résumé)

| # | Item | Where |
|---|---|---|
| 1 | **GitHub / LinkedIn** | `contact` in `src/data/portfolio.ts` — set them and the footer links appear automatically |
| 2 | **Résumé file** | drop `public/resume.pdf`, set `contact.resume`; the hero's download control restores itself |
| 3 | **Project links** | every `work[].href` is `null`, so no "Open project" control renders |
| 4 | **Production domain** | `SITE` in `src/app/layout.tsx` is a placeholder; drives `metadataBase` + OG URL |
| 5 | **OG image** | add `public/og.png` (1200×630), set `openGraph.images` |
| 6 | **Portrait** | About uses a drawn desk. Add a real photo and replace `<DeskArt />` |

## Decisions worth knowing

- **Email is live.** `momoalnuw@gmail.com`, from the résumé, renders in the footer.
- **Roles are verbatim.** Research Fellow (YRI Fellowship, Remote); Founder &
  Research Lead (ALBA7OOTH); Founder (Halaqaat); Co-Founder & CTO (BiQiyas);
  Co-Founder & CTO (Youth Ink Network). Glucose Guardian lists no role on the
  résumé, so it shows "Builder" — change it if that's wrong.
- **Tech per project** is only what the résumé attributes to that project.
  Glucose Guardian names its stack; Shepherd-AI names MAVSDK/MAVLink. Halaqaat
  and BiQiyas name none, so none is shown. The full stack lives in Toolkit.
- **Education is in the Toolkit panel**, not its own section — it's one line of
  fact and a full band would overstate it.
- **"Defensethon"** is spelled as the résumé spells it.

## Ordering

Work is ordered by weight, not by the résumé's section order: Shepherd-AI leads
as the flagship (it's the one with an award and a fellowship behind it), then the
research lab, then the three ventures, then Glucose Guardian. Reorder by editing
the `work` array — numbering follows the array.
