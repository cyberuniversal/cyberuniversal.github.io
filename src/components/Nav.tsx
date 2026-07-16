"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Quiet fixed navigation: a hairline rule, a mono wordmark, mono links.
 * No pill, no glass panel, no rounded container, no desktop hamburger — all
 * ruled out by the brief. On mobile the links stay visible but drop to the
 * essentials rather than collapsing into a menu.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[60] transition-colors duration-700"
      style={{
        backgroundColor: scrolled ? "rgba(2,17,15,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(6px)" : "none",
      }}
    >
      <nav
        aria-label="Primary"
        className="flex items-center justify-between px-[var(--edge)] py-[calc(var(--vsq)*2.2)]"
      >
        <a href="#top" className="u-meta !text-[var(--paper)] hover:opacity-70">
          Mohammed Alnuwaiser
        </a>

        <ul className="flex items-center gap-[clamp(0.9rem,2.2vw,2.25rem)]">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="u-meta relative hover:!text-[var(--paper)] transition-colors duration-500"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className="u-rule"
        style={{ opacity: scrolled ? 1 : 0, transition: "opacity 700ms" }}
      />
    </header>
  );
}
