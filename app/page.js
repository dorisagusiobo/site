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
  const links = [
    ["About", "about"],
    ["Expertise", "expertise"],
    ["Journey", "journey"],
    ["Portfolio", "portfolio"],
    ["Digital Twin", "twin"],
  ];

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
          {links.map(([label, href]) => (
            <a key={href} href={`#${href}`} onClick={() => setOpen(false)}>
              {label}
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

const starterQuestions = [
  { label: "Career story", prompt: "Walk me through your career journey." },
  { label: "AI expertise", prompt: "What kind of AI systems do you build?" },
  { label: "Best-fit roles", prompt: "What roles are you a strong fit for?" },
];

const Sparkles = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3c.5 4.8 2.2 6.5 7 7-4.8.5-6.5 2.2-7 7-.5-4.8-2.2-6.5-7-7 4.8-.5 6.5-2.2 7-7Z" />
    <path d="M19 16c.2 2.1.9 2.8 3 3-2.1.2-2.8.9-3 3-.2-2.1-.9-2.8-3-3 2.1-.2 2.8-.9 3-3Z" />
  </svg>
);

const Close = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="m5 5 10 10M15 5 5 15" />
  </svg>
);

const Reset = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4.2 7.2A6.5 6.5 0 1 1 3.8 12M4 3v4.5h4.5" />
  </svg>
);

function DigitalTwinWidget({ open, onOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const conversationRef = useRef(null);
  const inputRef = useRef(null);
  const messageIdRef = useRef(0);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.classList.add("twin-widget-open");
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 260);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("twin-widget-open");
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  useEffect(() => {
    const conversation = conversationRef.current;
    if (conversation) conversation.scrollTop = conversation.scrollHeight;
  }, [messages, loading]);

  async function sendMessage(text) {
    const content = text.trim();
    if (!content || loading) return;

    const nextMessages = [
      ...messages,
      { id: `user-${++messageIdRef.current}`, role: "user", content },
    ];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Unable to reach the Digital Twin.");
      setMessages((current) => [
        ...current,
        { id: `assistant-${++messageIdRef.current}`, role: "assistant", content: data.reply },
      ]);
    } catch (requestError) {
      setError(requestError.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  function resetConversation() {
    setMessages([]);
    setInput("");
    setError("");
    inputRef.current?.focus();
  }

  return (
    <>
      <button
        className={`twin-launcher ${open ? "is-hidden" : ""}`}
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="twin-launcher-orb" aria-hidden="true"><Sparkles /></span>
        <span className="twin-launcher-copy">
          <strong>Ask Doris AI</strong>
          <small>Career digital twin</small>
        </span>
        <span className="twin-launcher-arrow" aria-hidden="true"><Arrow diagonal /></span>
      </button>

      <div className={`twin-widget ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <button className="twin-backdrop" type="button" onClick={onClose} aria-label="Close Digital Twin" />
        <aside
          className="twin-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="twin-panel-title"
        >
          <header className="twin-panel-header">
            <div className="twin-identity">
              <div className="twin-mini-orb" aria-hidden="true"><span /><span /><Sparkles /></div>
              <div>
                <div className="twin-name-row">
                  <h2 id="twin-panel-title">Doris AI</h2>
                  <span className="twin-beta">TWIN</span>
                </div>
                <p><i /> Online · Career intelligence</p>
              </div>
            </div>
            <div className="twin-panel-actions">
              <button type="button" onClick={resetConversation} disabled={loading} aria-label="Start a new conversation">
                <Reset />
              </button>
              <button type="button" onClick={onClose} aria-label="Close Digital Twin">
                <Close />
              </button>
            </div>
          </header>

          <div className="twin-context-bar">
            <span>Career</span><i /> <span>Experience</span><i /> <span>Skills</span><i /> <span>Education</span>
          </div>

          <div className="twin-conversation" ref={conversationRef} aria-live="polite">
            {messages.length === 0 && (
              <div className="twin-welcome">
                <div className="twin-welcome-orb" aria-hidden="true">
                  <div className="twin-orb-ring" />
                  <span>DA</span>
                </div>
                <p className="twin-overline">MEET THE DIGITAL TWIN</p>
                <h3>Curious about<br />my career?</h3>
                <p className="twin-welcome-copy">
                  I’m an AI representation of Doris. Ask about her path from design to AI,
                  engineering experience, or where she can make an impact.
                </p>
                <div className="twin-suggestions" aria-label="Suggested questions">
                  {starterQuestions.map(({ label, prompt }) => (
                    <button type="button" key={label} onClick={() => sendMessage(prompt)} disabled={loading}>
                      <span><Sparkles /> {label}</span>
                      <Arrow diagonal />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div className={`twin-message ${message.role}`} key={message.id}>
                {message.role === "assistant" && (
                  <div className="twin-message-avatar" aria-hidden="true">DA</div>
                )}
                <div className="twin-message-body">
                  <span>{message.role === "assistant" ? "DORIS AI" : "YOU"}</span>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="twin-message assistant twin-thinking">
                <div className="twin-message-avatar" aria-hidden="true">DA</div>
                <div className="twin-message-body">
                  <span>DORIS AI</span>
                  <p><i /><i /><i /></p>
                </div>
              </div>
            )}
          </div>

          <div className="twin-composer-wrap">
            {error && <p className="twin-error" role="alert">{error}</p>}
            <form className="twin-form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="twin-question">Ask Doris AI about her career</label>
              <textarea
                ref={inputRef}
                id="twin-question"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Ask about my career..."
                maxLength={2000}
                rows={1}
                disabled={loading}
              />
              <button type="submit" disabled={loading || !input.trim()} aria-label="Send question">
                {loading ? <span className="twin-send-loader" /> : <Arrow />}
              </button>
            </form>
            <div className="twin-composer-meta">
              <span><Sparkles /> Powered by OpenRouter</span>
              <span>AI can make mistakes</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default function Home() {
  const [twinOpen, setTwinOpen] = useState(false);

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

      <section className="digital-twin section" id="twin">
        <div className="shell">
          <Reveal className="section-label light"><span>05</span> DIGITAL TWIN</Reveal>
          <div className="twin-grid">
            <Reveal className="twin-intro">
              <p className="twin-kicker"><span /> DORIS AI / READY TO TALK</p>
              <h2>My career,<br />in <em>conversation.</em></h2>
              <p>
                Skip the résumé scan. Ask my Digital Twin about the path from design to AI,
                the systems I build, and the work I’m ready to take on next.
              </p>
              <button className="twin-section-launch" type="button" onClick={() => setTwinOpen(true)}>
                <span>Start a conversation</span>
                <i><Arrow diagonal /></i>
              </button>
            </Reveal>
            <Reveal delay={100} className="twin-preview-wrap">
              <button className="twin-preview" type="button" onClick={() => setTwinOpen(true)} aria-label="Open Doris AI">
                <div className="twin-preview-top">
                  <span><i /> DIGITAL TWIN / ONLINE</span>
                  <span>OPEN CHAT <Arrow diagonal /></span>
                </div>
                <div className="twin-preview-visual" aria-hidden="true">
                  <div className="twin-preview-glow" />
                  <div className="twin-preview-orbit orbit-one" />
                  <div className="twin-preview-orbit orbit-two" />
                  <div className="twin-preview-core"><Sparkles /><span>DA</span></div>
                </div>
                <div className="twin-preview-prompt">
                  <Sparkles />
                  <span>“Ask where design instinct meets AI engineering.”</span>
                </div>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      <DigitalTwinWidget
        open={twinOpen}
        onOpen={() => setTwinOpen(true)}
        onClose={() => setTwinOpen(false)}
      />

      <footer className="footer" id="contact">
        <div className="shell">
          <div className="footer-topline"><span>06 / CONTACT</span><span>BALTIMORE, MARYLAND · USA</span></div>
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
