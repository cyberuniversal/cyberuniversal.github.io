import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";

/* Free stand-in for the reference's SF Mono (Apple proprietary — the reference
   self-hosts the .otf, which its licence doesn't permit; we don't redistribute
   it). JetBrains Mono is the closest OFL match, with the bold + italic cuts the
   layout needs. On Apple devices `ui-monospace` still resolves to real SF Mono. */
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE = "https://cyberuniversal.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Mohammed Alnuwaiser",
  description: profile.bio,
  openGraph: {
    type: "website",
    title: "Mohammed Alnuwaiser",
    description: profile.bio,
    url: SITE,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Matches whichever theme the inline script picks, so the browser chrome agrees.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

/* Set the theme before first paint so there's no flash. Defaults to light (like
   the reference); only a saved choice overrides it. Inline + blocking on purpose
   — it must run pre-render. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
