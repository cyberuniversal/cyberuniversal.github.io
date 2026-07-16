/**
 * Single source of truth for site content.
 *
 * ACCURACY RULE: every field here is stated in Mohammed's brief. Nothing is
 * inferred, embellished, or invented — no dates, metrics, tech stacks, links,
 * users, or partnerships. Fields the brief does not state are `null` and are
 * simply not rendered. See CONTENT-TODO.md for the list awaiting real values.
 *
 * Arabic is used only where the word is genuine and meaningful (real place
 * names, real project names). No decorative or generated Arabic.
 */

export type Project = {
  id: string;
  number: string;
  name: string;
  /** Genuine Arabic name. null where no established Arabic name exists. */
  arabic: string | null;
  /** One-line purpose — verbatim intent from the brief. */
  purpose: string;
  /** Stated role. null when the brief does not state one. */
  role: string | null;
  /** Year/status. null — the brief states none. Do not invent. */
  status: string | null;
  /** External link. null — the brief provides none. Not rendered when null. */
  href: string | null;
  /** The historical thread this project is placed against. */
  lineage: string;
  /**
   * Baked dither plate from a public-domain archival source. Where a project has
   * one, the photograph replaces the drawn SVG. Where it doesn't, the SVG stands
   * — a real archival image beats a diagram, but a diagram beats a bad match.
   * Sources and licences: public/assets/ATTRIBUTION.md
   */
  plate?: { src: string; alt: string };
  flagship?: boolean;
};

export const profile = {
  name: "Mohammed Alnuwaiser",
  location: "Riyadh, Saudi Arabia",
  locationArabic: "الرياض",
  label: "AI RESEARCH / AUTONOMOUS SYSTEMS / RIYADH",
  statement:
    "Building intelligent systems for the future, grounded in a civilization of knowledge.",
  secondary:
    "AI researcher, technical founder, and student based in Riyadh.",
  positioning:
    "AI researcher, technical founder, and builder working on autonomous systems and mission-driven software.",
} as const;

export const projects: Project[] = [
  {
    id: "shepherd-ai",
    number: "01",
    name: "Shepherd-AI",
    arabic: null, // No established Arabic name — not invented.
    purpose:
      "Human-in-the-loop autonomy orchestration and natural-language mission planning for drone teams.",
    role: null, // TODO: brief states Research Fellow at YRI for the research, not a project role.
    status: null,
    href: null,
    lineage:
      "Navigation, command, and coordination across distance — the problem of moving intent safely between cities, and the routes that carried it.",
    plate: {
      src: "/img/map-arabia.webp",
      alt: "Rigobert Bonne's 1771 map of Arabia, processed to a one-bit line-screen dither.",
    },
    flagship: true,
  },
  {
    id: "halaqaat",
    number: "02",
    name: "Halaqaat",
    arabic: "حلقات", // Genuine: "circles" — the study circles the project is named for.
    purpose:
      "A platform for discovering Islamic lessons, scholars, and gatherings.",
    role: null,
    status: null,
    href: null,
    lineage:
      "Knowledge transmitted in circles — the madrasa courtyard, the study hall, and the unbroken chain between teacher and student.",
    plate: {
      src: "/img/courtyard.webp",
      alt: "Courtyard of the Islam Khodja madrasa, Khiva, rendered as a one-bit line-screen dither.",
    },
  },
  {
    id: "youth-ink-network",
    number: "03",
    name: "Youth Ink Network",
    arabic: null,
    purpose: "A student research and publishing network.",
    role: "Co-Founder and CTO", // Stated explicitly in the brief.
    status: null,
    href: null,
    lineage:
      "The written tradition — ink, parchment, marginalia, and the labour of copying and correcting a text so it survives.",
    plate: {
      src: "/img/manuscript.webp",
      alt: "A page of an Arabic-script manuscript, rendered as a one-bit line-screen dither.",
    },
  },
  {
    id: "biqiyas",
    number: "04",
    name: "BiQiyas",
    arabic: "بقياس", // Genuine: from qiyās, "measure".
    purpose: "A free question-bank platform for the Saudi GAT/Qudurat.",
    role: null,
    status: null,
    href: null,
    lineage:
      "Measure and method — algebraic notation, geometric construction, and the systematic exercise as a way of learning.",
    plate: {
      src: "/img/geometry.webp",
      alt: "Zellij tilework at Place El-Hedine, Meknes, rendered as a one-bit line-screen dither.",
    },
  },
  {
    id: "glucose-guardian",
    number: "05",
    name: "Glucose Guardian",
    arabic: null,
    purpose: "A software system for escalating dangerous glucose events.",
    role: null,
    status: null,
    href: null,
    lineage:
      "The bimaristan and the medical manuscript — observation recorded carefully enough to act on.",
    plate: {
      src: "/img/medical-ms.webp",
      alt: "A page from a Persian ophthalmological manuscript, rendered as a one-bit line-screen dither.",
    },
  },
];

export type ResearchEntry = {
  code: string;
  title: string;
  body: string;
  meta: string | null;
  href: string | null;
};

export const research: ResearchEntry[] = [
  {
    code: "R–01",
    title: "Shepherd-AI",
    body: "Human-in-the-loop autonomy orchestration and natural-language mission planning for drone teams.",
    meta: null, // TODO: no paper, venue, or date stated in the brief.
    href: null,
  },
  {
    code: "R–02",
    title: "YRI Research Fellowship",
    body: "Research Fellow, conducting Shepherd-AI research under one-on-one PhD mentorship.",
    meta: null,
    href: null,
  },
];

export type LedgerEntry = {
  index: string;
  title: string;
  org: string | null;
  place: string | null;
  period: string | null;
};

/** Only entries the brief states. No invented dates. */
export const ledger: LedgerEntry[] = [
  {
    index: "01",
    title: "Research Fellow",
    org: "YRI",
    place: null,
    period: null, // TODO: no dates stated.
  },
  {
    index: "02",
    title: "Co-Founder and CTO",
    org: "Youth Ink Network",
    place: null,
    period: null,
  },
  {
    index: "03",
    title: "Second Place — Programming Path",
    org: "DefenseThon",
    place: null,
    period: null,
  },
];

/** Archive interstitials. Arabic names are standard and verified. */
export const archives = [
  { code: "ARCHIVE 01", title: "Córdoba", arabic: "قرطبة" },
  { code: "ARCHIVE 02", title: "Baghdad", arabic: "بغداد" },
  { code: "ARCHIVE 03", title: "Damascus", arabic: "دمشق" },
] as const;

/** TODO: no links are stated in the brief. Nothing is rendered until real. */
export const contact = {
  email: null as string | null,
  github: null as string | null,
  linkedin: null as string | null,
  resume: null as string | null,
};
