import { Reveal } from "./Reveal";
import { research } from "@/data/portfolio";

/**
 * Research as a publication index: numbered rows, hairline separators, mono
 * archive codes. No cards. Rows are only links when a real href exists.
 */
export function Research() {
  return (
    <Reveal
      as="section"
      id="research"
      aria-labelledby="research-heading"
      className="border-t border-[var(--line)] px-[var(--edge)] py-[var(--section-y)]"
    >
      <div className="mb-[calc(var(--vsq)*5)] flex items-baseline justify-between gap-6">
        <h2 id="research-heading" className="u-title u-mask">
          <span className="u-rise block">Research</span>
        </h2>
        <p className="u-meta shrink-0">Index — {String(research.length).padStart(2, "0")} entries</p>
      </div>

      <ol data-stagger>
        {research.map((entry, i) => (
          <li
            key={entry.code}
            className="u-fade border-t border-[var(--line)] last:border-b"
            style={{ "--i": i } as React.CSSProperties}
          >
            <div className="group grid gap-x-[calc(var(--vsq)*4)] gap-y-[calc(var(--vsq)*1.2)] py-[calc(var(--vsq)*3.5)] md:grid-cols-[7rem_1fr_auto] md:items-baseline">
              <span className="u-meta !text-[var(--paper)]">{entry.code}</span>

              <div>
                <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.6vw,2.25rem)] font-normal leading-[1.1]">
                  {entry.title}
                </h3>
                <p className="u-measure mt-[calc(var(--vsq)*1.2)] text-[var(--paper-muted)]">
                  {entry.body}
                </p>
              </div>

              {/* meta and href are null until real values exist — see CONTENT-TODO.md */}
              {entry.meta && <span className="u-meta">{entry.meta}</span>}
            </div>
          </li>
        ))}
      </ol>

      <p className="u-meta mt-[calc(var(--vsq)*3)] normal-case tracking-normal text-[var(--muted-teal)]">
        Research interests: natural-language mission planning, human-in-the-loop
        autonomy, and the safety constraints that keep autonomous systems
        answerable to a person.
      </p>
    </Reveal>
  );
}
