import Link from "next/link";

import { person } from "@/lib/profile";
import ReviewDemo from "./review-demo";

const title = `LedgerGuard demo · ${person.name}`;
const description =
  "Try LedgerGuard’s review screen in your browser, with the recorded results of its held-out test on synthetic invoices.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/work/ledgerguard/demo" },
  openGraph: { url: "/work/ledgerguard/demo", title, description },
  twitter: { card: "summary", title, description },
};

export default function LedgerGuardDemoPage() {
  return (
    <article className="study">
      <header className="study-hero wrap">
        <Link href="/#work" className="study-back">
          All work
        </Link>
        <p className="eyebrow">Finance AI agent · Interactive demo</p>
        <h1>LedgerGuard review desk</h1>
        <p className="design-lede">
          LedgerGuard audits invoices against contracts and spending policy, then sends every finding to a person.
          This is its review screen, so you can do the person’s part: open a finding, check the evidence and record a
          decision.
        </p>
        <div className="hero-actions">
          <a
            href="https://github.com/dorisagusiobo/ledgerguard"
            className="button button-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the code<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
        <dl className="study-meta">
          <div>
            <dt>What you’re seeing</dt>
            <dd>
              The recorded output of LedgerGuard’s one-time held-out test: 19 synthetic invoices with 14 planted
              problems, all 14 caught with no false flags.
            </dd>
          </div>
          <div>
            <dt>What runs here</dt>
            <dd>Only this page. It calls no model or server, and decisions stay in your browser until you leave.</dd>
          </div>
          <div>
            <dt>Limits</dt>
            <dd>
              It’s a small synthetic test, so it doesn’t predict real-world accuracy. The AI notes are shown exactly as
              generated; the README grades them.
            </dd>
          </div>
        </dl>
      </header>
      <div className="wrap lg-demo-frame">
        <ReviewDemo />
      </div>
    </article>
  );
}
