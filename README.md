# Mohammed Alnuwaiser — personal site

A minimal monospace `README.txt`-style page, modelled on
[bwu.ai](https://www.bwu.ai/): white/black, system mono, blue links, light default
with a dark toggle. Next.js 16 · React 19 · TypeScript.

```bash
npm run dev        # http://localhost:3000
npm run build
```

## Editing

All content is in [`src/data/portfolio.ts`](./src/data/portfolio.ts).
Links with `href: null` render as plain text — see
[`CONTENT-TODO.md`](./CONTENT-TODO.md) for what's missing (GitHub, LinkedIn, repo
URLs, domain).

## Structure

```
src/
  app/
    layout.tsx    metadata + no-FOUC theme script
    page.tsx      the whole page
    globals.css   the ~40 lines of design system
  components/
    ThemeToggle.tsx
  data/portfolio.ts
scripts/          shot.mjs / contrast.mjs / a11y.mjs  (verification)
```

## Theme

`layout.tsx` runs a tiny inline script before paint: reads a saved choice, else
the OS preference, and sets `:root[data-theme]`. `ThemeToggle` flips and persists
it via `useSyncExternalStore` (no hydration flash, no set-state-in-effect).
