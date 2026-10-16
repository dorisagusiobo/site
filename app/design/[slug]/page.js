import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { designCases, getDesignCase } from "@/lib/design";
import { person } from "@/lib/profile";

export const dynamicParams = false;

export async function generateStaticParams() {
  return designCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getDesignCase(slug);
  if (!item) return {};
  const title = `${item.title} case study · ${person.name}`;
  return {
    title,
    description: item.summary,
    alternates: { canonical: `/design/${slug}` },
    openGraph: { url: `/design/${slug}`, title, description: item.summary, images: [item.cover.src] },
    twitter: { card: "summary_large_image", title, description: item.summary, images: [item.cover.src] },
  };
}

export default async function DesignCase({ params }) {
  const { slug } = await params;
  const item = getDesignCase(slug);
  if (!item) notFound();

  const index = designCases.indexOf(item);
  const next = designCases[(index + 1) % designCases.length];

  return (
    <article className="study">
      <header className="study-hero wrap">
        <Link href="/design" className="study-back">
          All case studies
        </Link>
        <p className="eyebrow">{item.kind}</p>
        <h1>{item.title}</h1>
        <p className="design-lede">{item.summary}</p>
        <dl className="study-meta">
          <div>
            <dt>Role</dt>
            <dd>{item.role}</dd>
          </div>
          {item.tools && (
            <div>
              <dt>Tools</dt>
              <dd>{item.tools}</dd>
            </div>
          )}
          {item.outcome && (
            <div className="study-meta-outcome">
              <dt>Outcome</dt>
              <dd>
                {item.outcome.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </dd>
            </div>
          )}
        </dl>
        {item.note && <p className="study-note">{item.note}</p>}
      </header>

      <figure className="study-cover wrap">
        <Image
          src={item.cover.src}
          width={item.cover.width}
          height={item.cover.height}
          alt={item.cover.alt}
          sizes="(max-width: 1160px) 100vw, 1120px"
          priority
        />
      </figure>

      <div className="wrap study-body">
        {item.sections.map((section) => (
          <section key={section.heading} className="study-section">
            <h2>{section.heading}</h2>
            <div className="study-content">
              {section.body?.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
              {section.quote && <blockquote className="study-quote">{section.quote}</blockquote>}
              {section.bullets && (
                <ul className="study-list">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.takeaways && (
                <div className="study-takeaways">
                  <p className="case-kind">Key takeaways</p>
                  <ul>
                    {section.takeaways.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {section.images && (
              <div className={`study-images study-images-${Math.min(section.images.length, 2)}`}>
                {section.images.map((image) => (
                  <figure key={image.src}>
                    <Image
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      sizes={section.images.length > 1 ? "(max-width: 760px) 100vw, 560px" : "(max-width: 1160px) 100vw, 1120px"}
                    />
                  </figure>
                ))}
              </div>
            )}
          </section>
        ))}

        {item.links && (
          <section className="study-section">
            <h2>See the files</h2>
            <ul className="study-links">
              {item.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="arrow-link" target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <nav className="wrap study-next" aria-label="Next case study">
        <Link href={`/design/${next.slug}`}>
          <span className="eyebrow">Next case study</span>
          <span className="study-next-title">{next.title}</span>
          <span className="arrow-link">{next.kind}</span>
        </Link>
      </nav>
    </article>
  );
}
