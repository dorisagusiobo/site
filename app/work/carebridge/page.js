import Image from "next/image";
import Link from "next/link";

import { carebridge, carebridgeImages } from "@/lib/carebridge";
import { person } from "@/lib/profile";

const title = `CareBridge case study · ${person.name}`;

export const metadata = {
  title,
  description: carebridge.summary,
  alternates: { canonical: "/work/carebridge" },
  openGraph: {
    url: "/work/carebridge",
    title,
    description: carebridge.summary,
    images: [carebridgeImages.warnings.src],
  },
  twitter: { card: "summary_large_image", title, description: carebridge.summary, images: [carebridgeImages.warnings.src] },
};

function ExternalButton({ href, children, primary = false }) {
  return (
    <a
      href={href}
      className={`button ${primary ? "button-primary" : "button-secondary"}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

export default function CareBridgeCase() {
  const item = carebridge;

  return (
    <article className="study">
      <header className="study-hero wrap">
        <Link href="/#work" className="study-back">
          All work
        </Link>
        <p className="eyebrow">{item.kind}</p>
        <h1>{item.title}</h1>
        <p className="design-lede">{item.summary}</p>
        <div className="hero-actions">
          <ExternalButton href={item.live} primary>
            Try the live demo
          </ExternalButton>
          <ExternalButton href={item.code}>Read the code</ExternalButton>
        </div>
        <dl className="study-meta">
          {item.meta.map((entry) => (
            <div key={entry.label}>
              <dt>{entry.label}</dt>
              <dd>{entry.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="wrap">
        <ul className="study-stats" aria-label="At a glance">
          {item.stats.map((stat) => (
            <li key={stat.label}>
              <span className="result-value">{stat.value}</span>
              <span className="result-label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="wrap study-body">
        {item.sections.map((section) => (
          <section key={section.heading} className="study-section">
            <h2>{section.heading}</h2>
            <div className="study-content">
              {section.body?.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul className="study-list">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 40)}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
            {section.images && (
              <div className={`study-images study-shots study-images-${Math.min(section.images.length, 2)}`}>
                {section.images.map((key) => {
                  const image = carebridgeImages[key];
                  return (
                    <figure key={key}>
                      <Image
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                        sizes="(max-width: 760px) 100vw, 480px"
                      />
                      <figcaption>{image.alt}</figcaption>
                    </figure>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </div>

      <nav className="wrap study-next" aria-label="More work">
        <Link href="/design">
          <span className="eyebrow">Before AI, design</span>
          <span className="study-next-title">UI/UX case studies</span>
          <span className="arrow-link">See the design work</span>
        </Link>
      </nav>
    </article>
  );
}
