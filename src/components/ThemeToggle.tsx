"use client";

import { useSyncExternalStore } from "react";

/**
 * Flips :root[data-theme] and persists it. The inline script in layout.tsx sets
 * the initial value before paint; this reads it reactively via
 * useSyncExternalStore (subscribed to attribute changes) so there's no
 * setState-in-effect and no hydration mismatch — server snapshot is null.
 */
function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}
const getSnapshot = () => document.documentElement.dataset.theme ?? "light";
const getServerSnapshot = () => null;

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next; // triggers the observer
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked (private mode): still works this session.
    }
  };

  return (
    <button type="button" onClick={toggle} className="link-button">
      {theme === null ? "toggle theme" : theme === "dark" ? "light mode" : "dark mode"}
    </button>
  );
}
