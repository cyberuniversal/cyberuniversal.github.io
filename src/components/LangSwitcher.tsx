"use client";

import { useEffect, useRef } from "react";
import { AR } from "@/data/i18n";

/**
 * Language switch, copied from the reference's setLang/alignRoles:
 *  - English text is captured from [data-i18n] on mount.
 *  - Clicking العربية swaps every [data-i18n] to Arabic and flips dir=rtl;
 *    English restores the captured strings and dir=ltr.
 *  - alignRoles re-fits the role-name column to the widest label in the current
 *    language (the reference does this so columns stay aligned after translating).
 *
 * The switched elements are server-rendered siblings, not React-controlled, so
 * imperative textContent swaps are safe — React never re-renders them.
 */
function alignRoles() {
  const names = Array.from(document.querySelectorAll<HTMLElement>(".role-name"));
  if (!names.length) return;
  // On narrow screens the CSS lets these wrap; don't force a fixed column.
  if (window.innerWidth < 640) {
    names.forEach((el) => (el.style.width = ""));
    return;
  }
  names.forEach((el) => (el.style.width = "auto"));
  let max = 0;
  names.forEach((el) => {
    const w = el.getBoundingClientRect().width;
    if (w > max) max = w;
  });
  names.forEach((el) => (el.style.width = `${Math.ceil(max + 16)}px`));
}

export function LangSwitcher() {
  const en = useRef<Record<string, string>>({});
  const cur = useRef<"en" | "ar">("en");

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
      const k = el.dataset.i18n!;
      if (!(k in en.current)) en.current[k] = el.textContent ?? "";
    });
    alignRoles();
    const onResize = () => alignRoles();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const apply = (dict: Record<string, string>) => {
    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
      const v = dict[el.dataset.i18n!];
      if (v != null) el.textContent = v;
    });
    alignRoles();
  };

  const setLang = (lang: "en" | "ar") => {
    if (lang === cur.current) return;
    cur.current = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    apply(lang === "ar" ? AR : en.current);
  };

  return (
    <p>
      <span data-i18n="langLabel">Languages I speak:</span>{" "}
      <button type="button" className="link-button ar" onClick={() => setLang("ar")}>
        العربية
      </button>
      {" · "}
      <button type="button" className="link-button" onClick={() => setLang("en")}>
        English
      </button>
    </p>
  );
}
