import { Atkinson_Hyperlegible_Next } from "next/font/google";
import Link from "next/link";

import { carebridge } from "@/lib/carebridge";
import { person } from "@/lib/profile";
import CareDemo from "./care-demo";

// CareBridge's own body face, designed by the Braille Institute for low-vision readers.
// The site already loads its display face (Bricolage Grotesque).
const atkinson = Atkinson_Hyperlegible_Next({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const title = `CareBridge demo · ${person.name}`;
const description =
  "Try CareBridge in your browser: a plain-language care plan made by the live app from a fictional patient’s discharge instructions.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/work/carebridge/demo" },
  openGraph: { url: "/work/carebridge/demo", title, description },
  twitter: { card: "summary", title, description },
};

export default function CareBridgeDemoPage() {
  return (
    <article className="study">
      <header className="study-hero wrap">
        <Link href="/work/carebridge" className="study-back">
          CareBridge case study
        </Link>
        <p className="eyebrow">Healthcare AI · Interactive demo</p>
        <h1>CareBridge, without the wait</h1>
        <p className="design-lede">
          Choose the fictional patient, open their plan, then try the daily check-in. Report a warning sign like blue
          lips and see what CareBridge tells the patient to do.
        </p>
        <div className="hero-actions">
          <a href={carebridge.live} className="button button-primary" target="_blank" rel="noopener noreferrer">
            Try the live app<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <a href={carebridge.code} className="button button-secondary" target="_blank" rel="noopener noreferrer">
            Read the code<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
        <dl className="study-meta">
          <div>
            <dt>What you’re seeing</dt>
            <dd>
              A plan the live app made on November 9, 2026 from its fictional pneumonia patient, shown exactly as it
              came back.
            </dd>
          </div>
          <div>
            <dt>What runs here</dt>
            <dd>Only this page. It calls no model or server, and check-ins disappear when you leave.</dd>
          </div>
          <div>
            <dt>The live app adds</dt>
            <dd>Your own pasted instructions, 10 languages, and a plan saved on your device.</dd>
          </div>
        </dl>
      </header>
      <div className={`wrap cb-demo-frame ${atkinson.variable}`}>
        <CareDemo />
      </div>
    </article>
  );
}
