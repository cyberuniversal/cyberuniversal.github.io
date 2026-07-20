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
 * The /research sub-page, reached from "Research here" on the home page.
 * Same README aesthetic; the header path links back home. Detail notes are
 * richer than the home list because this is where the detail belongs.
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
      <p>
        <em>Both papers in progress.</em>
      </p>

      <hr />

      <div className="list">
        {research.map((r) => (
          <p key={r.name} className="list" style={{ marginBottom: "16px", maxWidth: "80ch" }}>
            <span className="role-name">
              {r.name} <em>(in progress)</em>
            </span>
            <span>
              @ <L href={r.href}>github</L>
            </span>
            <span style={{ display: "block", color: "var(--muted)", marginTop: "4px" }}>
              {r.note}
            </span>
          </p>
        ))}

        <hr />

        <p>
          <Link href="/">← back</Link>
        </p>
        <p>
          <ThemeToggle />
        </p>

        <br />
        <br />

        <p>
          © {profile.name} — {year}
        </p>
      </div>
    </div>
  );
}
