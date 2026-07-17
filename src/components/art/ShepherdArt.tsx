/**
 * Mission diagram, drawn over the Shepherd-AI plate.
 *
 * Original SVG. Watchtowers and routes in a surveyor's hand, with the autonomy
 * layer — surveyed mission boundary, task-allocation fan, waypoints — in the
 * same ink weight, so it reads as one drawing on top of the 1771 map rather than
 * a UI pasted over a photograph.
 *
 * The four other project drawings that used to live here were deleted: every
 * venture now carries a real archival plate, and a diagram behind a photograph
 * is just noise.
 */
import { n } from "@/lib/svg";

const P = "var(--paper)";

export function ShepherdArt({ className }: { className?: string }) {
  const towers: [number, number][] = [
    [120, 350],
    [372, 268],
    [640, 330],
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="sh-rough" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="5" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <radialGradient id="sh-vig" cx="50%" cy="50%" r="74%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="62%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="86%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="sh-mask">
          <rect width="800" height="600" fill="url(#sh-vig)" filter="url(#sh-rough)" />
        </mask>
      </defs>

      <g mask="url(#sh-mask)">
        {/* Terrain contours */}
        {Array.from({ length: 11 }).map((_, i) => (
          <path
            key={i}
            d={`M -40 ${430 + i * 22} C 150 ${386 + i * 20}, 300 ${470 + i * 18}, 470 ${418 + i * 21} S 720 ${372 + i * 19}, 850 ${408 + i * 22}`}
            fill="none"
            stroke={P}
            strokeWidth="0.7"
            strokeOpacity={n(0.34 - i * 0.02)}
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

        {/* Routes between towers */}
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
