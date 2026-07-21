import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { L } from "@/components/L";
import { profile, writings } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Writings — Mohammed Alnuwaiser",
  description: "Writings by Mohammed Alnuwaiser.",
};

const year = new Date().getFullYear();

/**
 * /writings, laid out like the reference's /blog: header (name links home) →
 * "Writings" → <hr> → [project-section: linked <h3> + bold date] per entry →
 * <hr> → "← Back to Home". No description paragraph (that's the blog format).
 */
export default function WritingsPage() {
  return (
    <div className="container">
      <br />

      <p>
        <Link href="/">{profile.pathName}</Link>
        /writings.txt
      </p>

      <p></p>

      <p>
        <strong>Writings</strong>
      </p>

      <hr />

      {writings.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>Nothing published yet.</p>
      ) : (
        writings.map((w) => (
          <div key={w.title}>
            <div className="project-section">
              <h3>
                <L href={w.href}>{w.title}</L>
              </h3>
              <p>
                <strong>{w.date}</strong>
              </p>
            </div>
            <hr />
          </div>
        ))
      )}

      {writings.length === 0 && <hr />}

      <p>
        <Link href="/">← Back to Home</Link>
      </p>

      <br />

      <p>
        © {profile.name} — {year}
      </p>
      <p>
        <ThemeToggle />
      </p>

      <br />
      <br />
    </div>
  );
}
