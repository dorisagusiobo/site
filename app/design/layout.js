import Link from "next/link";

import Mark from "../components/mark";
import { person } from "@/lib/profile";

export default function DesignLayout({ children }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="brand" aria-label={`${person.name}, home`}>
            <Mark className="brand-mark" />
            <span className="brand-name">{person.name}</span>
          </Link>
          <Link href="/#twin" className="button button-primary header-chat">
            Chat with my AI
          </Link>
          <nav aria-label="Site">
            <ul className="nav-list">
              <li><Link href="/#work">AI work</Link></li>
              <li><Link href="/design" aria-current="page">Design</Link></li>
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/#experience">Experience</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Let’s build something people can actually use.</h2>
            <p>I’m open to roles and collaborations in human-centered AI, applied ML, generative and agentic AI.</p>
          </div>
          <ul className="footer-links">
            <li>
              <a href={person.linkedin} className="arrow-link" target="_blank" rel="noopener noreferrer">
                LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={person.github} className="arrow-link" target="_blank" rel="noopener noreferrer">
                GitHub<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <Link href="/" className="arrow-link">AI portfolio</Link>
            </li>
          </ul>
        </div>
        <div className="wrap footer-base">
          <Mark className="footer-mark" />
          <p>© {person.name}</p>
        </div>
      </footer>
    </>
  );
}
