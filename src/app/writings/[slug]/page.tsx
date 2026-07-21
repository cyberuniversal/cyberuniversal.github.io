import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile, writings } from "@/data/portfolio";

type Params = { params: Promise<{ slug: string }> };

/** Static export generates one page per post; needs at least one entry. */
export function generateStaticParams() {
  return writings.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const w = writings.find((x) => x.slug === slug);
  if (!w) return { title: "Not found" };
  return {
    title: `${w.title} — ${profile.name}`,
    description: w.subtitle ?? w.title,
  };
}

/**
 * Splits the post body into blocks, mirroring the reference's post markup:
 *  - blank line          → new <p>
 *  - lines starting "> " → <blockquote> with one <p> per line
 *  - **wrapped**         → <p><strong> section label
 */
function renderBody(body: string) {
  return body
    .trim()
    .split(/\n\s*\n/)
    .map((block, i) => {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);

      if (lines.length && lines.every((l) => l.startsWith(">"))) {
        return (
          <blockquote key={i}>
            {lines.map((l, j) => (
              <p key={j}>{l.replace(/^>\s?/, "")}</p>
            ))}
          </blockquote>
        );
      }

      const label = /^\*\*(.+)\*\*$/.exec(block.trim());
      if (label) {
        return (
          <p key={i}>
            <strong>{label[1]}</strong>
          </p>
        );
      }

      return <p key={i}>{lines.join(" ")}</p>;
    });
}

export default async function Post({ params }: Params) {
  const { slug } = await params;
  const w = writings.find((x) => x.slug === slug);
  if (!w) notFound();

  return (
    <div className="container narrow post">
      <br />

      {/* The reference uses history.back(); a real link also works on a direct
          visit or a shared URL. */}
      <Link href="/writings/" className="back-link">
        &lt; back
      </Link>

      <br />
      <br />

      <h5>
        by <em>{profile.name}</em>
      </h5>
      <h1>{w.title}</h1>
      <p>Date: {w.date}</p>

      {w.subtitle && (
        <p>
          <em>{w.subtitle}</em>
        </p>
      )}

      {renderBody(w.body)}

      <hr />

      <p>
        <Link href="/writings/">← Back to writings</Link>
      </p>
      <p>
        <ThemeToggle />
      </p>

      <br />
      <br />
    </div>
  );
}
