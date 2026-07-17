import { Reveal } from "./Reveal";
import { skills, education } from "@/data/portfolio";

/**
 * The bright inversion panel.
 *
 * The reference breaks its long dark run with one full-bleed white feature panel;
 * this is that beat, in aged paper with ink type. It's the only light surface on
 * the site, which is what makes it land — and it carries the driest content
 * (skills, education), so the contrast does the work instead of decoration.
 */
export function Skills() {
  return (
    <Reveal
      as="section"
      id="skills"
      aria-labelledby="skills-heading"
      className="px-[var(--edge)] py-[var(--section-y)] text-[var(--ink)]"
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div className="flex items-baseline justify-between gap-6">
        <h2
          id="skills-heading"
          className="u-title u-mask"
          style={{ color: "var(--ink)" }}
        >
          <span className="u-rise block">Toolkit</span>
        </h2>
        <p className="u-meta shrink-0 !text-[var(--oxidized-teal)]">Technical skills</p>
      </div>

      <dl data-stagger className="mt-[calc(var(--vsq)*5)]">
        {skills.map((s, i) => (
          <div
            key={s.group}
            className="u-fade grid gap-x-[calc(var(--vsq)*4)] gap-y-[calc(var(--vsq)*1.5)] border-t py-[calc(var(--vsq)*3)] md:grid-cols-[14rem_1fr]"
            style={{ borderColor: "rgba(2,17,15,0.18)", "--i": i } as React.CSSProperties}
          >
            <dt className="u-meta !text-[var(--oxidized-teal)]">{s.group}</dt>
            <dd className="flex flex-wrap gap-x-[calc(var(--vsq)*2.5)] gap-y-[calc(var(--vsq)*1)]">
              {s.items.map((it) => (
                <span
                  key={it}
                  className="font-[family-name:var(--font-display)] text-[clamp(1rem,1.5vw,1.35rem)] leading-none"
                >
                  {it}
                </span>
              ))}
            </dd>
          </div>
        ))}

        {/* Education sits here rather than in its own section: it is one line of
            fact, and a whole band for it would overstate it. */}
        <div
          className="u-fade grid gap-x-[calc(var(--vsq)*4)] gap-y-[calc(var(--vsq)*1.5)] border-t border-b py-[calc(var(--vsq)*3)] md:grid-cols-[14rem_1fr]"
          style={{ borderColor: "rgba(2,17,15,0.18)" }}
        >
          <dt className="u-meta !text-[var(--oxidized-teal)]">Education</dt>
          <dd>
            <span className="font-[family-name:var(--font-display)] text-[clamp(1rem,1.5vw,1.35rem)]">
              {education.school} — {education.place}
            </span>
            <span className="u-meta mt-[calc(var(--vsq)*1.2)] block !text-[var(--oxidized-teal)]">
              {education.detail} · {education.expected} · {education.period}
            </span>
          </dd>
        </div>
      </dl>
    </Reveal>
  );
}
