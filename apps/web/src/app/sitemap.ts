import type { MetadataRoute } from "next";
import { fetchCategories, fetchAuthors } from "@/lib/content";
import { getPosts } from "@/lib/wordpress/client";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://finansradarn.se").replace(/\/+$/, "");

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
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

/**
 * Dynamic sitemap. Auto-includes every published WP post + live categories +
 * live authors, plus the static marketing/tool pages. Regenerated as part of
 * each ISR pass (revalidate windows are inherited from the underlying fetch
 * calls in lib/content + lib/wordpress/client).
 */
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

  // Live categories (falls back to mock automatically via the facade).
  const categories = await fetchCategories();
  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  // Live authors (falls back to mock).
  const authors = await fetchAuthors();
  const authorEntries: MetadataRoute.Sitemap = authors
    .filter((a) => !!a.slug)
    .map((a) => ({
      url: `${SITE_URL}/author/${a.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    }));

  // Articles — use the raw WP client so we can read `post.modified` for
  // an accurate lastmod (the facade discards the modified date).
  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts(100);
    articleEntries = posts.map((post) => ({
      url: `${SITE_URL}/article/${post.slug}`,
      lastModified: post.modified ? new Date(post.modified) : new Date(post.date),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (err) {
    // Surface the WP failure in Vercel function logs so future env / network
    // problems don't silently produce an empty article list.
    console.error("[sitemap] WP getPosts failed:", err);
  }

  return [
    ...staticEntries,
    ...toolEntries,
    ...categoryEntries,
    ...authorEntries,
    ...articleEntries,
  ];
}
