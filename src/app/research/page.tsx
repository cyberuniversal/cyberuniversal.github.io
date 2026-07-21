import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { L } from "@/components/L";
import { profile, research } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Research — Mohammed Alnuwaiser",
  description: "Research by Mohammed Alnuwaiser: Shepherd-AI and Musahhih.",
};

const year = new Date().getFullYear();

/**
 * /research, laid out element-for-element like the reference's /projects page:
 * header (name links home) → title → <hr> → [project-section, <hr>] per entry →
 * "← Back to Home" → copyright → toggle.
 */
export default function ResearchPage() {
  return (
    <div className="container">
      <br />

      <p>
        <Link href="/">{profile.pathName}</Link>
        /research.txt
      </p>

      <p></p>

      <p>
        <strong>Research</strong>
      </p>

      <hr />

      {research.map((r) => (
        <div key={r.name}>
          <div className="project-section">
            <h3>
              <L href={r.href}>{r.name}</L>
            </h3>
            <p>
              <strong>{r.date}</strong> · <em>paper in progress</em>
            </p>
            <p className="desc">{r.note}</p>
          </div>
          <hr />
        </div>
      ))}

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
