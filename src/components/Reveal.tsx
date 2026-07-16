"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Sets data-inview="true" once the element enters the viewport, which drives the
 * .u-rise / .u-fade / .u-draw transitions in globals.css.
 *
 * Reveal is one-way: content never animates back out, so scrolling up is calm.
 * Under prefers-reduced-motion the CSS resolves everything to its final state,
 * so no JS branch is needed here.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  threshold = 0.18,
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  threshold?: number;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IO is unavailable, show content rather than hiding it forever.
    // Written straight to the DOM rather than via setState: lazily initialising
    // this in useState would evaluate `typeof IntersectionObserver` on the
    // server (always undefined) and disagree with the client on hydration,
    // while setState here fires a cascading render the moment the effect runs.
    // No re-render follows, so React never clobbers the attribute.
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.inview = "true";
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect(); // one-way
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} data-inview={inView} className={className} {...rest}>
      {children}
    </Tag>
  );
}
