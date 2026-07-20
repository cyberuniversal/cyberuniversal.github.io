import { ThemeToggle } from "@/components/ThemeToggle";
import {
  profile,
  experience,
  projects,
  links,
  stack,
} from "@/data/portfolio";

/**
 * bwu.ai README layout: one left-aligned monospace column, blocks separated by
 * blank space. A row is a link only when it has a real href; otherwise plain
 * text (no invented URLs). Email and phone are the only resolving links today.
 */

const year = new Date().getFullYear();

/** "what@ where", where becoming a link only if href is present. */
function Row({ what, where, href }: { what: string; where: string; href: string | null }) {
  const label = where ? (
    <>
      {what}
      <span style={{ color: "var(--muted)" }}>@ </span>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer noopener">
          {where}
        </a>
      ) : (
        where
      )}
    </>
  ) : href ? (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {what}
    </a>
  ) : (
    what
  );
  return <p>{label}</p>;
}

export default function Home() {
  return (
    <main
      style={{
        maxWidth: "1140px",
        margin: "0 auto",
        padding: "clamp(1.5rem, 5vw, 3.5rem) 15px",
      }}
    >
      <header style={{ color: "var(--muted)", marginBottom: "2rem" }}>
        {profile.path}
      </header>

      <p>
        <strong>{profile.name}</strong>
      </p>
      <p style={{ maxWidth: "62ch", marginTop: "0.75rem" }}>{profile.bio}</p>

      <Section>
        {experience.map((e) => (
          <Row key={e.what + e.where} {...e} />
        ))}
      </Section>

      <Section label="Projects & Research">
        {projects.map((p) => (
          <p key={p.name} style={{ marginBottom: "0.75rem", maxWidth: "72ch" }}>
            {p.href ? (
              <a href={p.href} target="_blank" rel="noreferrer noopener">
                <strong>{p.name}</strong>
              </a>
            ) : (
              <strong>{p.name}</strong>
            )}
            {/* Italic emphasis marks the in-progress research, matching the
                reference's <em> treatment. */}
            {p.inProgress && (
              <em style={{ color: "var(--muted)" }}> — research in progress</em>
            )}
            <span style={{ color: "var(--muted)" }}> — {p.note}</span>
          </p>
        ))}
      </Section>

      <Section>
        <p style={{ color: "var(--muted)", maxWidth: "72ch" }}>{stack}</p>
      </Section>

      <Section>
        {links.map((l) => (
          <Row key={l.what} {...l} />
        ))}
        <p>
          <a href={`mailto:${profile.email}`}>{obfuscate(profile.email)}</a>
        </p>
        <p>
          <a href={profile.phoneHref}>{profile.phone}</a>
        </p>
        <p>{profile.location}</p>
      </Section>

      <Section>
        <p>Languages I speak: {profile.languages}</p>
        <p style={{ marginTop: "1rem" }}>
          <ThemeToggle />
        </p>
      </Section>

      <footer style={{ color: "var(--muted)", marginTop: "2.5rem" }}>
        © Mohammed Alnuwaiser — {year}
      </footer>
    </main>
  );
}

function Section({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: "2rem" }}>
      {label && (
        <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>{label}</p>
      )}
      {children}
    </section>
  );
}

/** bwu writes "brian [at] bwu [dot] ai" — same courtesy against scrapers. The
 *  href stays a real mailto; only the visible text is obfuscated. */
function obfuscate(email: string) {
  return email.replace("@", " [at] ").replace(/\.(?=[^.]+$)/, " [dot] ");
}
