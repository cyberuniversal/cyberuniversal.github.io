import { Reveal } from "./Reveal";
import { ledger } from "@/data/portfolio";

/**
 * Experience as an archival ledger: indexed rows and thin rules. Explicitly not
 * the standard vertical timeline with coloured circles and connectors.
 *
 * Period/place columns render only where the brief states a real value, so the
 * ledger currently carries roles without dates rather than invented ones.
 */
export function Ledger() {
  return (
    <Reveal
      as="section"
      aria-labelledby="ledger-heading"
      className="border-t border-[var(--line)] px-[var(--edge)] py-[var(--section-y)]"
    >
      <div className="mb-[calc(var(--vsq)*5)] flex items-baseline justify-between gap-6">
        <h2 id="ledger-heading" className="u-title u-mask">
          <span className="u-rise block">Ledger</span>
        </h2>
        <p className="u-meta shrink-0">Experience &amp; recognition</p>
      </div>

      <ul data-stagger>
        {ledger.map((row, i) => (
          <li
            key={row.index}
            className="u-fade border-t border-[var(--line)] last:border-b"
            style={{ "--i": i } as React.CSSProperties}
          >
            <div className="grid gap-x-[calc(var(--vsq)*4)] gap-y-1 py-[calc(var(--vsq)*3)] md:grid-cols-[4rem_1fr_1fr_auto] md:items-baseline">
              <span className="u-meta">{row.index}</span>
              <span className="font-[family-name:var(--font-display)] text-[clamp(1.15rem,1.9vw,1.6rem)] leading-tight">
                {row.title}
              </span>
              {row.org && <span className="u-meta !text-[var(--paper)]">{row.org}</span>}
              {row.period && <span className="u-meta">{row.period}</span>}
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
