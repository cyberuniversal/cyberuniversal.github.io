/**
 * Single source of truth for site content.
 *
 * ACCURACY RULE: every fact here comes from Mohammed's résumé (Resume.pdf).
 * Nothing is inferred or embellished. Figures ("~11,000 applicants", "13-drone
 * simulated swarm", "~97%") are quoted as the résumé states them, hedges
 * included. Optional fields are `null` and simply don't render.
 */

export const profile = {
  name: "Mohammed Alnuwaiser",
  title: "Student Researcher and Technical Founder in AI, NLP & Autonomous Systems",
  location: "Riyadh, Saudi Arabia",
  email: "momoalnuw@gmail.com",
  label: "AI / NLP / AUTONOMOUS SYSTEMS — RIYADH",
  /** Hero display line. Kept short enough to break cleanly at 13vw. */
  headline: ["Intent", "into", "action."],
  statement:
    "Systems that turn ordinary language into action you can supervise — bounded, checked, and explainable after the fact.",
  secondary:
    "Student researcher and technical founder working on AI, Arabic NLP, and autonomous systems.",
} as const;

export type Work = {
  id: string;
  number: string;
  /** Hermes-style kicker: the verb, not the noun. */
  kicker: string;
  name: string;
  /** One-line claim. */
  headline: string;
  body: string;
  role: string;
  org: string | null;
  place: string;
  period: string;
  /** Résumé-stated tech only. */
  tech: string[];
  plate?: { src: string; alt: string };
  href: string | null; // TODO: no links in the résumé
  flagship?: boolean;
};

export const work: Work[] = [
  {
    id: "shepherd-ai",
    number: "01",
    kicker: "Command",
    name: "Shepherd-AI",
    headline: "Natural language, bounded autonomy",
    body: "An offline-first, human-supervised command layer that lets operators coordinate autonomous drone swarms through natural-language mission requests. It translates operator intent into bounded missions, deterministic target resolution and task allocation, explicit safety checks, human confirmation, and constrained dispatch for high-trust environments.",
    role: "Research Fellow",
    org: "YRI Fellowship",
    place: "Remote",
    period: "2026 — Present",
    tech: ["MAVSDK/MAVLink", "Python"],
    plate: {
      src: "/img/map-arabia.webp",
      alt: "Rigobert Bonne's 1771 map of Arabia, rendered as a one-bit line-screen dither.",
    },
    href: null,
    flagship: true,
  },
  {
    id: "alba7ooth",
    number: "02",
    kicker: "Research",
    name: "ALBA7OOTH Research Lab",
    headline: "A student-led lab for Arabic NLP",
    body: "Founded a student-led AI and Arabic NLP research lab. I lead an Arabic grammatical error correction project spanning literature review, dataset planning, experimentation, evaluation, and paper development.",
    role: "Founder & Research Lead",
    org: null,
    place: "Riyadh, Saudi Arabia",
    period: "2026 — Present",
    tech: ["PyTorch", "Hugging Face Transformers", "LaTeX"],
    plate: {
      src: "/img/manuscript.webp",
      alt: "A page of an Arabic-script manuscript, rendered as a one-bit line-screen dither.",
    },
    href: null,
  },
  {
    id: "halaqaat",
    number: "03",
    kicker: "Discover",
    name: "Halaqaat",
    headline: "Learning you can actually find",
    body: "A bilingual platform for discovering trusted Islamic lessons and gatherings beyond fragmented word-of-mouth networks. I'm building scholar verification, moderated publishing, search, filters, maps, and location-based discovery, with the goal of expanding from Saudi Arabia to Islamic communities worldwide.",
    role: "Founder",
    org: null,
    place: "Riyadh, Saudi Arabia",
    period: "2026 — Present",
    tech: [],
    plate: {
      src: "/img/courtyard.webp",
      alt: "The courtyard of the Islam Khodja madrasa, Khiva, rendered as a one-bit line-screen dither.",
    },
    href: null,
  },
  {
    id: "biqiyas",
    number: "04",
    kicker: "Practice",
    name: "BiQiyas",
    headline: "A question bank built to scale",
    body: "Building toward the world's largest question bank for Saudi aptitude tests, beginning with the English Saudi GAT and later expanding to Qudurat and Tahsili. I lead product architecture for targeted practice, answer review, progress analytics, and a question taxonomy organised by exam, topic, skill, and difficulty.",
    role: "Co-Founder & CTO",
    org: null,
    place: "Riyadh, Saudi Arabia",
    period: "2026 — Present",
    tech: [],
    plate: {
      src: "/img/geometry.webp",
      alt: "Zellij tilework at Place El-Hedine, Meknes, rendered as a one-bit line-screen dither.",
    },
    href: null,
  },
  {
    id: "youth-ink-network",
    number: "05",
    kicker: "Publish",
    name: "Youth Ink Network",
    headline: "Student work, in the open",
    body: "A youth-led nonprofit academic platform that helps students develop and publish original research, articles, essays, and conference-related work across disciplines. I designed and built the public site — submission pathways, publication tracks, collaboration opportunities, learning programs — and lead technical direction, architecture, deployment, and maintenance.",
    role: "Co-Founder & CTO",
    org: null,
    place: "Riyadh, Saudi Arabia",
    period: "2026 — Present",
    tech: [],
    plate: {
      src: "/img/map-idrisi.webp",
      alt: "Al-Idrisi's world map, rendered as a one-bit line-screen dither.",
    },
    href: null,
  },
  {
    id: "glucose-guardian",
    number: "06",
    kicker: "Escalate",
    name: "Glucose Guardian",
    headline: "No critical event goes unnoticed",
    body: "A glucose emergency application with timed escalation, critical notifications, configurable contacts, SMS alerts, automated calls, cancellation controls, and persistent event logging.",
    role: "Builder",
    org: null,
    place: "Riyadh, Saudi Arabia",
    period: "2026",
    tech: ["React Native", "Expo", "Supabase", "Twilio"],
    plate: {
      src: "/img/medical-ms.webp",
      alt: "A page from a Persian ophthalmological manuscript, rendered as a one-bit line-screen dither.",
    },
    href: null,
  },
];

/** The one honour on the résumé, with its stated figures. */
export const honour = {
  title: "2nd Place — Defensethon Hackathon",
  track: "Programming Path",
  project: "Shepherd-AI",
  year: "2026",
  detail:
    "Advanced from approximately 11,000 applicants to roughly 350 finalists with a mission-planning system demonstrated on a 13-drone simulated swarm.",
  figures: [
    { value: "~11,000", label: "Applicants" },
    { value: "~350", label: "Finalists" },
    { value: "13", label: "Drone simulated swarm" },
    { value: "2nd", label: "Programming path" },
  ],
} as const;

export const education = {
  school: "Secondary School",
  place: "Riyadh, Saudi Arabia",
  detail: "Grade 11 · Overall average approximately 97%",
  expected: "Expected graduation 2027",
  period: "2024 — Present",
} as const;

/** Verbatim groupings from the résumé's Technical Skills section. */
export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "C", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
  },
  {
    group: "Frameworks & Tools",
    items: [
      "PyTorch",
      "Hugging Face Transformers",
      "scikit-learn",
      "pandas",
      "NumPy",
      "React Native",
      "Expo",
      "Supabase",
      "Git/GitHub",
      "REST APIs",
      "Twilio",
      "MAVSDK/MAVLink",
      "LaTeX",
    ],
  },
  {
    group: "Research",
    items: [
      "Literature review",
      "Experiment design",
      "Dataset planning",
      "Model evaluation",
      "Technical writing",
      "AI/ML",
      "Arabic NLP",
      "Autonomous systems",
    ],
  },
  {
    group: "Spoken",
    items: ["English (fluent)", "Arabic (proficient)"],
  },
];

export const contact = {
  email: profile.email,
  /** TODO: not on the résumé. Add and they render automatically. */
  github: null as string | null,
  linkedin: null as string | null,
  resume: null as string | null,
};
