/**
 * Content from Resume.pdf, structured to match bwu.ai's DOM exactly:
 * header → name → bio → "X here" links → <hr> → roles list → <hr> →
 * repos/social → email → <hr> → languages → toggle → copyright.
 *
 * `href: null` → rendered as a pending link (styled, not yet clickable) rather
 * than an invented URL. See CONTENT-TODO.md.
 */

export const profile = {
  // Header path: "<name>/README.txt", name linking to GitHub like the reference.
  pathName: "mohammed-alnuwaiser",
  pathExt: "/README.txt",
  githubUrl: null as string | null, // TODO
  linkedinUrl: null as string | null, // TODO
  name: "Mohammed Alnuwaiser",
  bio: "I build autonomous systems and research how AI explains itself. Interested in autonomous UAVs, robotics, and Arabic NLP.",
  email: "momoalnuw@gmail.com",
  languages: "العربية · English",
} as const;

/** "X here" links, where "here" is the hyperlink. */
export const hereLinks: { label: string; href: string | null }[] = [
  { label: "Projects", href: null }, // TODO -> GitHub
  { label: "Research", href: null }, // TODO
];

export type Role = { name: string; org: string; bold?: boolean };

/** One line each: role-name (307px column) + "@ org". bold = education. */
export const roles: Role[] = [
  { name: "Grade 11, expected 2027", org: "Secondary School, Riyadh", bold: true },
  { name: "Gifted Student (MMCAT)", org: "Mawhiba", bold: true },
  // (blank line in the reference between education and experience)
  { name: "AI Explainability Research", org: "UC Santa Cruz — Prof. Leilani H. Gilpin" },
  { name: "Founder & Research Lead", org: "ALBA7OOTH Research Lab" },
  { name: "Co-Founder & CTO", org: "BiQiyas" },
  { name: "Co-Founder & CTO", org: "Youth Ink Network" },
  { name: "Founder", org: "Halaqaat" },
  { name: "2nd Place, Programming Path", org: "Defensethon Hackathon" },
];

/** Index in `roles` after which a blank line separates education from experience. */
export const rolesSplitAfter = 2;

export type Repo = { name: string; href: string | null; inProgress?: boolean };

/** Rendered "name@ github", matching the reference's "787-10@ github". */
export const repos: Repo[] = [
  { name: "Shepherd-AI", href: null, inProgress: true },
  { name: "Musahhih", href: null, inProgress: true },
  { name: "Glucose Guardian", href: null },
];

/** Rendered "name@ platform", the platform being the link. */
export const socials: { name: string; platform: string; href: string | null }[] = [
  { name: profile.name, platform: "linkedin", href: profile.linkedinUrl },
];
