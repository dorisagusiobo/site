import { Bricolage_Grotesque, IBM_Plex_Mono, Newsreader } from "next/font/google";

import { person } from "@/lib/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const title = `${person.name} · ${person.role}`;
const description =
  "AI engineer with a design background, building machine learning, generative AI and AI agents that people understand and use.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: person.name, url: person.linkedin }],
  creator: person.name,
  keywords: ["AI engineer", "machine learning", "generative AI", "AI agents", "LLM", "UX design", person.name],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: person.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F9F8" },
    { media: "(prefers-color-scheme: dark)", color: "#111917" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
