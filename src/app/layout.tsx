import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, IBM_Plex_Sans, IBM_Plex_Mono, Amiri } from "next/font/google";
import "./globals.css";
import { Grain } from "@/components/Grain";

/* Display: high-contrast editorial serif. Weight 300 uppercase is the single
   decision that carries most of the resemblance to the reference. */
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/* Classical Naskh, used sparingly and only with verified text. */
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE = "https://mohammedalnuwaiser.com"; // TODO: confirm production domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Mohammed Alnuwaiser — AI Research & Autonomous Systems",
    template: "%s — Mohammed Alnuwaiser",
  },
  description:
    "AI researcher, technical founder, and builder in Riyadh working on autonomous systems and mission-driven software.",
  authors: [{ name: "Mohammed Alnuwaiser" }],
  creator: "Mohammed Alnuwaiser",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE,
    siteName: "Mohammed Alnuwaiser",
    title: "Mohammed Alnuwaiser — AI Research & Autonomous Systems",
    description:
      "Building intelligent systems for the future, grounded in a civilization of knowledge.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Alnuwaiser — AI Research & Autonomous Systems",
    description:
      "Building intelligent systems for the future, grounded in a civilization of knowledge.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#02110f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${plexSans.variable} ${plexMono.variable} ${amiri.variable}`}
    >
      <body>
        <a
          href="#work"
          className="u-meta sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--paper)] focus:px-4 focus:py-2 focus:text-[var(--ink)]"
        >
          Skip to content
        </a>
        {children}
        <Grain />
      </body>
    </html>
  );
}
