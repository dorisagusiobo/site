import Image from "next/image";
import Link from "next/link";

import { carebridge, carebridgeBlueprint, carebridgeImages } from "@/lib/carebridge";
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

const cardLabels = {
  built: "",
  context: "Outside the app",
  risk: "Fail point",
  next: "Not built yet",
};

function Blueprint({ data }) {
  const columns = data.stages.length + 1;
  return (
    <div className="blueprint">
      <ul className="blueprint-legend" aria-label="Legend">
        <li><span className="bp-swatch bp-built" aria-hidden="true" />Built in CareBridge today</li>
        <li><span className="bp-swatch bp-context" aria-hidden="true" />Hospital side, outside the app</li>
        <li><span className="bp-swatch bp-risk" aria-hidden="true" />Fail point</li>
        <li><span className="bp-swatch bp-next" aria-hidden="true" />Opportunity, not built yet</li>
      </ul>
      <div className="blueprint-scroll" role="region" aria-label="CareBridge service blueprint" tabIndex={0}>
        <table className="blueprint-table">
          <caption className="visually-hidden">
            CareBridge service blueprint: six stages from leaving the hospital to acting on a warning sign, across six lanes
          </caption>
          <thead>
            <tr>
              <td className="bp-corner" />
              {data.stages.map((stage, i) => (
                <th key={stage} scope="col">
                  <span className="bp-stage-number">Stage {i + 1}</span>
                  {stage}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.lanes.flatMap((lane) => {
              const rows = [
                <tr key={lane.name}>
                  <th scope="row">
                    {lane.name}
                    <span className="bp-lane-note">{lane.note}</span>
                  </th>
                  {lane.cells.map((cards, i) => (
                    <td key={data.stages[i]}>
                      {cards.map((card) => (
                        <p key={card.text} className={`bp-card bp-${card.kind}`}>
                          {cardLabels[card.kind] && <span className="bp-card-label">{cardLabels[card.kind]}</span>}
                          {card.text}
                        </p>
                      ))}
                    </td>
                  ))}
                </tr>,
              ];
              if (lane.lineAfter) {
                rows.push(
                  <tr key={lane.lineAfter} className="bp-line">
                    <td colSpan={columns}>
                      <span>{lane.lineAfter}</span>
                    </td>
                  </tr>,
                );
              }
              return rows;
            })}
          </tbody>
        </table>
      </div>
      <p className="blueprint-hint">Scroll sideways to see all six stages.</p>
    </div>
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
          <Link href="/work/carebridge/demo" className="button button-primary">
            Try the instant demo
          </Link>
          <ExternalButton href={item.live}>Try the live app</ExternalButton>
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
            {section.blueprint && <Blueprint data={carebridgeBlueprint} />}
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
