# Mohammed Alnuwaiser — personal site

Live at **[cyberuniversal.github.io](https://cyberuniversal.github.io)**.
Next.js static export, deployed to GitHub Pages automatically on every push to
`master`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export -> out/
```

## Editing content

Everything lives in **`src/data/portfolio.ts`** — bio, roles, links, research,
and writings. Nothing is hardcoded in the pages.

### Adding a writing

Add an entry to the `writings` array. They sort newest-first automatically and
each one gets its own page at `/writings/<slug>/`.

```ts
{
  slug: "my-new-post",          // becomes the URL; lowercase-with-hyphens
  title: "My New Post",
  date: "2026-08-01",           // YYYY-MM-DD
  subtitle: "optional italic line",
  body: `First paragraph.

Second paragraph — blank line between each.

> a quoted line becomes a blockquote

**a paragraph wrapped in asterisks becomes a bold label**`,
},
```

`body` uses backticks so line breaks are preserved. Supported formatting is
blank-line paragraphs, `>` blockquotes, and a fully-`**wrapped**` paragraph as a
section label. Inline bold/italic/links inside a sentence are not supported yet.

Then commit and push — the site redeploys in about a minute.

## Layout

```
src/
  app/
    layout.tsx              fonts, metadata, theme script
    page.tsx                home
    research/page.tsx       /research
    writings/page.tsx       /writings index
    writings/[slug]/        one page per post
    globals.css             the whole design system
  components/               ThemeToggle, LangSwitcher, L (link)
  data/
    portfolio.ts            all content
    i18n.ts                 Arabic translations
.github/workflows/deploy.yml   builds and publishes to GitHub Pages
```

Light theme by default with a dark toggle; the language switch translates the
home page between English and Arabic (right-to-left).
