/**
 * Content from Resume.pdf, structured to match bwu.ai's DOM.
 * Research (Shepherd-AI, Musahhih) lives on its own /research page, reached via
 * the "Research here" link — mirroring the reference's sub-pages.
 */

const GITHUB = "https://github.com/cyberuniversal";
const LINKEDIN = "https://www.linkedin.com/in/mohammedwn/";

export const profile = {
  pathName: "mohammed-alnuwaiser",
  pathExt: "/README.txt",
  githubUrl: GITHUB,
  linkedinUrl: LINKEDIN,
  name: "Mohammed Alnuwaiser",
  bio: "I build autonomous systems and research how AI explains itself. Interested in autonomous UAVs, robotics, and natural language processing.",
  email: "momoalnuw@gmail.com",
  languages: "العربية · English",
} as const;

/** "X here" links. `labelKey` ties into the Arabic translation map. */
export const hereLinks: { label: string; labelKey: string; href: string | null }[] = [
  { label: "Writings", labelKey: "writings", href: "/writings" },
  { label: "Research", labelKey: "research", href: "/research" },
];

export type Role = {
  name: string;
  org: string;
  bold?: boolean;
  /** data-i18n keys for the translation feature. */
  key: string;
  orgKey?: string;
};

/** One line each: role-name column + "@ org". bold = education. Order set by
 *  Mohammed: education, then Founder → Founder & Research Lead → CTO → UCSC. */
export const roles: Role[] = [
  { name: "Grade 11, expected 2027", org: "Secondary School, Riyadh", bold: true, key: "r_grade", orgKey: "o_school" },
  { name: "Gifted Student (MMCAT)", org: "Mawhiba", bold: true, key: "r_gifted", orgKey: "o_mawhiba" },
  { name: "Founder", org: "Halaqaat", key: "r_founder" },
  { name: "Founder & Research Lead", org: "ALBA7OOTH Research Lab", key: "r_frl" },
  { name: "Co-Founder & CTO", org: "Youth Ink Network", key: "r_cto" },
  { name: "AI Explainability Research", org: "UC Santa Cruz — Prof. Leilani H. Gilpin", key: "r_aix" },
];

/** Blank line between education and experience. */
export const rolesSplitAfter = 2;

export type Repo = { name: string; href: string | null; inProgress?: boolean };

/** Main-page repos, "name@ github". */
export const repos: Repo[] = [
  { name: "cyberuniversal", href: GITHUB },
];

/** Rendered "name@ platform". */
export const socials: { name: string; platform: string; href: string | null }[] = [
  { name: profile.name, platform: "linkedin", href: LINKEDIN },
];

export type Writing = { title: string; date: string; href: string | null };

/** The /writings page — bwu.ai/blog style (title + date, no description).
 *  Empty until Mohammed provides real entries. Nothing invented. */
export const writings: Writing[] = [];

export type Research = { name: string; href: string | null; date: string; note: string };

/** The /research page — laid out like the reference's /projects sub-page. */
export const research: Research[] = [
  {
    name: "Shepherd-AI",
    href: "https://github.com/cyberuniversal/shepherd-ai",
    date: "2026 – Present",
    note: "A Python simulation prototype for natural-language multi-drone mission planning — translating typed or spoken commands into structured intents, grounded map references, and initial mission plans. Command-parsing baselines, a DistilBERT span extractor, Whisper speech-input scaffolding, deterministic grounding, operator clarification, and an initial planner; validated 22/22 human-written commands on the custom simulation map.",
  },
  {
    name: "Musahhih",
    href: "https://github.com/ALBA7OOTH-Research-Lab/Musahhih",
    date: "2026 – Present",
    note: "Modern Standard Arabic grammatical error correction with open-weight models — comparing untouched and prompt-only baselines against LoRA/QLoRA fine-tuning on natural, synthetic, and mixed corpora. Improved exact-match correction on held-out Nahw-Passage from 16.83% to 28.38% (86/511 to 145/511) with the selected QLoRA checkpoint.",
  },
];
