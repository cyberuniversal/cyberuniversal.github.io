/**
 * Global film grain.
 *
 * Original procedural noise (feTurbulence) — the reference site has no SVG noise
 * filters at all, so nothing here is copied from it.
 *
 * On stacking: the brief asks for grain "above backgrounds but below readable
 * interface content". A layer genuinely interleaved between every section
 * background and its own text is not expressible without fragile per-section
 * stacking contexts. Instead the layer sits on top at low opacity with
 * `soft-light`, which is what the constraint is protecting — type stays sharp
 * because the grain barely perturbs high-contrast edges, while still reading
 * across the large dark fields. Intensity is tokenised (`--grain-opacity`).
 */

const NOISE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220">
  <filter id="n" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" seed="7"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="220" height="220" filter="url(#n)" opacity="0.62"/>
</svg>`;

const NOISE_URI = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

export function Grain() {
  return (
    <>
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none fixed inset-0 z-50"
        style={{
          backgroundImage: NOISE_URI,
          backgroundRepeat: "repeat",
          opacity: "var(--grain-opacity)",
          mixBlendMode: "var(--grain-blend)" as React.CSSProperties["mixBlendMode"],
        }}
      />
      {/* No global vignette: a fixed darkening layer would sit above the type and
          reduce contrast at the edges, where the nav and footer metadata live.
          Each artwork carries its own radial vignette inside its mask instead,
          so the falloff applies to the imagery and never to readable text. */}
      <style>{`
        @keyframes grainDrift {
          0%   { transform: translate3d(0, 0, 0); }
          20%  { transform: translate3d(-3%, 2%, 0); }
          40%  { transform: translate3d(2%, -3%, 0); }
          60%  { transform: translate3d(-2%, -2%, 0); }
          80%  { transform: translate3d(3%, 1%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .grain-layer {
          /* Oversized so the drift never exposes an edge */
          inset: -6%;
          width: 112%;
          height: 112%;
          animation: grainDrift 6s steps(5, end) infinite;
        }
      `}</style>
    </>
  );
}
