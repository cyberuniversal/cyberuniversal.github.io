"use client";

import { useSyncExternalStore } from "react";
import { Reveal } from "./Reveal";
import { contact } from "@/data/portfolio";

const fmtRiyadh = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Riyadh",
    hour12: false,
  }).format(new Date());

/* getSnapshot must be referentially stable between renders or React loops
   forever. The formatted string only changes once a minute, so cache it and
   return the same reference until the minute ticks over. */
let cached = "";
const getSnapshot = () => {
  const next = fmtRiyadh();
  if (next !== cached) cached = next;
  return cached;
};

/* Server (and hydration) render nothing — a time formatted during SSR would
   disagree with the client and produce a mismatch. */
const getServerSnapshot = () => null;

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
};

/**
 * Local time in Riyadh.
 *
 * useSyncExternalStore rather than useState+useEffect: it reads the server
 * snapshot during hydration and only then switches to the live value, so the
 * markup matches by construction. It also avoids calling setState inside an
 * effect body, which cascades renders (react-hooks/set-state-in-effect).
 */
function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Reserve the width so filling it in causes no layout shift.
  return (
    <span className="inline-block min-w-[4.5ch] tabular-nums">
      {time ?? " "}
    </span>
  );
}

const LINKS = [
  { label: "Email", href: contact.email, prefix: "mailto:" },
  { label: "GitHub", href: contact.github, prefix: "" },
  { label: "LinkedIn", href: contact.linkedin, prefix: "" },
  { label: "Résumé", href: contact.resume, prefix: "" },
] as const;

export function Contact() {
  const live = LINKS.filter((l) => l.href);

  return (
    <Reveal
      as="footer"
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-[88svh] flex-col justify-between border-t border-[var(--line)] px-[var(--edge)] py-[var(--section-y)]"
    >
      <div>
        <p className="u-meta mb-[calc(var(--vsq)*4)]">Contact</p>
        <h2 id="contact-heading" className="u-display" style={{ fontSize: "var(--fs-display)" }}>
          <span className="u-mask">
            <span className="u-rise block">Let&rsquo;s build</span>
          </span>
          <span className="u-mask">
            <span className="u-rise block">what doesn&rsquo;t</span>
          </span>
          <span className="u-mask">
            <span className="u-rise block">exist yet.</span>
          </span>
        </h2>
      </div>

      <div className="mt-[calc(var(--vsq)*8)]">
        {live.length > 0 ? (
          <ul className="u-fade grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {live.map((l) => (
              <li key={l.label}>
                <a
                  href={`${l.prefix}${l.href}`}
                  className="group flex items-center justify-between border-t border-[var(--line-strong)] py-[calc(var(--vsq)*2)] sm:mr-[calc(var(--vsq)*3)]"
                  {...(l.prefix === "" ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                >
                  <span className="u-meta !text-[var(--paper)]">{l.label}</span>
                  <span aria-hidden="true" className="transition-transform duration-700 group-hover:translate-x-1.5">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          /* The brief provides no links and forbids inventing them. A clear TODO
             is what it asks for in that case. See CONTENT-TODO.md. */
          <div className="u-fade border-t border-[var(--line-strong)] py-[calc(var(--vsq)*2)]">
            <p className="u-meta !text-[var(--paper)]">
              TODO — add email, GitHub, LinkedIn and résumé in src/data/portfolio.ts
            </p>
          </div>
        )}

        {/* Footer metadata ledger */}
        <div className="mt-[calc(var(--vsq)*6)] flex flex-wrap items-baseline justify-between gap-x-[calc(var(--vsq)*4)] gap-y-[calc(var(--vsq)*1.5)] border-t border-[var(--line)] pt-[calc(var(--vsq)*2.5)]">
          <p className="u-meta !text-[var(--paper)]">Mohammed Alnuwaiser</p>
          <p className="u-meta">
            Riyadh / Saudi Arabia — <span className="u-arabic inline-block align-middle">الرياض</span>
          </p>
          <p className="u-meta">
            Local time <LocalTime />
          </p>
          <p className="u-meta">2026</p>
          <p className="u-meta">Built with intent</p>
        </div>
      </div>
    </Reveal>
  );
}
