/**
 * Content facade — server-side helpers that pull from WordPress with
 * mock-data fallback. Pages should import from here instead of touching
 * the WP client directly, so the mock fallback is consistent everywhere.
 */
import type { Article, Author, Category } from "./types";
import {
  articles as mockArticles,
  authors as mockAuthors,
  categories as mockCategories,
  searchArticles as mockSearchArticles,
  getArticlesByCategory as mockGetArticlesByCategory,
  getArticlesByAuthor as mockGetArticlesByAuthor,
  getAuthorBySlug as mockGetAuthorBySlug,
} from "./data";
import {
  getPosts,
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

const LIVE = !!process.env.NEXT_PUBLIC_WP_URL;

// Surface WP fetch failures in Vercel function logs. Each helper still falls
// back to mock data so the site stays up, but errors no longer disappear.
function logWp(scope: string, err: unknown): void {
  console.error(`[content:${scope}] WP fetch failed:`, err);
}

export async function fetchArticles(perPage = 20): Promise<Article[]> {
  try {
    const wp = await getPosts(perPage);
    if (wp.length > 0) return wp.map(wpPostToArticle);
  } catch (err) {
    logWp("fetchArticles", err);
  }
  return mockArticles.slice(0, perPage);
}

export async function fetchArticlesByCategory(
  slug: string,
  perPage = 30
): Promise<{ category: Category | null; articles: Article[] }> {
  try {
    const wpCat = await wpGetCategoryBySlug(slug);
    if (wpCat) {
      const wpPosts = await wpGetPostsByCategory(wpCat.id, perPage);
      return {
        category: wpCategoryToCategory(wpCat),
        articles: wpPosts.map(wpPostToArticle),
      };
    }
  } catch (err) {
    logWp("fetchArticlesByCategory", err);
  }
  const mockCat = mockCategories.find((c) => c.slug === slug) ?? null;
  return {
    category: mockCat,
    articles: mockCat ? mockGetArticlesByCategory(slug) : [],
  };
}

export async function fetchAuthorBySlug(
  slug: string
): Promise<{ author: Author | null; articles: Article[] }> {
  try {
    const wpUser = await wpGetAuthorBySlug(slug);
    if (wpUser) {
      const wpPosts = await wpGetPostsByAuthor(wpUser.id, 30);
      return {
        author: wpAuthorToAuthor(wpUser),
        articles: wpPosts.map(wpPostToArticle),
      };
    }
  } catch (err) {
    logWp("fetchAuthorBySlug", err);
  }
  const mockA = mockGetAuthorBySlug(slug) ?? null;
  return {
    author: mockA,
    articles: mockA ? mockGetArticlesByAuthor(mockA.id) : [],
  };
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const wp = await wpGetCategories();
    if (wp.length > 0) return wp.map(wpCategoryToCategory);
  } catch (err) {
    logWp("fetchCategories", err);
  }
  return mockCategories;
}

export async function fetchAuthors(): Promise<Author[]> {
  try {
    const wp = await wpGetAuthors();
    if (wp.length > 0) return wp.map(wpAuthorToAuthor);
  } catch (err) {
    logWp("fetchAuthors", err);
  }
  return mockAuthors;
}

type PopularPeriod = "today" | "twoDays" | "week";

export async function fetchPopularByPeriod(
  perBucket = 5
): Promise<Record<PopularPeriod, Article[]>> {
  // Pull a wide pool so the top-N per period has something to choose from.
  const pool = await fetchArticles(50);
  const sortBy = (period: PopularPeriod) =>
    [...pool]
      .sort((a, b) => (b.views?.[period] ?? 0) - (a.views?.[period] ?? 0))
      .slice(0, perBucket);
  return {
    today: sortBy("today"),
    twoDays: sortBy("twoDays"),
    week: sortBy("week"),
  };
}

export async function fetchSearch(query: string): Promise<Article[]> {
  const q = query.trim();
  if (!q) {
    return fetchArticles(30);
  }
  try {
    const wp = await wpSearchPosts(q, 30);
    if (wp.length >= 0) return wp.map(wpPostToArticle);
  } catch (err) {
    logWp("fetchSearch", err);
  }
  return mockSearchArticles(q);
}

export const IS_LIVE = LIVE;
