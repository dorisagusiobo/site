import Image from "next/image";
import Link from "next/link";

import { designCases } from "@/lib/design";
import { person } from "@/lib/profile";

const title = `Design case studies · ${person.name}`;
const description =
  "UI/UX case studies by Doris Agusiobo Echianu: user research, journey mapping, prototyping and product design for travel, insurance, tourism, marketplaces and learning.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/design" },
  openGraph: { url: "/design", title, description, images: ["/design-preview.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/design-preview.png"] },
};

export default function DesignIndex() {
  const [lead, ...rest] = designCases;
  return (
    <>
      <section className="design-hero wrap" aria-labelledby="design-title">
        <p className="eyebrow">Design case studies</p>
        <h1 id="design-title">
          Research first, <span>then pixels.</span>
        </h1>
        <p className="design-lede">
          Before AI, I designed products. These case studies show how I work: listen to people, find the real problem, and
          design until it feels simple. It’s the same process I bring to every AI system I build.
        </p>
        <ul className="design-facts" aria-label="At a glance">
          <li><strong>{designCases.length}</strong> case studies</li>
          <li><strong>10+</strong> user interviews per project</li>
          <li><strong>Figma</strong>, FigJam, Miro, Adobe XD</li>
        </ul>
      </section>

      <section className="wrap design-grid" aria-label="Case studies">
        <CaseCard item={lead} lead />
        {rest.map((item) => (
          <CaseCard key={item.slug} item={item} />
        ))}
      </section>
    </>
  );
}

function CaseCard({ item, lead = false }) {
  return (
    <article className={`design-card${lead ? " design-card-lead" : ""}`}>
      <Link href={`/design/${item.slug}`} className="design-card-link">
        <div className="design-card-media">
          <Image
            src={item.cover.src}
            width={item.cover.width}
            height={item.cover.height}
            alt={item.cover.alt}
            sizes={lead ? "(max-width: 1000px) 100vw, 1120px" : "(max-width: 700px) 100vw, 560px"}
            priority={lead}
          />
        </div>
        <div className="design-card-body">
          <p className="case-kind">{item.kind}</p>
          <h2>{item.title}</h2>
          <p>{item.summary}</p>
          <span className="arrow-link">Read the case study</span>
        </div>
      </Link>
    </article>
  );
}
