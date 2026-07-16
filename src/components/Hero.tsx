"use client";

import { useEffect, useRef, useState } from "react";
import { HeroArt } from "./art/HeroArt";
import { Plate } from "./Plate";
import { profile, contact } from "@/data/portfolio";

/**
 * Hero. Typography sits *inside* the composition rather than on a card floating
 * above it — the art fades irregularly behind the name instead of stopping at a
 * panel edge.
 */
export function Hero() {
  const [y, setY] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Coarse pointers: skip parallax entirely — it costs more than it gives.
    const coarse = window.matchMedia("(pointer: coarse)");
    if (reduce.matches || coarse.matches) return;

    const onScroll = () => {
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        setY(window.scrollY);
        raf.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden"
    >
      {/* Art layer — slower than the page (subtle parallax).
          z-0, NOT a negative z-index: html/body carry an opaque background, and
          a negative z-index child paints behind ancestor backgrounds, which
          hides the artwork completely. Content above sits at z-10. */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ transform: `translate3d(0, ${y * 0.18}px, 0) scale(1.06)` }}
      >
        {/* Al-Idrisi's world map as the ground the city stands on: the drawn
            arcade and route lines sit over a real archival plate, so the
            historical and technical layers share one surface instead of the
            diagram floating on flat colour. Kept low so the name still leads. */}
        <Plate
          src="/img/map-idrisi.webp"
          alt=""
          className="absolute inset-0 h-full w-full origin-center scale-125"
          opacity={0.28}
        />

        {/* Deliberate mobile crop: at 390px the slice already shows only the
            centre of the composition, leaving a tall empty sky. Scaling from the
            bottom edge pushes the skyline and arcade up into the frame so the
            hero still carries weight, rather than reading as a compressed
            desktop layout. */}
        <HeroArt className="relative h-full w-full origin-bottom scale-[1.5] md:scale-100" />
      </div>

      {/* Scanlines — restrained, only over the art */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--paper) 0 1px, transparent 1px 3px)",
        }}
      />

      <div className="relative z-10 px-[var(--edge)] pb-[calc(var(--vsq)*7)]">
        <p className="u-meta mb-[calc(var(--vsq)*3)]">{profile.label}</p>

        <h1 className="u-display" style={{ fontSize: "var(--fs-display)" }}>
          <span className="u-mask">
            <span className="block animate-[heroRise_1.4s_cubic-bezier(0.22,1,0.36,1)_both]">
              Mohammed
            </span>
          </span>
          <span className="u-mask">
            <span className="block animate-[heroRise_1.4s_cubic-bezier(0.22,1,0.36,1)_120ms_both]">
              Alnuwaiser
            </span>
          </span>
        </h1>

        <div className="mt-[calc(var(--vsq)*4)] flex flex-col gap-[calc(var(--vsq)*3)] md:flex-row md:items-end md:justify-between">
          <div className="u-measure">
            <p className="text-[clamp(1.05rem,1.6vw,1.35rem)] leading-[1.45] text-[var(--paper)]">
              {profile.statement}
            </p>
            <p className="mt-[calc(var(--vsq)*1.6)] text-[var(--paper-muted)]">
              {profile.secondary}
            </p>
          </div>

          {/* Editorial controls: a rule, a label, an arrow. No pills. */}
          <div className="flex shrink-0 flex-col gap-0 md:items-end">
            <a href="#work" className="group border-t border-[var(--line-strong)] py-[calc(var(--vsq)*1.6)] md:min-w-[19rem]">
              <span className="flex items-center justify-between gap-6">
                <span className="u-meta !text-[var(--paper)]">View selected work</span>
                <span
                  aria-hidden="true"
                  className="translate-x-0 transition-transform duration-700 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </a>
            {/* Résumé intentionally omitted until a real file exists — the brief
                forbids inventing links, and a dead control is worse than none.
                TODO(mohammed): add /resume.pdf, then restore this control. */}
            {contact.resume && (
              <a href={contact.resume} className="group border-t border-[var(--line)] py-[calc(var(--vsq)*1.6)]">
                <span className="flex items-center justify-between gap-6">
                  <span className="u-meta !text-[var(--paper)]">Download résumé</span>
                  <span aria-hidden="true">↓</span>
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Quiet technical metadata + scroll cue */}
        <div className="mt-[calc(var(--vsq)*5)] flex items-end justify-between border-t border-[var(--line)] pt-[calc(var(--vsq)*2)]">
          <p className="u-meta">24°42′N 46°43′E — Riyadh</p>
          <p className="u-meta hidden sm:block">Portfolio / 2026</p>
          <p className="u-meta flex items-center gap-2">
            <span>Scroll</span>
            <span aria-hidden="true" className="animate-[scrollCue_2.4s_ease-in-out_infinite]">↓</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes heroRise {
          from { transform: translateY(104%); }
          to   { transform: translateY(0); }
        }
        @keyframes scrollCue {
          0%, 100% { transform: translateY(0); opacity: .5; }
          50%      { transform: translateY(4px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="heroRise"] { animation: none !important; transform: none !important; }
          [class*="scrollCue"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
