import { Reveal } from "./Reveal";
import { n, pt } from "@/lib/svg";

/**
 * Interstitial between project runs. Deliberately secondary: a band, not a
 * viewport — the brief warns against turning the portfolio into a history
 * textbook. Type is small and mono; the image carries it.
 */

const P = "var(--paper)";

/* Córdoba — the Mezquita's doubled horseshoe arcade, in elevation. */
function CordobaArt() {
  return (
    <g>
      {Array.from({ length: 7 }).map((_, i) => {
        const cx = 114 + i * 172;
        const r = 62;
        return (
          <g key={i} opacity={0.62 - Math.abs(i - 3) * 0.06}>
            {/* Lower horseshoe */}
            <path
              d={`M ${cx - r} 300 L ${cx - r} 210 A ${r} ${r} 0 0 1 ${cx + r} 210 L ${cx + r} 300`}
              fill="none"
              stroke={P}
              strokeWidth="1.1"
            />
            {/* Upper semicircular tier — the two-tier Córdoba system */}
            <path
              d={`M ${cx - r} 176 A ${r} ${r} 0 0 1 ${cx + r} 176`}
              fill="none"
              stroke={P}
              strokeWidth="0.9"
              strokeOpacity="0.7"
            />
            {/* Voussoir marks — the alternating stone/brick rhythm, as ticks */}
            {Array.from({ length: 11 }).map((_, k) => {
              const a = Math.PI + (k / 10) * Math.PI;
              const [x1, y1] = pt(cx, 210, r - 9, a);
              const [x2, y2] = pt(cx, 210, r + 9, a);
              return (
                <line
                  key={k}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={P}
                  strokeWidth={k % 2 === 0 ? 1.4 : 0.6}
                  strokeOpacity={k % 2 === 0 ? 0.5 : 0.25}
                />
              );
            })}
            <rect x={cx - r - 4} y={300} width="8" height="60" fill={P} opacity="0.12" />
          </g>
        );
      })}
    </g>
  );
}

/* Baghdad — the Round City: concentric walls, four gates, radial roads. */
function BaghdadArt() {
  return (
    <g transform="translate(600 190)">
      {[188, 150, 104, 58].map((r, i) => (
        <circle key={r} r={r} fill="none" stroke={P} strokeWidth={i === 0 ? 1.2 : 0.7} strokeOpacity={0.55 - i * 0.07} />
      ))}
      {/* Four gates on the diagonals, as the sources describe */}
      {[45, 135, 225, 315].map((deg) => {
        const a = (deg * Math.PI) / 180;
        const [ix, iy] = pt(0, 0, 58, a);
        const [gx, gy] = pt(0, 0, 188, a);
        return (
          <g key={deg}>
            <line x1={ix} y1={iy} x2={gx} y2={gy} stroke={P} strokeWidth="0.8" strokeOpacity="0.45" />
            <rect
              x={n(Number(gx) - 7)}
              y={n(Number(gy) - 7)}
              width="14"
              height="14"
              fill="var(--ink)"
              stroke={P}
              strokeWidth="1"
              strokeOpacity="0.8"
              transform={`rotate(${deg} ${gx} ${gy})`}
            />
          </g>
        );
      })}
      <circle r="18" fill="none" stroke={P} strokeWidth="1" strokeOpacity="0.7" />
      {Array.from({ length: 48 }).map((_, i) => {
        const a = (i / 48) * Math.PI * 2;
        const [x1, y1] = pt(0, 0, 182, a);
        const [x2, y2] = pt(0, 0, 188, a);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={P} strokeWidth="0.6" strokeOpacity="0.3" />;
      })}
    </g>
  );
}

/* Damascus — the Umayyad courtyard plan with its prayer-hall aisles. */
function DamascusArt() {
  return (
    <g opacity="0.6">
      <rect x="220" y="60" width="760" height="300" fill="none" stroke={P} strokeWidth="1.1" strokeOpacity="0.6" />
      {/* Prayer hall: three aisles parallel to the qibla wall */}
      <rect x="220" y="248" width="760" height="112" fill={P} fillOpacity="0.03" stroke={P} strokeWidth="0.7" strokeOpacity="0.4" />
      {[276, 304, 332].map((y) => (
        <line key={y} x1="228" y1={y} x2="972" y2={y} stroke={P} strokeWidth="0.5" strokeOpacity="0.3" />
      ))}
      {/* Transept + dome on the central axis */}
      <line x1="600" y1="248" x2="600" y2="360" stroke={P} strokeWidth="0.8" strokeOpacity="0.5" />
      <circle cx="600" cy="304" r="26" fill="none" stroke={P} strokeWidth="0.9" strokeOpacity="0.6" />
      {/* Courtyard arcade columns */}
      {Array.from({ length: 22 }).map((_, i) => (
        <circle key={`t${i}`} cx={232 + i * 34.8} cy={72} r="2.6" fill="none" stroke={P} strokeWidth="0.7" strokeOpacity="0.45" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={`s${i}`}>
          <circle cx={232} cy={96 + i * 26} r="2.6" fill="none" stroke={P} strokeWidth="0.7" strokeOpacity="0.45" />
          <circle cx={968} cy={96 + i * 26} r="2.6" fill="none" stroke={P} strokeWidth="0.7" strokeOpacity="0.45" />
        </g>
      ))}
      {/* Three minarets, in plan */}
      {[[224, 64], [976, 64], [976, 356]].map(([x, y], i) => (
        <rect key={i} x={x - 11} y={y - 11} width="22" height="22" fill="var(--ink)" stroke={P} strokeWidth="1" strokeOpacity="0.75" />
      ))}
    </g>
  );
}

const ART = { Córdoba: CordobaArt, Baghdad: BaghdadArt, Damascus: DamascusArt } as const;

export function ArchiveBreak({
  code,
  title,
  arabic,
}: {
  code: string;
  title: keyof typeof ART;
  arabic: string;
}) {
  const Art = ART[title];

  return (
    <Reveal
      as="aside"
      aria-label={`${code} — ${title}`}
      className="relative overflow-hidden border-t border-[var(--line)]"
    >
      {/* Aspect-locked to the viewBox (1200:380). With a fixed height the slice
          crop cut the Round City's gates and the Damascus plan off at top and
          bottom; matching the ratio means the drawing is never truncated at any
          width, and it thins into a quiet archival band on mobile. */}
      <div className="relative aspect-[1200/380] w-full">
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 380"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full opacity-85"
        >
          <defs>
            <filter id={`ab-${title}-rough`} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="3" seed="9" result="t" />
              <feDisplacementMap in="SourceGraphic" in2="t" scale="14" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <linearGradient id={`ab-${title}-fade`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="26%" stopColor="#fff" stopOpacity="0.95" />
              <stop offset="72%" stopColor="#fff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id={`ab-${title}-mask`}>
              <rect width="1200" height="380" fill={`url(#ab-${title}-fade)`} filter={`url(#ab-${title}-rough)`} />
            </mask>
          </defs>
          <g mask={`url(#ab-${title}-mask)`}>
            <Art />
          </g>
        </svg>

        {/* Label strip — archival, quiet, sits on the rule */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-[var(--edge)] pb-[calc(var(--vsq)*2.5)]">
          <p className="u-meta">{code}</p>
          <p className="u-meta !text-[var(--paper)]">{title}</p>
          <p className="u-arabic text-[1.15rem] text-[var(--muted-teal)]">{arabic}</p>
        </div>
      </div>
    </Reveal>
  );
}
