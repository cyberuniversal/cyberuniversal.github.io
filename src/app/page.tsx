import { ThemeToggle } from "@/components/ThemeToggle";
import { LangSwitcher } from "@/components/LangSwitcher";
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
 * Structure copied from bwu.ai. `data-i18n` marks text the LangSwitcher
 * translates; proper nouns (names, orgs, username, email) stay untranslated.
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
        <strong data-i18n="name">{profile.name}</strong>
      </p>
      <p data-i18n="bio">{profile.bio}</p>

      {/* "X here" links, stacked tight so they sit right below each other. */}
      <div>
        {hereLinks.map((l) => (
          <p key={l.label} className="list">
            <span data-i18n={l.labelKey}>{l.label}</span>{" "}
            <L href={l.href}>
              <span data-i18n="here">here</span>
            </L>
          </p>
        ))}
      </div>

      <hr />

      <div className="list">
        {roles.map((r, i) => {
          const Name = r.bold ? "strong" : "span";
          return (
            <div key={r.key}>
              <p className="list">
                <Name className="role-name" data-i18n={r.key}>
                  {r.name}
                </Name>
                <span>
                  @{" "}
                  {r.orgKey ? <span data-i18n={r.orgKey}>{r.org}</span> : r.org}
                </span>
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

        <LangSwitcher />
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
