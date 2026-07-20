import { ThemeToggle } from "@/components/ThemeToggle";
import { L } from "@/components/L";
import {
  profile,
  hereLinks,
  roles,
  rolesSplitAfter,
  repos,
  socials,
} from "@/data/portfolio";

/**
 * Structure copied from bwu.ai: container → [name]/README.txt → name → bio →
 * "X here" links → <hr> → roles → <hr> → repos + socials → email → <hr> →
 * languages · toggle · copyright.
 */

const year = new Date().getFullYear();

export default function Home() {
  return (
    <div className="container">
      <br />

      <p>
        <L href={profile.githubUrl}>{profile.pathName}</L>
        {profile.pathExt}
      </p>

      <p></p>

      <p>
        <strong>{profile.name}</strong>
      </p>
      <p>{profile.bio}</p>

      {/* "X here" links, stacked tight (p.list = no margin) so Projects and
          Research sit right below each other. */}
      <div>
        {hereLinks.map((l) => (
          <p key={l.label} className="list">
            <span>{l.label} </span>
            <L href={l.href}>here</L>
          </p>
        ))}
      </div>

      <hr />

      <div className="list">
        {roles.map((r, i) => {
          const Name = r.bold ? "strong" : "span";
          return (
            <div key={r.name + r.org}>
              <p className="list">
                <Name className="role-name">{r.name}</Name>
                <span>@ {r.org}</span>
              </p>
              {i === rolesSplitAfter - 1 && <br />}
            </div>
          );
        })}

        <hr />

        {repos.map((p) => (
          <p key={p.name} className="list">
            <span className="role-name">
              {p.name}
              {p.inProgress && <em> (in progress)</em>}
            </span>
            <span>
              @ <L href={p.href}>github</L>
            </span>
          </p>
        ))}
        {socials.map((s) => (
          <p key={s.platform} className="list">
            <span className="role-name">{s.name}</span>
            <span>
              @ <L href={s.href}>{s.platform}</L>
            </span>
          </p>
        ))}

        <br />

        <p>{obfuscate(profile.email)}</p>

        <hr />

        <p>Languages I speak: {profile.languages}</p>
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

/** "momoalnuw [at] gmail [dot] com" — matches the reference's obfuscation. */
function obfuscate(email: string) {
  return email.replace("@", " [at] ").replace(/\.(?=[^.]+$)/, " [dot] ");
}
