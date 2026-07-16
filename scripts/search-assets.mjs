// Throwaway helper: find Commons files matching a query and show their licence.
//   node scripts/search-assets.mjs "cordoba mezquita arches"
const q = process.argv.slice(2).join(" ");

const api = async (params) => {
  const u = new URL("https://commons.wikimedia.org/w/api.php");
  u.search = new URLSearchParams({ format: "json", origin: "*", ...params });
  return (await fetch(u, { headers: { "User-Agent": "portfolio-asset-search/1.0" } })).json();
};

const s = await api({
  action: "query",
  generator: "search",
  gsrsearch: `filetype:bitmap ${q}`,
  gsrnamespace: "6",
  gsrlimit: "12",
  prop: "imageinfo",
  iiprop: "extmetadata|url",
});

const pages = Object.values(s.query?.pages ?? {});
if (!pages.length) console.log("no results");
for (const p of pages) {
  const md = p.imageinfo?.[0]?.extmetadata ?? {};
  const lic = (md.LicenseShortName?.value ?? "?").replace(/<[^>]+>/g, "");
  if (!/^(cc0|public domain|pd-)/i.test(lic)) continue;
  console.log(`${lic.padEnd(16)} ${p.title}`);
}
