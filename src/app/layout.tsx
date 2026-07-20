import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/portfolio";

const SITE = "https://mohammedalnuwaiser.com"; // TODO: confirm production domain

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

/* Set the theme before first paint so there's no flash. Reads a saved choice,
   else the OS preference. Inline + blocking on purpose — it must run pre-render. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
