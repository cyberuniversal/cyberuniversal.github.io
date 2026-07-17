import { Reveal } from "./Reveal";
import { honour } from "@/data/portfolio";

/**
 * The one honour on the résumé, given a full band.
 *
 * The figures are quoted exactly as the résumé states them, hedges intact
 * ("~11,000", "roughly 350"). They are not counters for their own sake — the
 * ratio is the story, so it's set as display type rather than a stat card.
 */
export function Honour() {
  return (
    <Reveal
      as="section"
      aria-labelledby="honour-heading"
      className="border-t border-[var(--line)] px-[var(--edge)] py-[var(--section-y)]"
    >
      <p className="u-meta mb-[calc(var(--vsq)*3)]">Recognition — {honour.year}</p>

      <h2 id="honour-heading" className="u-title u-mask max-w-[16ch]">
        <span className="u-rise block">{honour.title}</span>
      </h2>

      <p className="u-fade u-measure mt-[calc(var(--vsq)*3)] text-[var(--paper-muted)]">
        {honour.detail}
      </p>

      <dl
        data-stagger
        className="mt-[calc(var(--vsq)*6)] grid grid-cols-2 gap-y-[calc(var(--vsq)*4)] border-t border-[var(--line)] pt-[calc(var(--vsq)*4)] md:grid-cols-4"
      >
        {honour.figures.map((f, i) => (
          <div key={f.label} className="u-fade" style={{ "--i": i } as React.CSSProperties}>
            <dt className="sr-only">{f.label}</dt>
            <dd>
              <span className="u-display block text-[var(--paper)]" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
                {f.value}
              </span>
              <span className="u-meta mt-[calc(var(--vsq)*1.5)] block max-w-[14ch]">{f.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
