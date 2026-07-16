# Content TODO — real values needed

Your brief was explicit: do not fabricate dates, metrics, links, roles,
technologies, or research results. The repository was empty, so **the brief
itself was the only source of truth**. Everything the brief states is on the
site. Everything below is something the brief did *not* state, so it was left
out rather than invented.

Nothing here is blocking — the site builds, runs, and reads correctly without
it. But these are the gaps between what's shipped and a finished portfolio.

Edit `src/data/portfolio.ts`. Every field is typed `| null`; anything still
`null` simply doesn't render, so there are no broken links or empty labels.

---

## 1. Contact links — the only user-visible TODO

`contact` in `src/data/portfolio.ts` is entirely `null`, so the contact section
renders a literal "TODO — add email, GitHub, LinkedIn and résumé" line. **This is
visible to anyone who loads the page.** It's deliberate (the brief asks for a
clear TODO over invented information), but it should be the first thing you fix.

```ts
export const contact = {
  email: "you@example.com",
  github: "https://github.com/...",
  linkedin: "https://linkedin.com/in/...",
  resume: "/resume.pdf",
};
```

I deliberately did **not** use the email address attached to this machine —
publishing a personal address is your call, not mine.

## 2. Résumé

The hero's "Download résumé" control and the nav's "Résumé" link are both
**removed**, not broken. Drop a real file at `public/resume.pdf`, set
`contact.resume`, and the hero control restores itself automatically
(`src/components/Hero.tsx` already guards on it).

## 3. Project links

Every project has `href: null`, so no "Open project" control renders. Add a
repo, case study, or live URL per project.

## 4. Dates and status

Every `status` and every ledger `period` is `null`. The brief gave no dates for
anything — not the fellowship, not DefenseThon, not any project. Ledger rows
currently show role and organisation with no date column.

## 5. Roles the brief didn't state

The brief states exactly two roles, and only these two are on the site:

- **Youth Ink Network** — Co-Founder and CTO
- **YRI** — Research Fellow

It does **not** state your role on Shepherd-AI, Halaqaat, BiQiyas, or Glucose
Guardian, so those are `null` and no Role label renders. Fill them in if you want
them shown.

## 6. Technology metadata

The brief asks for "restrained technology metadata" but names no technologies for
any project. Nothing is shown. If you want it, add a `tech?: string[]` to the
`Project` type and render it in the metadata `<dl>` in
`src/components/ProjectSection.tsx`.

## 7. Research entries

`research` has two entries (Shepherd-AI, YRI Fellowship), both with `meta: null`
and `href: null` — no venue, date, paper, poster, or PDF was stated. The brief
mentions "papers, reports, posters, PDFs, technical documents found in the
repository"; the repository had none.

## 8. Portrait

`src/components/About.tsx` uses an original symbolic composition (an empty study
desk) because no portrait existed and the brief forbids generating one. If you
want a real photo, add it and replace `<DeskArt />` — the TODO is marked in the
file.

## 9. Production domain

`SITE` in `src/app/layout.tsx` is a placeholder
(`https://mohammedalnuwaiser.com`). It drives `metadataBase` and the Open Graph
URL, so set it before deploying.

## 10. OG image

Open Graph tags are present but there's no image. Add `public/og.png`
(1200×630) and set `openGraph.images` in `src/app/layout.tsx`.

---

## Things worth double-checking

These are on the site and came from the brief, but are worth a glance:

- **"DefenseThon"** — spelling per your brief. Ledger reads "Second Place —
  Programming Path".
- **"YRI"** — the brief never expands the acronym; the site doesn't either.
- **Riyadh coordinates** (`24°42′N 46°43′E`) in the hero are the city's
  approximate coordinates, not a specific address.
