/**
 * All content, from Resume.pdf. Structured to mirror bwu.ai's README layout.
 * Nothing invented. `href: null` renders as plain text — real URLs weren't in
 * the résumé, so social/repo links wait for real values (see CONTENT-TODO.md).
 */

export const profile = {
  path: "~/mohammed-alnuwaiser/README.txt",
  name: "Mohammed Alnuwaiser",
  bio: "I build autonomous systems and research how AI explains itself. Interested in autonomous UAVs, robotics, and Arabic NLP.",
  location: "Riyadh, Saudi Arabia",
  email: "momoalnuw@gmail.com",
  // Résumé: (966) 055 134 1765 → E.164 for the tel: link.
  phone: "+966 55 134 1765",
  phoneHref: "tel:+966551341765",
  languages: "العربية · English",
} as const;

export type Item = { what: string; where: string; href: string | null };

/** "role@ place" rows, most significant first. */
export const experience: Item[] = [
  { what: "AI Explainability & Accountability", where: "UC Santa Cruz — Prof. Leilani H. Gilpin", href: null },
  { what: "Founder & Research Lead", where: "ALBA7OOTH Research Lab", href: null },
  { what: "Co-Founder & CTO", where: "BiQiyas", href: null },
  { what: "Co-Founder & CTO", where: "Youth Ink Network", href: null },
  { what: "Founder", where: "Halaqaat", href: null },
  { what: "2nd Place, Programming Path", where: "Defensethon Hackathon", href: null },
  { what: "Gifted Student (MMCAT)", where: "Mawhiba", href: null },
  { what: "Grade 11, expected 2027", where: "Secondary School, Riyadh", href: null },
];

export type Project = {
  name: string;
  note: string;
  href: string | null;
  /** Research with a paper in progress — rendered with italic emphasis, the way
   *  the reference italicises (<em>) its emphasised line. */
  inProgress?: boolean;
};

/** Research first (the in-progress papers), then shipped projects. */
export const projects: Project[] = [
  {
    name: "Shepherd-AI",
    note: "natural-language multi-drone mission planning — DistilBERT span extractor, Whisper speech input, deterministic grounding; 22/22 human commands validated.",
    href: null, // TODO: GitHub repo
    inProgress: true,
  },
  {
    name: "Musahhih",
    note: "Modern Standard Arabic grammatical error correction with open-weight models; QLoRA fine-tuning lifted exact-match from 16.83% to 28.38% on held-out Nahw-Passage.",
    href: null, // TODO: GitHub repo
    inProgress: true,
  },
  {
    name: "Glucose Guardian",
    note: "glucose-emergency app with timed escalation, SMS and call alerts, and persistent logging. React Native, Expo, Supabase, Twilio.",
    href: null,
  },
];

/** bwu's "Writings here / Projects here" social row. Only email + phone resolve. */
export const links: Item[] = [
  { what: "github", where: "", href: null }, // TODO
  { what: "linkedin", where: "", href: null }, // TODO
];

/** README-appropriate one-liner. Verbatim from the résumé's skills. */
export const stack =
  "Python · TypeScript · C · SQL · PyTorch · scikit-learn · pandas · NumPy · React Native · Supabase · Git · LaTeX";
