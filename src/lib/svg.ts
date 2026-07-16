/**
 * Quantise a computed coordinate for SVG output.
 *
 * Math.cos/Math.sin are not required to be bit-identical across JS engines, and
 * even when the doubles agree, Node and the browser can disagree on the last
 * digit when serialising them. React then sees the SSR attribute string
 * ("120.45105163371967") differ from the client's computed number
 * (120.4510516337197) and reports a hydration mismatch.
 *
 * Returning a fixed-precision *string* makes the value identical on both sides
 * by construction. Two decimals is far below one device pixel at these viewBox
 * scales, so nothing moves visually.
 */
export const n = (v: number): string => v.toFixed(2);

/** Point on a circle, pre-quantised. Angle in radians. */
export const pt = (cx: number, cy: number, r: number, a: number): [string, string] => [
  n(cx + Math.cos(a) * r),
  n(cy + Math.sin(a) * r),
];

/** `${x},${y}` for polygon/polyline points, pre-quantised. */
export const poly = (cx: number, cy: number, r: number, a: number): string =>
  `${n(cx + Math.cos(a) * r)},${n(cy + Math.sin(a) * r)}`;
