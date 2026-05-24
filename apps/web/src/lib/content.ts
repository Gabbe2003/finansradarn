/**
 * Content facade — server-side helpers that pull from WordPress.
 * Pages should import from here instead of touching the WP client directly.
 */
import type { Article, Author, Category } from "./types";
import {
  getPosts,
  getPostsByIds as wpGetPostsByIds,
  getPostsByCategory as wpGetPostsByCategory,
  getPostsByAuthor as wpGetPostsByAuthor,
  getCategories as wpGetCategories,
  getCategoryBySlug as wpGetCategoryBySlug,
  getAuthors as wpGetAuthors,
  getAuthorBySlug as wpGetAuthorBySlug,
  searchPosts as wpSearchPosts,
  wpPostToArticle,
  wpCategoryToCategory,
  wpAuthorToAuthor,
} from "./wordpress/client";

// Bare WP origin for the post-views-tracker plugin endpoints, which live
// under /wp-json/post-views/v1/* rather than the standard /wp/v2 namespace.
const RAW_WP_BASE = (process.env.NEXT_PUBLIC_WP_URL || "https://finansradarn.se").trim();
const WP_BASE = RAW_WP_BASE.replace(/\/+$/, "").replace(/\/wp-json(\/wp\/v2)?$/, "");

function logWp(scope: string, err: unknown): void {
  console.error(`[content:${scope}] WP fetch failed:`, err);
}

export async function fetchArticles(perPage = 20): Promise<Article[]> {
  try {
    const wp = await getPosts(perPage);
    return wp.map(wpPostToArticle);
  } catch (err) {
    logWp("fetchArticles", err);
    return [];
  }
}

export async function fetchArticlesByCategory(
  slug: string,
  perPage = 30
): Promise<{ category: Category | null; articles: Article[] }> {
  try {
    const wpCat = await wpGetCategoryBySlug(slug);
    if (!wpCat) return { category: null, articles: [] };
    const wpPosts = await wpGetPostsByCategory(wpCat.id, perPage);
    return {
      category: wpCategoryToCategory(wpCat),
      articles: wpPosts.map(wpPostToArticle),
    };
  } catch (err) {
    logWp("fetchArticlesByCategory", err);
    return { category: null, articles: [] };
  }
}

export async function fetchAuthorBySlug(
  slug: string
): Promise<{ author: Author | null; articles: Article[] }> {
  try {
    const wpUser = await wpGetAuthorBySlug(slug);
    if (!wpUser) return { author: null, articles: [] };
    const wpPosts = await wpGetPostsByAuthor(wpUser.id, 30);
    return {
      author: wpAuthorToAuthor(wpUser),
      articles: wpPosts.map(wpPostToArticle),
    };
  } catch (err) {
    logWp("fetchAuthorBySlug", err);
    return { author: null, articles: [] };
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const wp = await wpGetCategories();
    return wp.map(wpCategoryToCategory);
  } catch (err) {
    logWp("fetchCategories", err);
    return [];
  }
}

export async function fetchAuthors(): Promise<Author[]> {
  try {
    const wp = await wpGetAuthors();
    return wp.map(wpAuthorToAuthor);
  } catch (err) {
    logWp("fetchAuthors", err);
    return [];
  }
}

type PopularPeriod = "today" | "twoDays" | "week";
type PvtPeriod = "1day" | "2day" | "1week";

const PVT_PERIOD: Record<PopularPeriod, PvtPeriod> = {
  today: "1day",
  twoDays: "2day",
  week: "1week",
};

type PvtPopularItem = {
  id: number;
  period_views: number;
  total_views: number;
};

async function fetchPopularIds(
  period: PopularPeriod,
  limit: number
): Promise<Array<{ id: number; views: number }>> {
  const apiPeriod = PVT_PERIOD[period];
  try {
    const res = await fetch(
      `${WP_BASE}/wp-json/post-views/v1/popular?period=${apiPeriod}&limit=${limit}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { items?: PvtPopularItem[] };
    return (data.items ?? []).map((i) => ({ id: i.id, views: i.period_views }));
  } catch (err) {
    logWp(`fetchPopularIds:${period}`, err);
    return [];
  }
}

export async function fetchPopularByPeriod(
  perBucket = 5
): Promise<Record<PopularPeriod, Article[]>> {
  const [todayList, twoDaysList, weekList] = await Promise.all([
    fetchPopularIds("today", perBucket),
    fetchPopularIds("twoDays", perBucket),
    fetchPopularIds("week", perBucket),
  ]);

  const allIds = Array.from(
    new Set([...todayList, ...twoDaysList, ...weekList].map((x) => x.id))
  );

  const articlesById = new Map<number, Article>();
  if (allIds.length > 0) {
    try {
      const wpPosts = await wpGetPostsByIds(allIds);
      for (const p of wpPosts) articlesById.set(p.id, wpPostToArticle(p));
    } catch (err) {
      logWp("fetchPopularByPeriod:batch", err);
    }
  }

  const build = (
    bucket: Array<{ id: number; views: number }>,
    period: PopularPeriod
  ): Article[] =>
    bucket
      .map(({ id, views }) => {
        const base = articlesById.get(id);
        if (!base) return null;
        return { ...base, views: { ...base.views, [period]: views } };
      })
      .filter((a): a is Article => a !== null);

  return {
    today: build(todayList, "today"),
    twoDays: build(twoDaysList, "twoDays"),
    week: build(weekList, "week"),
  };
}

export async function fetchSearch(query: string): Promise<Article[]> {
  const q = query.trim();
  if (!q) return fetchArticles(30);
  try {
    const wp = await wpSearchPosts(q, 30);
    return wp.map(wpPostToArticle);
  } catch (err) {
    logWp("fetchSearch", err);
    return [];
  }
}

/**
 * Related posts for a given article: same WP category first, then recent posts.
 */
export async function fetchRelatedArticles(
  currentId: string,
  categorySlug: string,
  limit = 3
): Promise<Article[]> {
  const out: Article[] = [];
  try {
    const wpCat = await wpGetCategoryBySlug(categorySlug);
    if (wpCat) {
      const same = await wpGetPostsByCategory(wpCat.id, limit + 1);
      for (const p of same) {
        if (String(p.id) === currentId) continue;
        out.push(wpPostToArticle(p));
        if (out.length >= limit) return out;
      }
    }
  } catch (err) {
    logWp("fetchRelatedArticles:sameCategory", err);
  }
  // Top up with recent posts if same-category didn't yield enough.
  if (out.length < limit) {
    try {
      const recent = await getPosts(limit + out.length + 1);
      for (const p of recent) {
        if (String(p.id) === currentId) continue;
        if (out.some((a) => a.id === String(p.id))) continue;
        out.push(wpPostToArticle(p));
        if (out.length >= limit) break;
      }
    } catch (err) {
      logWp("fetchRelatedArticles:recent", err);
    }
  }
  return out;
}
