/**
 * Project artwork — five original SVG compositions sharing one grammar:
 * hairline ivory ink on dark teal, surveyor's marks, an irregular fade, and no
 * fills heavier than 0.2 opacity. Each places the project's modern subject
 * inside its historical lineage rather than decorating it with one.
 *
 * All original. No traced, museum, stock, or AI-generated source material.
 */

import { n, pt, poly } from "@/lib/svg";

const P = "var(--paper)";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-rough`} x="-25%" y="-25%" width="150%" height="150%">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="5" result="t" />
        <feDisplacementMap in="SourceGraphic" in2="t" scale="18" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* Holds near-full strength across the centre and only falls away at the
          frame. The earlier 0.7-at-60% curve dimmed the whole drawing, not just
          its edges, and the art read as washed out rather than fading. */}
      <radialGradient id={`${id}-vig`} cx="50%" cy="50%" r="74%">
        <stop offset="0%" stopColor="#fff" stopOpacity="1" />
        <stop offset="62%" stopColor="#fff" stopOpacity="0.95" />
        <stop offset="86%" stopColor="#fff" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <mask id={`${id}-mask`}>
        <rect width="800" height="600" fill={`url(#${id}-vig)`} filter={`url(#${id}-rough)`} />
      </mask>
    </defs>
  );
}

type ArtProps = { className?: string };

const svgProps = {
  viewBox: "0 0 800 600",
  preserveAspectRatio: "xMidYMid slice",
  "aria-hidden": true as const,
  focusable: "false" as const,
};

/* ── 01 Shepherd-AI ──────────────────────────────────────────────
   Old strategic cartography: terrain contours, watchtowers on ridges,
   routes between them. The autonomy layer (mission boundary, task
   allocation, waypoints) is drawn in the same surveyor's hand.        */
export function ShepherdArt({ className }: ArtProps) {
  const towers: [number, number][] = [
    [120, 350],
    [372, 268],
    [640, 330],
  ];
  return (
    <svg className={className} {...svgProps}>
      <Defs id="sh" />
      <g mask="url(#sh-mask)">
        {/* Terrain contours */}
        {Array.from({ length: 11 }).map((_, i) => (
          <path
            key={i}
            d={`M -40 ${430 + i * 22} C 150 ${386 + i * 20}, 300 ${470 + i * 18}, 470 ${418 + i * 21} S 720 ${372 + i * 19}, 850 ${408 + i * 22}`}
            fill="none"
            stroke={P}
            strokeWidth="0.7"
            strokeOpacity={0.34 - i * 0.02}
          />
        ))}

        {/* Mission boundary — a surveyed polygon, not a UI rectangle */}
        <polygon
          points="96,240 336,176 664,222 700,404 402,470 120,406"
          fill={P}
          fillOpacity="0.04"
          stroke={P}
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeDasharray="10 7"
        />

        {/* Watchtowers */}
        {towers.map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 9} y={y - 46} width="18" height="46" fill="var(--ink)" stroke={P} strokeWidth="0.9" strokeOpacity="0.62" />
            <rect x={x - 13} y={y - 56} width="26" height="10" fill="var(--ink)" stroke={P} strokeWidth="0.8" strokeOpacity="0.5" />
            {Array.from({ length: 3 }).map((_, k) => (
              <rect key={k} x={x - 11 + k * 8} y={y - 60} width="4" height="4" fill={P} opacity="0.4" />
            ))}
          </g>
        ))}

        {/* Routes between towers — the historical problem */}
        <path d="M 120 350 C 220 292, 290 300, 372 268" fill="none" stroke={P} strokeWidth="1" strokeOpacity="0.5" />
        <path d="M 372 268 C 480 246, 566 296, 640 330" fill="none" stroke={P} strokeWidth="1" strokeOpacity="0.5" />

        {/* Task allocation: intent fanning out to agents */}
        <g opacity="0.66">
          {[
            [214, 196],
            [400, 150],
            [560, 190],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1="372" y1="268" x2={x} y2={y} stroke={P} strokeWidth="0.7" strokeOpacity="0.44" strokeDasharray="3 4" />
              {/* Agent glyph: a chevron, read as heading */}
              <path d={`M ${x - 7} ${y + 5} L ${x} ${y - 6} L ${x + 7} ${y + 5}`} fill="none" stroke={P} strokeWidth="1.1" strokeOpacity="0.8" />
              <circle cx={x} cy={y} r="14" fill="none" stroke={P} strokeWidth="0.5" strokeOpacity="0.3" />
            </g>
          ))}
        </g>

        {/* Registration marks */}
        {towers.map(([x, y], i) => (
          <g key={`r${i}`} opacity="0.5">
            <line x1={x - 12} y1={y} x2={x + 12} y2={y} stroke={P} strokeWidth="0.6" />
            <line x1={x} y1={y - 12} x2={x} y2={y + 12} stroke={P} strokeWidth="0.6" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ── 02 Halaqaat ─────────────────────────────────────────────────
   A courtyard seen in plan, with concentric circles of students around
   a single seat. People are marks, never faces.                       */
export function HalaqaatArt({ className }: ArtProps) {
  const rings = [56, 96, 138, 182];
  return (
    <svg className={className} {...svgProps}>
      <Defs id="ha" />
      <g mask="url(#ha-mask)">
        {/* Courtyard plan */}
        <rect x="150" y="70" width="500" height="460" fill="none" stroke={P} strokeWidth="1" strokeOpacity="0.42" />
        <rect x="192" y="112" width="416" height="376" fill="none" stroke={P} strokeWidth="0.6" strokeOpacity="0.26" />

        {/* Arcade columns around the courtyard */}
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={`c${i}`} opacity="0.42">
            <circle cx={192 + (416 / 11) * i} cy={112} r="3" fill="none" stroke={P} strokeWidth="0.8" />
            <circle cx={192 + (416 / 11) * i} cy={488} r="3" fill="none" stroke={P} strokeWidth="0.8" />
          </g>
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={`r${i}`} opacity="0.42">
            <circle cx={192} cy={112 + (376 / 9) * i} r="3" fill="none" stroke={P} strokeWidth="0.8" />
            <circle cx={608} cy={112 + (376 / 9) * i} r="3" fill="none" stroke={P} strokeWidth="0.8" />
          </g>
        ))}

        {/* The halaqa: concentric rings of seated students */}
        <g transform="translate(400 300)">
          {rings.map((r, ri) => {
            const seats = 8 + ri * 6;
            return (
              <g key={r}>
                <circle r={r} fill="none" stroke={P} strokeWidth="0.5" strokeOpacity="0.24" />
                {Array.from({ length: seats }).map((_, i) => {
                  // Offset so the ring opens toward the seat, as a real circle sits
                  const [cx, cy] = pt(0, 0, r, (i / seats) * Math.PI * 2 + 0.18);
                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r="4"
                      fill={P}
                      fillOpacity={n(0.18 - ri * 0.02)}
                      stroke={P}
                      strokeWidth="0.7"
                      strokeOpacity={n(0.6 - ri * 0.1)}
                    />
                  );
                })}
              </g>
            );
          })}
          {/* The seat at the centre: an open book, no figure */}
          <path d="M -16 4 L 0 -3 L 16 4 L 0 9 Z" fill="none" stroke={P} strokeWidth="1.2" strokeOpacity="0.9" />
          <line x1="0" y1="-3" x2="0" y2="9" stroke={P} strokeWidth="0.8" strokeOpacity="0.7" />
        </g>

        {/* A hanging lamp, in elevation, bled at the top */}
        <g transform="translate(400 62)" opacity="0.5">
          <line x1="0" y1="-40" x2="0" y2="4" stroke={P} strokeWidth="0.7" />
          <path d="M -14 4 L 14 4 L 8 22 L -8 22 Z" fill="none" stroke={P} strokeWidth="0.9" />
        </g>
      </g>
    </svg>
  );
}

/* ── 03 Youth Ink Network ────────────────────────────────────────
   A manuscript page: ruled text block, marginalia, correction marks,
   and an index. The network is drawn as correspondence between pages. */
export function YouthInkArt({ className }: ArtProps) {
  return (
    <svg className={className} {...svgProps}>
      <Defs id="yi" />
      <g mask="url(#yi-mask)">
        {/* Two leaves */}
        {[
          [120, 90],
          [430, 140],
        ].map(([x, y], p) => (
          <g key={p} opacity={p === 0 ? 0.85 : 0.55}>
            <rect x={x} y={y} width="250" height="340" fill={P} fillOpacity="0.03" stroke={P} strokeWidth="0.9" strokeOpacity="0.44" />
            {/* Text block frame — the mistara ruling */}
            <rect x={x + 26} y={y + 30} width="198" height="264" fill="none" stroke={P} strokeWidth="0.5" strokeOpacity="0.28" />
            {/* Ruled lines standing in for script — abstract, never fake Arabic */}
            {Array.from({ length: 15 }).map((_, i) => (
              <line
                key={i}
                x1={x + 32}
                y1={y + 44 + i * 17}
                x2={x + 32 + (i % 4 === 3 ? 128 : 186)}
                y2={y + 44 + i * 17}
                stroke={P}
                strokeWidth="1.6"
                strokeOpacity="0.16"
              />
            ))}
            {/* Marginalia */}
            {Array.from({ length: 4 }).map((_, i) => (
              <line key={`m${i}`} x1={x + 232} y1={y + 70 + i * 40} x2={x + 244} y2={y + 70 + i * 40} stroke={P} strokeWidth="1" strokeOpacity="0.34" />
            ))}
            {/* Correction circle — the collation mark */}
            <circle cx={x + 150} cy={y + 146} r="9" fill="none" stroke={P} strokeWidth="0.9" strokeOpacity="0.6" />
          </g>
        ))}

        {/* Correspondence between leaves */}
        <path d="M 372 250 C 400 214, 404 292, 428 262" fill="none" stroke={P} strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="4 4" />
        <circle cx="372" cy="250" r="3.5" fill="none" stroke={P} strokeWidth="0.9" strokeOpacity="0.7" />
        <circle cx="428" cy="262" r="3.5" fill="none" stroke={P} strokeWidth="0.9" strokeOpacity="0.7" />

        {/* Publication index, lower left */}
        <g opacity="0.4">
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i}>
              <line x1="120" y1={470 + i * 15} x2="150" y2={470 + i * 15} stroke={P} strokeWidth="1.4" strokeOpacity="0.5" />
              <line x1="162" y1={470 + i * 15} x2={162 + (i % 3) * 34 + 40} y2={470 + i * 15} stroke={P} strokeWidth="1.4" strokeOpacity="0.28" />
            </g>
          ))}
        </g>

        {/* Reed pen nib */}
        <g transform="translate(660 430) rotate(-38)" opacity="0.55">
          <path d="M 0 0 L 8 -60 L 16 0 L 8 14 Z" fill="none" stroke={P} strokeWidth="0.9" />
          <line x1="8" y1="-60" x2="8" y2="10" stroke={P} strokeWidth="0.6" />
        </g>
      </g>
    </svg>
  );
}

/* ── 04 BiQiyas ──────────────────────────────────────────────────
   Compass-and-straightedge construction with its arcs left visible —
   the method shown, not just the result.                              */
export function BiQiyasArt({ className }: ArtProps) {
  const cx = 400, cy = 300, R = 170;
  return (
    <svg className={className} {...svgProps}>
      <Defs id="bq" />
      <g mask="url(#bq-mask)">
        {/* Construction arcs — the working left on the page */}
        {Array.from({ length: 6 }).map((_, i) => {
          const [ax, ay] = pt(cx, cy, R, (i / 6) * Math.PI * 2);
          return (
            <circle
              key={i}
              cx={ax}
              cy={ay}
              r={R}
              fill="none"
              stroke={P}
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
          );
        })}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={P} strokeWidth="0.8" strokeOpacity="0.5" />

        {/* Resulting hexagonal star */}
        {[0, 1].map((k) => (
          <polygon
            key={k}
            points={Array.from({ length: 3 })
              .map((_, i) => poly(cx, cy, R, (i / 3) * Math.PI * 2 + (k * Math.PI) / 3))
              .join(" ")}
            fill="none"
            stroke={P}
            strokeWidth="1"
            strokeOpacity="0.62"
          />
        ))}

        {/* Radii + degree ticks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const [x1, y1] = pt(cx, cy, i % 6 === 0 ? R - 18 : R - 8, a);
          const [x2, y2] = pt(cx, cy, R, a);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={P}
              strokeWidth="0.6"
              strokeOpacity="0.4"
            />
          );
        })}

        {/* A pair of dividers, open */}
        <g transform="translate(618 130)" opacity="0.5">
          <line x1="0" y1="0" x2="-34" y2="96" stroke={P} strokeWidth="1.1" />
          <line x1="0" y1="0" x2="26" y2="98" stroke={P} strokeWidth="1.1" />
          <circle cx="0" cy="0" r="4" fill="none" stroke={P} strokeWidth="1" />
        </g>

        {/* Measured baseline with units */}
        <g opacity="0.44">
          <line x1="140" y1="530" x2="660" y2="530" stroke={P} strokeWidth="0.9" />
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1={140 + i * 40} y1={530} x2={140 + i * 40} y2={i % 7 === 0 ? 512 : 522} stroke={P} strokeWidth="0.7" />
          ))}
        </g>
      </g>
    </svg>
  );
}

/* ── 05 Glucose Guardian ─────────────────────────────────────────
   A medical manuscript leaf: a botanical study and a vessel, with a
   measured trace and thresholds drawn as the same kind of record.
   The historical diagram is context, never guidance.                  */
export function GlucoseArt({ className }: ArtProps) {
  // Deterministic trace — no Math.random, so SSR and client agree exactly.
  const pts = Array.from({ length: 60 }).map((_, i) => {
    const x = 120 + i * 9.5;
    const w = Math.sin(i * 0.42) * 28 + Math.sin(i * 0.17) * 16 + Math.sin(i * 1.1) * 5;
    const spike = i > 40 && i < 49 ? -Math.sin((i - 40) / 9 * Math.PI) * 62 : 0;
    return [x, 360 + w + spike] as const;
  });
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  return (
    <svg className={className} {...svgProps}>
      <Defs id="gg" />
      <g mask="url(#gg-mask)">
        {/* Leaf frame */}
        <rect x="90" y="70" width="620" height="460" fill={P} fillOpacity="0.02" stroke={P} strokeWidth="0.8" strokeOpacity="0.34" />

        {/* Botanical study, left — a plant drawn as a specimen */}
        <g transform="translate(180 300)" opacity="0.5">
          <path d="M 0 150 C 4 90, -6 40, 0 -40" fill="none" stroke={P} strokeWidth="1.1" />
          {[-10, 24, 58, 92].map((y, i) => {
            const dir = i % 2 === 0 ? 1 : -1;
            return (
              <path
                key={y}
                d={`M 0 ${y} C ${dir * 26} ${y - 16}, ${dir * 44} ${y + 4}, ${dir * 30} ${y + 24} C ${dir * 16} ${y + 18}, ${dir * 6} ${y + 10}, 0 ${y}`}
                fill="none"
                stroke={P}
                strokeWidth="0.8"
              />
            );
          })}
          <circle cx="0" cy="-48" r="9" fill="none" stroke={P} strokeWidth="0.9" />
          {/* Specimen label line */}
          <line x1="14" y1="-48" x2="70" y2="-64" stroke={P} strokeWidth="0.5" strokeOpacity="0.6" />
        </g>

        {/* Pharmacy vessel (albarello), right */}
        <g transform="translate(596 400)" opacity="0.45">
          <path d="M -26 -84 L -22 -66 C -34 -40, -34 -10, -22 14 L -26 30 L 26 30 L 22 14 C 34 -10, 34 -40, 22 -66 L 26 -84 Z" fill="none" stroke={P} strokeWidth="1" />
          <line x1="-30" y1="-66" x2="30" y2="-66" stroke={P} strokeWidth="0.7" />
          <line x1="-30" y1="14" x2="30" y2="14" stroke={P} strokeWidth="0.7" />
        </g>

        {/* Threshold bands — recorded, not prescriptive */}
        <line x1="110" y1="316" x2="700" y2="316" stroke={P} strokeWidth="0.6" strokeOpacity="0.34" strokeDasharray="8 6" />
        <line x1="110" y1="404" x2="700" y2="404" stroke={P} strokeWidth="0.6" strokeOpacity="0.34" strokeDasharray="8 6" />

        {/* The trace */}
        <path d={d} fill="none" stroke={P} strokeWidth="1.3" strokeOpacity="0.82" />

        {/* Escalation: the excursion is marked the way a scribe marks a variant */}
        <g opacity="0.9">
          <circle cx="519" cy="300" r="13" fill="none" stroke={P} strokeWidth="1" />
          <line x1="519" y1="287" x2="519" y2="222" stroke={P} strokeWidth="0.7" strokeDasharray="3 4" />
          {[222, 200, 178].map((y, i) => (
            <g key={y}>
              <line x1="519" y1={y} x2={560 + i * 22} y2={y} stroke={P} strokeWidth="0.7" strokeOpacity={0.6 - i * 0.12} />
              <circle cx={560 + i * 22} cy={y} r="3" fill="none" stroke={P} strokeWidth="0.8" strokeOpacity={0.7 - i * 0.12} />
            </g>
          ))}
        </g>

        {/* Baseline ticks */}
        <g opacity="0.34">
          <line x1="120" y1="470" x2="690" y2="470" stroke={P} strokeWidth="0.8" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={120 + i * 30} y1="470" x2={120 + i * 30} y2={i % 5 === 0 ? 456 : 464} stroke={P} strokeWidth="0.6" />
          ))}
        </g>
      </g>
    </svg>
  );
}

export const PROJECT_ART: Record<string, (p: ArtProps) => React.ReactElement> = {
  "shepherd-ai": ShepherdArt,
  halaqaat: HalaqaatArt,
  "youth-ink-network": YouthInkArt,
  biqiyas: BiQiyasArt,
  "glucose-guardian": GlucoseArt,
};
