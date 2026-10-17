import { designCases } from "@/lib/design";
import { siteUrl } from "@/lib/site";

export default function sitemap() {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work/carebridge`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/design`, changeFrequency: "monthly", priority: 0.8 },
    ...designCases.map((item) => ({ url: `${siteUrl}/design/${item.slug}`, changeFrequency: "yearly", priority: 0.6 })),
  ];
}
