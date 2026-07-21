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

export type Writing = {
  /** URL segment: /writings/<slug>/ */
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** Optional italic line under the date. */
  subtitle?: string;
  /**
   * The post itself. Blank line = new paragraph.
   * Lines starting with "> " become a blockquote.
   * A paragraph wrapped in **double asterisks** becomes a bold section label.
   */
  body: string;
};

/**
 * Posts live on this site at /writings/<slug>/ — they are not external links.
 * Add entries here; the index sorts them newest-first automatically.
 */
export const writings: Writing[] = [
  {
    slug: "the-scales-of-the-hereafter",
    title: "The Scales of the Hereafter",
    date: "2026-07-21",
    body: `One of the verses that I find profoundly thought-provoking is ALLĀH’S (ﷻ) statement:

> “Whoever seeks a religion other than ʾIslām, it will never be accepted from him, and in the Hereafter he will be among the losers.” (Qurʾān 3:85)

What stands out to me is not only the rejection of any religion besides ʾIslām, but the way the verse concludes: “and in the Hereafter he will be among the losers.”

This reminds us that, in ALLĀH’S (ﷻ) sight, true success and true failure are not ultimately measured by what happens in this world. They are measured by the reality of the Hereafter. Our wealth, status, influence, achievements, or hardships in this life are not the scales by which ALLĀH (ﷻ) determines whether we have truly succeeded. Those things may have significance within the temporary life of this world, but they are not the final measure of a person's worth before their Lord.

A person may appear successful by every worldly standard, wealthy, respected, powerful, admired, yet arrive before ALLĀH (ﷻ) having lost everything that truly mattered. Another person may live a life filled with hardship, obscurity, and sacrifice, yet stand before ALLĀH (ﷻ) among the successful. The decisive criterion is not what people think of us, nor what we possess, but where we stand when we meet our Creator.

I think this is one of the greatest corrections the Qurʾān repeatedly makes to the human mindset. We naturally become preoccupied with worldly goals because they are immediate and visible. We worry about careers, finances, recognition, and comfort, often treating them as though they define our success. The Qurʾān consistently redirects our attention to a different scale, the scale of the Hereafter. That is where gain and loss become absolute and irreversible.

This theme appears throughout the Qurʾān because ALLĀH (ﷻ) leaves no excuse for humanity after sending His messengers. The message is repeated from different angles until the distinction between appearances and reality becomes unmistakably clear. If we truly internalized this perspective, many of our anxieties would be placed in their proper context, and many of our priorities would naturally change.

The life of this world has its place, but it is never the final verdict. The only success that ultimately matters is the success that remains after death, and the only loss that truly matters is the loss that accompanies a person into the Hereafter. Everything else is temporary. The scales of the Hereafter are the only scales that will never be overturned.`,
  },
];

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
