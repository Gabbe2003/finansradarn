import type { MetadataRoute } from "next";
import { categories } from "@/lib/data";
import { getPosts } from "@/lib/wordpress/client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://finansradarn.se";

const STATIC_ROUTES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { path: "/", changeFrequency: "hourly", priority: 1.0 },
  { path: "/verktyg", changeFrequency: "weekly", priority: 0.9 },
  { path: "/jamfor", changeFrequency: "weekly", priority: 0.8 },
  { path: "/jamfor/bolaneranta", changeFrequency: "weekly", priority: 0.8 },
  { path: "/jamfor/isk", changeFrequency: "weekly", priority: 0.8 },
  { path: "/ordlista", changeFrequency: "monthly", priority: 0.6 },
];

const TOOL_SLUGS = [
  "bolanekalkylator",
  "break-even",
  "budget",
  "fire-kalkylator",
  "fondavgifter",
  "hyra-vs-kopa",
  "inflationskalkylator",
  "isk-skatt",
  "lonekalkylator",
  "pensionskalkylator",
  "ranta-pa-ranta",
  "roi-beraknare",
  "skuldavbetalning",
  "sparandekalkylator",
  "utdelningskalkylator",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const toolEntries: MetadataRoute.Sitemap = TOOL_SLUGS.map((slug) => ({
    url: `${SITE_URL}/verktyg/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts(100);
    articleEntries = posts.map((post) => ({
      url: `${SITE_URL}/article/${post.slug}`,
      lastModified: post.modified ? new Date(post.modified) : new Date(post.date),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // WP unreachable at build time — fall back to no article entries.
    // ISR will pick them up on subsequent regenerations.
  }

  return [...staticEntries, ...toolEntries, ...categoryEntries, ...articleEntries];
}
