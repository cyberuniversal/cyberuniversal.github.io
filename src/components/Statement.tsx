import { Reveal } from "./Reveal";
import { pt, poly } from "@/lib/svg";

/**
 * Editorial statement with heavy negative space. Not a card — the text sits
 * directly on the page against a faint geometric construction.
 */
export function Statement() {
  return (
    <Reveal
      as="section"
      className="relative px-[var(--edge)] py-[var(--section-y)]"
      aria-labelledby="statement-heading"
    >
      {/* Faint construction diagram, bled off the right edge */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-14vw] z-0 h-[46vw] w-[46vw] -translate-y-1/2 opacity-[0.13]"
        viewBox="-160 -160 320 320"
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const [x2, y2] = pt(0, 0, 150, (i / 12) * Math.PI * 2);
          return (
            <line
              key={i}
              x1={0}
              y1={0}
              x2={x2}
              y2={y2}
              stroke="var(--paper)"
              strokeWidth="0.5"
            />
          );
        })}
        {[150, 112, 74].map((r) => (
          <circle key={r} r={r} fill="none" stroke="var(--paper)" strokeWidth="0.6" />
        ))}
        <polygon
          points={Array.from({ length: 6 })
            .map((_, i) => poly(0, 0, 150, (i / 6) * Math.PI * 2))
            .join(" ")}
          fill="none"
          stroke="var(--paper)"
          strokeWidth="0.7"
        />
      </svg>

      <div className="relative z-10 grid gap-[calc(var(--vsq)*4)] lg:grid-cols-[1fr_auto]">
        <div className="max-w-[22ch]">
          <p className="u-meta mb-[calc(var(--vsq)*3)]">Statement</p>
          <h2
            id="statement-heading"
            className="u-display"
            style={{ fontSize: "var(--fs-statement)" }}
          >
            <span className="u-mask">
              <span className="u-rise block">I work at</span>
            </span>
            <span className="u-mask">
              <span className="u-rise block">the point where</span>
            </span>
            <span className="u-mask">
              <span className="u-rise block">language, autonomy,</span>
            </span>
            <span className="u-mask">
              <span className="u-rise block">and real-world</span>
            </span>
            <span className="u-mask">
              <span className="u-rise block">systems meet.</span>
            </span>
          </h2>
        </div>

        <div className="u-fade u-measure self-end lg:max-w-[38ch]">
          <p className="text-[var(--paper-muted)]">
            My work is about turning intent into action that holds up outside a
            demo: language models that plan, systems that stay under human
            control, and software built for consequences rather than screenshots.
          </p>
          <p className="mt-[calc(var(--vsq)*2)] text-[var(--paper-muted)]">
            The same instinct runs through everything here — that careful method,
            recorded honestly and checked by someone else, is what makes
            knowledge worth building on.
          </p>
          <div className="u-draw u-rule mt-[calc(var(--vsq)*4)]" />
          <p className="u-meta mt-[calc(var(--vsq)*2)]">
            Riyadh, Saudi Arabia — <span className="u-arabic inline-block align-middle text-[1.05em]">الرياض</span>
          </p>
        </div>
      </div>
    </Reveal>
  );
}
