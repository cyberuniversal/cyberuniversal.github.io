/**
 * Hero composition — original SVG. Nothing traced, copied, or AI-generated.
 *
 * Architecture is deliberately Andalusi/Umayyad rather than generic "mosque":
 * horseshoe arches on slender columns (the Córdoba arcade), square-shaft
 * minarets (Maghrebi/Andalusi form, not Ottoman pencil minarets), flat
 * crenellated wall lines. Astronomical rings and route linework are drawn in the
 * same ink weight and sit inside the same fade, so the historical and technical
 * layers read as one world instead of an overlay.
 */

import { n, pt, poly } from "@/lib/svg";

const ARCH_COUNT = 9;

/**
 * A true horseshoe arch.
 *
 * The curve does not stop at the semicircle: it continues past the horizontal
 * diameter by `PHI` before returning to the impost, so the arch's widest point
 * sits *below* the springline and the jambs tuck inward under it. That overshoot
 * is the defining trait of the Córdoba arcade — a plain semicircle on two legs
 * reads as a tombstone, not as Andalusi architecture.
 */
const PHI = (28 * Math.PI) / 180; // overshoot below the springline

function horseshoe(cx: number, springY: number, r: number, baseY: number): string {
  const dx = r * Math.cos(PHI); // half-width at the impost (narrower than r)
  const dy = r * Math.sin(PHI); // how far the curve drops below the springline
  const lx = n(cx - dx), rx = n(cx + dx), ey = n(springY + dy);
  return [
    `M ${lx} ${n(baseY)}`,
    `L ${lx} ${ey}`,
    // large-arc=1, sweep=1 → travels left ▸ top ▸ right, i.e. over 180°
    `A ${n(r)} ${n(r)} 0 1 1 ${rx} ${ey}`,
    `L ${rx} ${n(baseY)}`,
  ].join(" ");
}

function Arcade({
  y,
  h,
  count,
  opacity,
  fill = true,
}: {
  y: number;
  h: number;
  count: number;
  opacity: number;
  fill?: boolean;
}) {
  const span = 1600 / count;
  const r = span * 0.34;
  const springY = y + h * 0.3;
  const baseY = y + h;

  return (
    <g opacity={opacity}>
      {Array.from({ length: count }).map((_, i) => {
        const cx = span * i + span / 2;
        const d = horseshoe(cx, springY, r, baseY);
        return (
          <g key={i}>
            {/* The void inside the arch is darker than the sky behind it —
                this is what makes the arcade read as depth, not outline. */}
            {fill && <path d={d} fill="var(--ink)" fillOpacity="0.55" stroke="none" />}
            <path d={d} fill="none" stroke="var(--paper)" strokeWidth="1.2" />
            {/* Impost blocks where the arch meets the column */}
            <rect
              x={n(cx - r * Math.cos(PHI) - 4)}
              y={n(springY + r * Math.sin(PHI))}
              width="8"
              height="5"
              fill="var(--paper)"
              opacity="0.34"
            />
            <rect
              x={n(cx + r * Math.cos(PHI) - 4)}
              y={n(springY + r * Math.sin(PHI))}
              width="8"
              height="5"
              fill="var(--paper)"
              opacity="0.34"
            />
          </g>
        );
      })}
    </g>
  );
}

function Minaret({ x, base, h, w }: { x: number; base: number; h: number; w: number }) {
  return (
    <g>
      {/* Square shaft — solid against the horizon glow, with a lit edge on the
          side facing the light so it reads as mass rather than outline. */}
      <rect x={x} y={n(base - h)} width={w} height={h} fill="var(--ink)" stroke="var(--paper)" strokeWidth="1" strokeOpacity="0.55" />
      <line x1={n(x + w)} y1={n(base - h)} x2={n(x + w)} y2={base} stroke="var(--paper)" strokeWidth="1.4" strokeOpacity="0.32" />
      {/* Set-back upper lantern */}
      <rect x={n(x + w * 0.18)} y={n(base - h - w * 0.72)} width={n(w * 0.64)} height={n(w * 0.72)} fill="var(--ink)" stroke="var(--paper)" strokeWidth="1" strokeOpacity="0.55" />
      {/* Crenellation */}
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={i} x={x + (w / 4) * i + w * 0.04} y={base - h - w * 0.86} width={w * 0.14} height={w * 0.14} fill="var(--paper)" opacity="0.32" />
      ))}
      {/* Blind arch on the shaft face */}
      <path
        d={`M ${x + w * 0.3} ${base - h * 0.42} L ${x + w * 0.3} ${base - h * 0.58} A ${w * 0.2} ${w * 0.2} 0 0 1 ${x + w * 0.7} ${base - h * 0.58} L ${x + w * 0.7} ${base - h * 0.42}`}
        fill="none"
        stroke="var(--paper)"
        strokeWidth="0.9"
        strokeOpacity="0.4"
      />
    </g>
  );
}

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Irregular fade into the page — not a clean rectangle edge */}
        <filter id="h-rough" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="11" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Halftone: threshold the art into dots for a printed/lithograph read */}
        <filter id="h-halftone" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="3" result="grain" />
          <feColorMatrix in="grain" type="saturate" values="0" result="g2" />
          <feBlend in="SourceGraphic" in2="g2" mode="multiply" />
        </filter>

        <linearGradient id="h-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ink)" />
          <stop offset="55%" stopColor="var(--teal-black)" />
          <stop offset="100%" stopColor="var(--ink)" />
        </linearGradient>

        {/* Horizon glow: the light the city is seen against. Without a lighter
            band behind them, silhouettes have nothing to read against and the
            whole composition flattens into wireframe. */}
        <radialGradient id="h-horizon" cx="46%" cy="74%" r="58%">
          <stop offset="0%" stopColor="var(--oxidized-teal)" stopOpacity="0.85" />
          <stop offset="55%" stopColor="var(--oxidized-teal)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--oxidized-teal)" stopOpacity="0" />
        </radialGradient>

        {/* Everything fades out at the frame edges and toward the bottom */}
        <radialGradient id="h-vig" cx="50%" cy="52%" r="72%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="62%" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        {/* Kills the last ~14% of the frame so the arcade dissolves into the
            page instead of running under the footer metadata row, which sits
            at this height and needs clean ground to stay legible. */}
        <linearGradient id="h-basefade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="78%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="1" />
        </linearGradient>
        <mask id="h-mask">
          <rect width="1600" height="900" fill="url(#h-vig)" filter="url(#h-rough)" />
          <rect width="1600" height="900" fill="url(#h-basefade)" />
        </mask>

        <linearGradient id="h-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--oxidized-teal)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--ink)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#h-sky)" />

      <g mask="url(#h-mask)">
        {/* ---- Astronomical layer: astrolabe rete rings, off-centre ---- */}
        <g transform="translate(1180 300)" opacity="0.5">
          {[210, 168, 126, 84].map((r, i) => (
            <circle key={r} r={r} fill="none" stroke="var(--paper)" strokeWidth={i === 0 ? 1.2 : 0.7} strokeOpacity={0.5 - i * 0.07} />
          ))}
          {/* Ecliptic ring, offset — as on a real rete */}
          <circle cx="0" cy="-54" r="104" fill="none" stroke="var(--paper)" strokeWidth="0.9" strokeOpacity="0.42" />
          {/* Alidade */}
          <line x1="-210" y1="0" x2="210" y2="0" stroke="var(--paper)" strokeWidth="0.7" strokeOpacity="0.34" />
          <line x1="0" y1="-210" x2="0" y2="210" stroke="var(--paper)" strokeWidth="0.7" strokeOpacity="0.34" />
          {/* Degree ticks */}
          {Array.from({ length: 72 }).map((_, i) => {
            const a = (i / 72) * Math.PI * 2;
            const r1 = 210, r2 = i % 6 === 0 ? 192 : 201;
            const [x1, y1] = pt(0, 0, r1, a);
            const [x2, y2] = pt(0, 0, r2, a);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--paper)"
                strokeWidth="0.6"
                strokeOpacity="0.34"
              />
            );
          })}
        </g>

        {/* ---- Star field ---- */}
        {Array.from({ length: 46 }).map((_, i) => {
          // Golden-angle scatter: deterministic, no Math.random, quantised for SSR parity.
          const x = n((i * 137.508) % 1600);
          const y = n(((i * 71.3) % 380) + 30);
          return <circle key={i} cx={x} cy={y} r={i % 7 === 0 ? 1.5 : 0.8} fill="var(--paper)" opacity={n(0.14 + (i % 5) * 0.05)} />;
        })}

        {/* ---- Geometric construction: 8-fold star, faint, as a diagram ---- */}
        <g transform="translate(300 250)" opacity="0.22">
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const [x2, y2] = pt(0, 0, 150, a);
            return <line key={i} x1={0} y1={0} x2={x2} y2={y2} stroke="var(--paper)" strokeWidth="0.6" />;
          })}
          <polygon
            points={Array.from({ length: 8 })
              .map((_, i) => poly(0, 0, 150, (i / 8) * Math.PI * 2 - Math.PI / 8))
              .join(" ")}
            fill="none"
            stroke="var(--paper)"
            strokeWidth="0.7"
          />
          <polygon
            points={Array.from({ length: 8 })
              .map((_, i) => poly(0, 0, 150, (i / 8) * Math.PI * 2))
              .join(" ")}
            fill="none"
            stroke="var(--paper)"
            strokeWidth="0.7"
          />
          <circle r="150" fill="none" stroke="var(--paper)" strokeWidth="0.5" strokeOpacity="0.6" />
        </g>

        {/* ---- Horizon: the light the city is read against ---- */}
        <rect x="0" y="440" width="1600" height="460" fill="url(#h-horizon)" />

        {/* ---- Distant city ----
             Pushed into the lower quarter and kept small. The hero type is
             full-bleed, so the architecture has to sit *under* it as
             atmosphere; at any larger scale it fights the name and the
             crenellation reads as a hard rule through the paragraph. */}
        <g opacity="0.8">
          {/* Wall as a soft mass, no crenellation ticks — a dashed horizontal
              band at this height cuts straight through the supporting text. */}
          <rect x="0" y="742" width="1600" height="26" fill="var(--ink)" stroke="var(--paper)" strokeWidth="0.7" strokeOpacity="0.28" />
          <Minaret x={214} base={742} h={78} w={28} />
          <Minaret x={1298} base={742} h={62} w={24} />
          <Minaret x={742} base={742} h={96} w={32} />
          {/* A dome beside the great minaret — mass, not outline */}
          <g>
            <path d="M 952 742 L 952 720 A 32 32 0 0 1 1016 720 L 1016 742 Z" fill="var(--ink)" stroke="var(--paper)" strokeWidth="0.8" strokeOpacity="0.42" />
            <line x1="984" y1="688" x2="984" y2="678" stroke="var(--paper)" strokeWidth="0.9" strokeOpacity="0.5" />
          </g>
        </g>

        {/* ---- Route layer: drawn on the plain BEFORE the arcade, so it reads
             through the arch openings and is occluded by the columns ---- */}
        <g opacity="0.62">
          <path
            d="M 120 726 C 380 686, 560 748, 806 706 S 1260 668, 1500 700"
            fill="none"
            stroke="var(--paper)"
            strokeWidth="1"
            strokeOpacity="0.6"
            strokeDasharray="7 6"
          />
          <path
            d="M 90 742 C 420 712, 690 756, 980 722 S 1380 694, 1540 716"
            fill="none"
            stroke="var(--paper)"
            strokeWidth="0.8"
            strokeOpacity="0.34"
            strokeDasharray="2 7"
          />
          {/* Waypoint nodes — surveyor's marks, not UI dots */}
          {[
            [120, 726],
            [420, 700],
            [806, 706],
            [1140, 678],
            [1500, 700],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="4.5" fill="none" stroke="var(--paper)" strokeWidth="1" strokeOpacity="0.75" />
              <line x1={x} y1={y - 9} x2={x} y2={y + 9} stroke="var(--paper)" strokeWidth="0.7" strokeOpacity="0.55" />
              <line x1={x - 9} y1={y} x2={x + 9} y2={y} stroke="var(--paper)" strokeWidth="0.7" strokeOpacity="0.55" />
            </g>
          ))}
        </g>

        {/* ---- Foreground arcade: a denser, smaller colonnade along the base.
             ARCH_COUNT=9 across 1600 gave ~160px arches that read as a fence;
             at 18 the rhythm reads as architecture and stays subordinate. ---- */}
        <Arcade y={768} h={96} count={ARCH_COUNT * 2} opacity={0.72} />

        {/* ---- Ground ---- */}
        <rect x="0" y="864" width="1600" height="36" fill="url(#h-ground)" />

        {/* ---- Latitude/longitude graticule, very faint ---- */}
        <g opacity="0.1">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 200} y1="0" x2={i * 200} y2="900" stroke="var(--paper)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 225} x2="1600" y2={i * 225} stroke="var(--paper)" strokeWidth="0.5" />
          ))}
        </g>
      </g>
    </svg>
  );
}
