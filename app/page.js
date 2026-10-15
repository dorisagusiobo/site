import Image from "next/image";

import Mark from "./components/mark";
import portrait from "@/public/doris-agusiobo-echianu.png";
import TwinChat from "./components/twin-chat";
import {
  credentials,
  education,
  experience,
  featuredWork,
  moreWork,
  person,
  pillars,
  results,
  story,
  toolkit,
} from "@/lib/profile";
import { siteUrl } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  url: siteUrl,
  sameAs: [person.linkedin, person.github],
  alumniOf: ["Colorado State University Global", "Imo State University"],
  knowsAbout: ["Machine learning", "Generative AI", "AI agents", "UX design"],
};

function ExternalLink({ href, children, className = "" }) {
  const external = href.startsWith("http");
  return (
    <a href={href} className={className} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
      {external && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="site-header">
        <div className="wrap header-inner">
          <a href="#top" className="brand" aria-label={`${person.name}, back to top`}>
            <Mark className="brand-mark" />
            <span className="brand-name">{person.name}</span>
          </a>
          <a href="#twin" className="button button-primary header-chat">
            Chat with my AI
          </a>
          <nav aria-label="Sections">
            <ul className="nav-list">
              <li><a href="#work">Work</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#twin">Digital Twin</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero wrap" id="top" aria-labelledby="hero-title">
          <Mark className="hero-mark" animated title="Scattered dots settling into a straight line" />
          <p className="eyebrow">
            {person.role} · {person.location}
          </p>
          <h1 id="hero-title">
            Complexity, <span>made clear.</span>
          </h1>
          <p className="hero-thesis">
            I’m {person.firstName}. {person.thesis}
          </p>
          <div className="hero-actions">
            <a href="#work" className="button button-primary">
              See my work
            </a>
            <a href="#twin" className="button button-secondary">
              Ask my Digital Twin
            </a>
          </div>
        </section>

        <section className="results" aria-labelledby="results-title">
          <div className="wrap">
            <h2 id="results-title" className="eyebrow">
              Selected results
            </h2>
            <ul className="results-grid">
              {results.map((result) => (
                <li key={result.label} className="result">
                  <span className="result-value">{result.value}</span>
                  <span className="result-label">{result.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section wrap" id="work" aria-labelledby="work-title">
          <div className="section-head">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">Products that make something hard feel simple</h2>
          </div>

          <div className="cases">
            {featuredWork.map((work) => (
              <article key={work.slug} className={`case case-${work.slug}`}>
                <p className="case-kind">{work.kind}</p>
                <h3>{work.title}</h3>
                <p className="case-pitch">{work.pitch}</p>
                <dl className="case-details">
                  <div>
                    <dt>The problem</dt>
                    <dd>{work.problem}</dd>
                  </div>
                  <div>
                    <dt>What I built</dt>
                    <dd>{work.built}</dd>
                  </div>
                  <div>
                    <dt>Design thinking</dt>
                    <dd>{work.design}</dd>
                  </div>
                </dl>
                <ul className="tags" aria-label="Technologies">
                  {work.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="case-foot">
                  <span>{work.meta}</span>
                  {work.links.length > 0 && (
                    <span className="case-links">
                      {work.links.map((link) => (
                        <ExternalLink key={link.href} href={link.href} className="arrow-link">
                          {link.label}
                        </ExternalLink>
                      ))}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <h3 className="subhead">More builds</h3>
          <ul className="more">
            {moreWork.map((work) => (
              <li key={work.title}>
                <p className="case-kind">{work.kind}</p>
                <h4>{work.title}</h4>
                <p>{work.text}</p>
                {work.href && (
                  <ExternalLink href={work.href} className="arrow-link">
                    Code
                  </ExternalLink>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="wrap about-grid">
            <div className="section-head about-head">
              <p className="eyebrow">About</p>
              <h2 id="about-title">A designer who learned to engineer AI</h2>
              <Image
                src={portrait}
                alt={`Portrait of ${person.name}`}
                className="portrait"
                sizes="(max-width: 820px) 180px, 220px"
                placeholder="blur"
              />
            </div>
            <div className="about-story">
              {story.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <p className="mission">My mission: {person.mission.toLowerCase().replace(/\.$/, "")}.</p>
            </div>
          </div>
          <div className="wrap">
            <ul className="pillars">
              {pillars.map((pillar) => (
                <li key={pillar.title}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section wrap" id="experience" aria-labelledby="experience-title">
          <div className="section-head">
            <p className="eyebrow">Experience</p>
            <h2 id="experience-title">From design to applied AI</h2>
          </div>
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.role + job.period}>
                <p className="timeline-period">{job.period}</p>
                <div>
                  <h3>{job.role}</h3>
                  <p className="timeline-org">{job.org}</p>
                  <ul>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <div className="two-col">
            <div>
              <h3 className="subhead">Education</h3>
              <ul className="ledger">
                {education.map((item) => (
                  <li key={item.title}>
                    <div>
                      <p className="ledger-title">{item.title}</p>
                      <p className="ledger-sub">
                        {item.org}
                        {item.note && <> · {item.note}</>}
                      </p>
                    </div>
                    <p className="ledger-date">{item.period}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="subhead">Certificates &amp; honors</h3>
              <ul className="ledger">
                {credentials.map((item) => (
                  <li key={item.title}>
                    <div>
                      <p className="ledger-title">{item.title}</p>
                      <p className="ledger-sub">{item.issuer}</p>
                    </div>
                    <p className="ledger-date">{item.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="subhead">Toolkit</h3>
          <ul className="tags tags-large" aria-label="Toolkit">
            {toolkit.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="section twin" id="twin" aria-labelledby="twin-title">
          <div className="wrap twin-grid">
            <div className="section-head">
              <p className="eyebrow">Digital Twin</p>
              <h2 id="twin-title">Ask me anything about my work</h2>
              <p>
                This AI answers questions about my projects, experience and approach, using only verified facts. It’s one of
                my projects, so trying it is also a demo.
              </p>
            </div>
            <TwinChat />
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="wrap footer-grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Let’s build something people can actually use.</h2>
            <p>I’m open to roles and collaborations in human-centered AI, applied ML, generative and agentic AI.</p>
          </div>
          <ul className="footer-links">
            <li>
              <ExternalLink href={person.linkedin} className="arrow-link">LinkedIn</ExternalLink>
            </li>
            <li>
              <ExternalLink href={person.github} className="arrow-link">GitHub</ExternalLink>
            </li>
            <li>
              <ExternalLink href={person.designArchive} className="arrow-link">Design portfolio archive</ExternalLink>
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
