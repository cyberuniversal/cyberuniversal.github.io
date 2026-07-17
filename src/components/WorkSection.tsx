import { Reveal } from "./Reveal";
import { Plate } from "./Plate";
import { ShepherdArt } from "./art/ShepherdArt";
import type { Work } from "@/data/portfolio";

/**
 * One venture, composed like a Hermes feature block: mono kicker with its index,
 * a display headline, body, then the metadata ledger. The flagship gets a full
 * viewport with the plate as its ground and the mission diagram drawn over it.
 */
export function WorkSection({ item, index }: { item: Work; index: number }) {
  const flagship = Boolean(item.flagship);
  const artFirst = index % 2 === 1;

  return (
    <Reveal
      as="article"
      id={item.id}
      aria-labelledby={`${item.id}-title`}
      className={`relative border-t border-[var(--line)] px-[var(--edge)] ${
        flagship ? "min-h-[94svh] py-[calc(var(--section-y)*1.05)]" : "py-[var(--section-y)]"
      }`}
    >
      {flagship && (
        <div className="pointer-events-none absolute inset-0 z-0">
          {item.plate && (
            <Plate src={item.plate.src} alt="" className="h-full w-full" opacity={0.5} />
          )}
          <div className="absolute inset-0 opacity-70">
            <ShepherdArt className="h-full w-full" />
          </div>
        </div>
      )}

      <span
        aria-hidden="true"
        className="u-display pointer-events-none absolute top-[calc(var(--section-y)*0.35)] right-[var(--edge)] z-0 select-none text-[var(--paper)] opacity-[0.06]"
        style={{ fontSize: "clamp(6rem, 18vw, 18rem)", lineHeight: 0.8 }}
      >
        {item.number}
      </span>

      <div
        className={
          flagship
            ? "relative z-10 flex min-h-[74svh] flex-col justify-end"
            : "relative z-10 grid items-center gap-[calc(var(--vsq)*5)] lg:grid-cols-2"
        }
      >
        {!flagship && item.plate && (
          <div className={artFirst ? "lg:order-1" : "lg:order-2"}>
            <div className="group relative aspect-[4/3] overflow-hidden">
              <Plate
                src={item.plate.src}
                alt={item.plate.alt}
                className="h-full w-full transition-transform duration-[1400ms] ease-[var(--ease-cine)] group-hover:scale-[1.03]"
              />
            </div>
          </div>
        )}

        <div className={flagship ? "" : artFirst ? "lg:order-2" : "lg:order-1"}>
          <div className="mb-[calc(var(--vsq)*2.5)] flex items-baseline gap-4">
            <span className="u-meta !text-[var(--paper)]">
              #{item.number} {item.kicker}
            </span>
            <div className="u-draw u-rule flex-1" />
            <span className="u-meta shrink-0">{item.period}</span>
          </div>

          <h2 id={`${item.id}-title`} className="u-title u-mask">
            <span className="u-rise block">{item.name}</span>
          </h2>

          <p className="u-fade mt-[calc(var(--vsq)*2)] font-[family-name:var(--font-display)] text-[clamp(1.15rem,2.1vw,1.9rem)] leading-[1.2] text-[var(--paper)]">
            {item.headline}
          </p>

          <p className="u-fade u-measure mt-[calc(var(--vsq)*2.5)] text-[var(--paper-muted)]">
            {item.body}
          </p>

          <dl className="u-fade mt-[calc(var(--vsq)*4)] flex flex-wrap gap-x-[calc(var(--vsq)*5)] gap-y-[calc(var(--vsq)*1.5)]">
            <div>
              <dt className="u-meta">Role</dt>
              <dd className="u-meta !text-[var(--paper)]">{item.role}</dd>
            </div>
            {item.org && (
              <div>
                <dt className="u-meta">Org</dt>
                <dd className="u-meta !text-[var(--paper)]">{item.org}</dd>
              </div>
            )}
            <div>
              <dt className="u-meta">Location</dt>
              <dd className="u-meta !text-[var(--paper)]">{item.place}</dd>
            </div>
          </dl>

          {item.tech.length > 0 && (
            <ul className="u-fade mt-[calc(var(--vsq)*2.5)] flex flex-wrap gap-x-[calc(var(--vsq)*2)] gap-y-1">
              {item.tech.map((t) => (
                <li key={t} className="u-meta before:mr-[calc(var(--vsq)*2)] before:content-['/'] first:before:content-['']">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Reveal>
  );
}
