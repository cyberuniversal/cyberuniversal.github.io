import { Reveal } from "./Reveal";
import { profile } from "@/data/portfolio";
import { pt } from "@/lib/svg";

const P = "var(--paper)";

/**
 * Symbolic composition standing in for a portrait: an empty study desk with an
 * open manuscript, ink, and a folded map. The brief forbids generating a
 * portrait of Mohammed, and no real one exists in the repository — so the
 * subject is the work, shown by its absence.
 * TODO(mohammed): drop a real portrait at /portrait.jpg to replace this.
 */
function DeskArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 720"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <filter id="ab-rough" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="3" seed="4" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="16" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Holds strength across the centre; falls away only at the frame.
            Matches the curve used in ProjectArt — the earlier 0.72-at-58% stop
            dimmed the whole drawing rather than just its edges. */}
        <radialGradient id="ab-vig" cx="50%" cy="52%" r="76%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="62%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="86%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="ab-mask">
          <rect width="640" height="720" fill="url(#ab-vig)" filter="url(#ab-rough)" />
        </mask>
      </defs>

      <g mask="url(#ab-mask)">
        {/* The arch that frames the study */}
        <path
          d="M 90 700 L 90 300 A 230 230 0 0 1 550 300 L 550 700"
          fill="none"
          stroke={P}
          strokeWidth="1.1"
          strokeOpacity="0.42"
        />
        <path
          d="M 128 700 L 128 306 A 192 192 0 0 1 512 306 L 512 700"
          fill="none"
          stroke={P}
          strokeWidth="0.6"
          strokeOpacity="0.22"
        />

        {/* Low desk */}
        <rect x="150" y="470" width="340" height="14" fill="var(--ink)" stroke={P} strokeWidth="1" strokeOpacity="0.6" />
        <line x1="176" y1="484" x2="176" y2="560" stroke={P} strokeWidth="0.9" strokeOpacity="0.45" />
        <line x1="464" y1="484" x2="464" y2="560" stroke={P} strokeWidth="0.9" strokeOpacity="0.45" />

        {/* Open manuscript on a rihal */}
        <g transform="translate(320 452)">
          <path d="M -84 0 L 0 -16 L 84 0 L 0 12 Z" fill="none" stroke={P} strokeWidth="1.2" strokeOpacity="0.8" />
          <line x1="0" y1="-16" x2="0" y2="12" stroke={P} strokeWidth="0.8" strokeOpacity="0.6" />
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i} opacity="0.3">
              <line x1={-74 + i * 3} y1={-4 + i * 2.6} x2={-16} y2={-9 + i * 2.6} stroke={P} strokeWidth="1.2" />
              <line x1={16} y1={-9 + i * 2.6} x2={74 - i * 3} y2={-4 + i * 2.6} stroke={P} strokeWidth="1.2" />
            </g>
          ))}
          {/* Rihal legs, crossed */}
          <line x1="-40" y1="8" x2="40" y2="44" stroke={P} strokeWidth="1" strokeOpacity="0.55" />
          <line x1="40" y1="8" x2="-40" y2="44" stroke={P} strokeWidth="1" strokeOpacity="0.55" />
        </g>

        {/* Inkwell + reed pen */}
        <g transform="translate(196 452)" opacity="0.65">
          <path d="M -13 18 L -10 0 L 10 0 L 13 18 Z" fill="none" stroke={P} strokeWidth="1" />
          <ellipse cx="0" cy="0" rx="10" ry="3.4" fill="none" stroke={P} strokeWidth="0.9" />
          <line x1="4" y1="-2" x2="34" y2="-46" stroke={P} strokeWidth="1.1" />
        </g>

        {/* Folded map, propped */}
        <g transform="translate(448 440)" opacity="0.5">
          <path d="M -34 30 L -34 -18 L 0 -26 L 34 -14 L 34 30 L 0 22 Z" fill="none" stroke={P} strokeWidth="0.9" />
          <line x1="0" y1="-26" x2="0" y2="22" stroke={P} strokeWidth="0.5" />
          <path d="M -26 6 C -12 -6, 8 12, 26 -2" fill="none" stroke={P} strokeWidth="0.6" strokeDasharray="3 3" />
        </g>

        {/* Stacked books beside the desk */}
        <g transform="translate(150 560)" opacity="0.5">
          {[0, 11, 22].map((y, i) => (
            <rect key={y} x={-4 + i * 2} y={-y} width={72 - i * 5} height="9" fill="none" stroke={P} strokeWidth="0.8" />
          ))}
        </g>

        {/* Star chart pinned in the arch */}
        <g transform="translate(320 232)" opacity="0.3">
          <circle r="72" fill="none" stroke={P} strokeWidth="0.7" />
          <circle r="46" fill="none" stroke={P} strokeWidth="0.5" />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const [x1, y1] = pt(0, 0, 46, a);
            const [x2, y2] = pt(0, 0, 72, a);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={P} strokeWidth="0.5" />;
          })}
          {[[18, -30], [-38, 12], [26, 34], [-14, -50]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.6" fill={P} opacity="0.9" />
          ))}
        </g>
      </g>
    </svg>
  );
}

export function About() {
  return (
    <Reveal
      as="section"
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-[var(--line)] px-[var(--edge)] py-[var(--section-y)]"
    >
      <div className="grid items-center gap-[calc(var(--vsq)*6)] lg:grid-cols-[0.85fr_1fr]">
        {/* Aspect matches the 640×720 viewBox so the framing arch isn't sliced. */}
        <div className="relative aspect-[640/720] w-full">
          <DeskArt />
        </div>

        <div>
          <p className="u-meta mb-[calc(var(--vsq)*3)]">About</p>
          <h2 id="about-heading" className="u-title u-mask">
            <span className="u-rise block">Mohammed</span>
          </h2>

          <div className="u-fade u-measure mt-[calc(var(--vsq)*3.5)] space-y-[calc(var(--vsq)*2)] text-[var(--paper-muted)]">
            <p>
              I&rsquo;m an AI researcher and technical founder in{" "}
              <span className="text-[var(--paper)]">Riyadh</span>, working on
              autonomous systems and mission-driven software.
            </p>
            <p>
              Most of my work starts from the same question: how do you give a
              machine an instruction in ordinary language and still be able to
              say, afterwards, exactly why it did what it did? That question runs
              through Shepherd-AI, and it&rsquo;s why the systems I build keep a
              person in the loop by design rather than as a fallback.
            </p>
            <p>
              I build in the open where I can, and I care that the things I ship
              are useful to someone who isn&rsquo;t me — a student looking for a
              lesson, a family watching a glucose monitor at 3am, a researcher
              trying to get their first paper read.
            </p>
            <p>
              The historical thread through this site isn&rsquo;t decoration. The
              scholars of this civilization built methods for holding knowledge
              to account: chains of transmission, collation, marginal correction,
              the habit of recording what you actually observed. That&rsquo;s the
              same discipline good engineering asks for, and I find it useful to
              remember that it isn&rsquo;t new.
            </p>
          </div>

          <div className="u-draw u-rule mt-[calc(var(--vsq)*4)]" />
          <p className="u-meta mt-[calc(var(--vsq)*2)]">{profile.positioning}</p>
        </div>
      </div>
    </Reveal>
  );
}
