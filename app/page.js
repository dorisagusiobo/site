"use client";

import { useEffect, useRef, useState } from "react";

const Arrow = ({ diagonal = false }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d={diagonal ? "M4 16 16 4M7 4h9v9" : "M3 10h14M12 5l5 5-5 5"} />
  </svg>
);

const LinkedIn = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.5 8.2V18M6.5 5.2v.1M10.6 18v-5.5c0-2.8 4.1-3 4.1 0V18M10.6 8.2V18M3 3h18v18H3z" />
  </svg>
);

const capabilities = [
  ["01", "Agentic AI", "Multi-agent systems that reason, collaborate, and move complex work forward."],
  ["02", "LLM Engineering", "Evaluation, orchestration, memory, and feedback loops built for production."],
  ["03", "Cloud Architecture", "Scalable, observable AI infrastructure across AWS Bedrock and SageMaker."],
  ["04", "Product Thinking", "Technical depth grounded in UX, design systems, and measurable human impact."],
];

const journey = [
  {
    period: "2023 — NOW",
    role: "AI Engineer",
    company: "CapacityBay Inc.",
    copy: "Designing agentic systems, integrating LLM features into SaaS products, and building Python frameworks for autonomous decision-making.",
    tags: ["Multi-agent flows", "LLM evaluation", "AWS", "Python"],
    active: true,
  },
  {
    period: "2019 — 2023",
    role: "Software & Systems Consultant",
    company: "CapacityBay Inc.",
    copy: "Shipped secure web applications, cloud analytics dashboards, reusable design systems, and AI-enhanced client solutions.",
    tags: ["Cloud systems", "SaaS", "Analytics", "UX"],
  },
  {
    period: "2017 — 2018",
    role: "User Experience Designer",
    company: "Independent / Fiverr",
    copy: "Led discovery and user research, translated complex challenges into clear design objectives, and built cohesive visual systems.",
    tags: ["Research", "Figma", "Design systems"],
  },
];

const education = [
  ["2025 — 2026", "M.S. Artificial Intelligence / Machine Learning", "Colorado State University Global"],
  ["2025", "Generative AI Certificate", "Johns Hopkins Whiting School of Engineering"],
  ["2005 — 2009", "B.A. Graphic Design", "Imo State University"],
];

const futureWork = [
  ["Agent Systems", "Orchestration / Automation", "01"],
  ["Intelligent SaaS", "Generative AI / Product", "02"],
  ["AI Infrastructure", "Cloud / Scale", "03"],
];

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && element.classList.add("is-visible"),
      { threshold: 0.12 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--delay": `${delay}ms` }}>
      {children}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["About", "Expertise", "Journey", "Portfolio"];

  return (
    <header className="nav-wrap">
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Doris Agusiobo-Echianu, home">
          <span className="brand-mark">D<span>/</span>A</span>
          <span className="brand-name">Doris Agusiobo-Echianu</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
              {link}
            </a>
          ))}
          <a
            className="nav-social"
            href="https://www.linkedin.com/in/doris-agusiobo-echianu-83571764"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <Arrow diagonal />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default function Home() {
  useEffect(() => {
    const onMove = (event) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <main id="top">
      <div className="cursor-glow" aria-hidden="true" />
      <Nav />

      <section className="hero shell">
        <div className="hero-copy">
          <Reveal>
            <div className="eyebrow"><span /> AI/ML ENGINEER · BALTIMORE, MD</div>
          </Reveal>
          <Reveal delay={80}>
            <h1>I build AI systems that <em>think, act</em> &amp; ship.</h1>
          </Reveal>
          <Reveal delay={160} className="hero-bottom">
            <p>
              Turning frontier models into dependable products — through agentic engineering,
              scalable cloud architecture, and sharp product instinct.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#journey">Explore my work <Arrow /></a>
              <a className="text-link" href="#about">More about me <Arrow diagonal /></a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={220} className="hero-visual">
          <div className="signal-card">
            <div className="signal-top">
              <span>AI SYSTEMS / 2026</span>
              <span className="availability"><i /> AVAILABLE FOR IMPACT</span>
            </div>
            <div className="orbital" aria-hidden="true">
              <div className="orbital-grid" />
              <div className="orbit orbit-a"><i /></div>
              <div className="orbit orbit-b"><i /></div>
              <div className="core"><span>DA</span></div>
              <span className="coord coord-a">39.29° N</span>
              <span className="coord coord-b">76.61° W</span>
            </div>
            <div className="signal-bottom">
              <span>AGENTIC SYSTEMS</span><span>LLM ORCHESTRATION</span><span>AWS CLOUD</span>
            </div>
          </div>
        </Reveal>

        <div className="hero-index" aria-hidden="true">01 / 05</div>
      </section>

      <section className="proof-bar" aria-label="Career highlights">
        <div className="shell proof-grid">
          <div><strong>5+</strong><span>YEARS IN AI &amp;<br />SCALABLE SYSTEMS</span></div>
          <div><strong>3</strong><span>DISCIPLINES<br />ENGINEERING · CLOUD · UX</span></div>
          <div><strong>∞</strong><span>CURIOSITY<br />BUILT INTO THE PROCESS</span></div>
          <div className="proof-statement">From idea <i /> to intelligent<br />infrastructure.</div>
        </div>
      </section>

      <section className="about section shell" id="about">
        <Reveal className="section-label"><span>01</span> ABOUT</Reveal>
        <div className="about-grid">
          <Reveal delay={60}>
            <p className="lead">
              I engineer the bridge between <span>AI possibility</span> and production reality.
            </p>
          </Reveal>
          <Reveal delay={130} className="about-copy">
            <p>
              I’m Doris — a Generative AI Engineer with a background that moves from graphic design
              to software systems to applied artificial intelligence. That range shapes how I work:
              technically rigorous, deeply human, and always anchored in the product experience.
            </p>
            <p>
              Today, I build reliable agentic applications, orchestrate LLM workflows, and architect
              cloud systems that automate complex work. I care about what happens after the demo:
              observability, cost, trust, and real-world impact.
            </p>
            <a className="text-link" href="#journey">Trace my journey <Arrow diagonal /></a>
          </Reveal>
        </div>
      </section>

      <section className="expertise section" id="expertise">
        <div className="shell">
          <Reveal className="section-label light"><span>02</span> EXPERTISE</Reveal>
          <Reveal>
            <div className="section-heading-row">
              <h2>Built for the<br /><em>hard parts.</em></h2>
              <p>Strategy through deployment.<br />Signal through noise.</p>
            </div>
          </Reveal>
          <div className="capability-list">
            {capabilities.map(([number, title, copy], index) => (
              <Reveal key={title} delay={index * 70}>
                <article className="capability">
                  <span className="cap-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <div className="cap-arrow"><Arrow diagonal /></div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="toolkit">
              <span>CORE TOOLKIT</span>
              <div>Python</div><i /> <div>LangChain</div><i /> <div>CrewAI</div><i />
              <div>OpenAI</div><i /> <div>AWS Bedrock</div><i /> <div>SageMaker</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="journey section shell" id="journey">
        <Reveal className="section-label"><span>03</span> CAREER JOURNEY</Reveal>
        <Reveal>
          <div className="section-heading-row dark-heading">
            <h2>Evolution,<br /><em>by design.</em></h2>
            <p>A career shaped by making complex<br />technology feel purposeful.</p>
          </div>
        </Reveal>

        <div className="timeline">
          {journey.map((item, index) => (
            <Reveal key={item.role} delay={index * 80}>
              <article className={`timeline-item ${item.active ? "active" : ""}`}>
                <div className="time-period">{item.period}{item.active && <span>ACTIVE</span>}</div>
                <div className="time-role"><h3>{item.role}</h3><p>{item.company}</p></div>
                <p className="time-copy">{item.copy}</p>
                <div className="time-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="education-block">
            <div className="education-title"><span>CONTINUOUS<br />LEARNING</span><div className="asterisk">✳</div></div>
            <div className="education-list">
              {education.map(([date, degree, school]) => (
                <div className="education-item" key={degree}>
                  <span>{date}</span><strong>{degree}</strong><p>{school}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="portfolio section" id="portfolio">
        <div className="shell">
          <Reveal className="section-label light"><span>04</span> SELECTED WORK</Reveal>
          <Reveal>
            <div className="portfolio-heading">
              <h2>Case studies are<br /><em>taking shape.</em></h2>
              <div><span className="pulse" /> PORTFOLIO IN PROGRESS</div>
            </div>
          </Reveal>
          <div className="work-grid">
            {futureWork.map(([title, type, number], index) => (
              <Reveal key={title} delay={index * 90}>
                <article className={`work-card work-${index + 1}`}>
                  <div className="work-art" aria-hidden="true">
                    <span className="work-number">{number}</span>
                    <div className="work-shape" />
                    <span className="confidential">CASE FILE / {number}</span>
                  </div>
                  <div className="work-meta">
                    <div><span>{type}</span><h3>{title}</h3></div>
                    <span className="soon">COMING SOON</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <a
              className="archive-link"
              href="https://dorisagusiobo.squarespace.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span>Visit the current portfolio archive</span><Arrow diagonal />
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="shell">
          <div className="footer-topline"><span>05 / CONTACT</span><span>BALTIMORE, MARYLAND · USA</span></div>
          <Reveal>
            <div className="footer-cta">
              <p>HAVE AN AMBITIOUS AI PROBLEM?</p>
              <h2>Let’s build what’s<br /><em>next.</em></h2>
              <a
                className="round-link"
                href="https://www.linkedin.com/in/doris-agusiobo-echianu-83571764"
                target="_blank"
                rel="noreferrer"
                aria-label="Connect with Doris on LinkedIn"
              ><Arrow diagonal /></a>
            </div>
          </Reveal>
          <div className="footer-bottom">
            <div className="footer-brand">DORIS<br />AGUSIOBO-<br />ECHIANU</div>
            <div className="footer-note">AI/ML ENGINEER<br />AGENTIC SYSTEMS · CLOUD ARCHITECTURE</div>
            <div className="footer-links">
              <a href="https://www.linkedin.com/in/doris-agusiobo-echianu-83571764" target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn</a>
              <a href="https://dorisagusiobo.squarespace.com/" target="_blank" rel="noreferrer">Portfolio <Arrow diagonal /></a>
            </div>
          </div>
          <div className="copyright"><span>© {new Date().getFullYear()} DORIS AGUSIOBO-ECHIANU</span><span>ENGINEERED WITH INTENTION</span></div>
        </div>
      </footer>
    </main>
  );
}
