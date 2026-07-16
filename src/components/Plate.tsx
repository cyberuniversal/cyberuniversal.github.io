/**
 * A baked dither plate.
 *
 * Plain <img>, deliberately not next/image: these are pre-dithered 1-bit assets,
 * and any re-encode or resample averages neighbouring black/paper pixels into
 * greys — which is exactly the texture the dither exists to avoid. They're
 * already 10–50KB lossless webp, so there is nothing for the optimiser to win.
 *
 * `mix-blend-mode: screen` is the whole trick, same as the reference: the plate's
 * blacks are pure #000, and screen(0, bg) == bg, so the black drops out with no
 * rectangle edge and the paper dither is left glowing on the page.
 */
/* Feathered edge. Where a plate's own content happens to be black it already
   dissolves for free under `screen`, but the remaining sides cut off as a hard
   rectangle. This fades them so the image sits in the page instead of on it. */
/* Extent must stay <= 100%: at 120% the `transparent` stop lands outside the
   element's box, so the edges never actually reach zero alpha and the rectangle
   still cuts hard. */
const SOFT_EDGE =
  "radial-gradient(78% 82% at 50% 45%, #000 42%, rgba(0,0,0,0.55) 74%, transparent 100%)";

export function Plate({
  src,
  alt,
  className = "",
  opacity = 1,
  feather = true,
}: {
  src: string;
  alt: string;
  className?: string;
  opacity?: number;
  feather?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- next/image re-encodes
    // and resamples, which averages the 1-bit black/paper pixels into greys and
    // destroys the dither. These are already 10-50KB lossless webp; there is no
    // optimisation left to win, only texture to lose.
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`pointer-events-none select-none object-cover mix-blend-screen ${className}`}
      style={{
        opacity,
        ...(feather
          ? { maskImage: SOFT_EDGE, WebkitMaskImage: SOFT_EDGE }
          : {}),
      }}
    />
  );
}
