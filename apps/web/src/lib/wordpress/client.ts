import { WPPost, WPCategory, WPAuthor, WPMedia } from "./types";
import type { Article, Author, Category } from "@/lib/types";

// Accept any of: "https://cms.finansradarn.se", trailing slash, or already
// includes "/wp-json". Strip whatever the user gave us back to the bare origin.
const RAW_WP = (process.env.NEXT_PUBLIC_WP_URL || "https://finansradarn.se").trim();
const WP_URL = RAW_WP.replace(/\/+$/, "").replace(/\/wp-json(\/wp\/v2)?$/, "");
const API = `${WP_URL}/wp-json/wp/v2`;

// Cache tags — used by /api/revalidate so WordPress can purge precisely.
export const CACHE_TAGS = {
  posts: "wp:posts",
  categories: "wp:categories",
  authors: "wp:authors",
  post: (slug: string) => `wp:post:${slug}`,
  category: (slug: string) => `wp:category:${slug}`,
  author: (slug: string) => `wp:author:${slug}`,
} as const;

async function fetchAPI<T>(
  endpoint: string,
  params: Record<string, string> = {},
  opts: { revalidate?: number | false; tags?: string[] } = {}
): Promise<T> {
  const url = new URL(`${API}/${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const init: RequestInit & {
    next?: { revalidate?: number | false; tags?: string[] };
  } = {};
  if (opts.revalidate === false) {
    init.cache = "no-store";
  } else {
    init.next = {
      revalidate: opts.revalidate ?? 60,
      ...(opts.tags ? { tags: opts.tags } : {}),
    };
  }

  const res = await fetch(url.toString(), init);

  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Posts
export async function getPosts(perPage = 20, page = 1): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>(
    "posts",
    {
      per_page: String(perPage),
      page: String(page),
      _embed: "wp:featuredmedia,wp:term,author",
    },
    { revalidate: 60, tags: [CACHE_TAGS.posts] }
  );
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchAPI<WPPost[]>(
    "posts",
    {
      slug,
      _embed: "wp:featuredmedia,wp:term,author",
    },
    { revalidate: 60, tags: [CACHE_TAGS.posts, CACHE_TAGS.post(slug)] }
  );
  return posts[0] || null;
}

export async function getPostsByIds(ids: number[]): Promise<WPPost[]> {
  if (ids.length === 0) return [];
  return fetchAPI<WPPost[]>(
    "posts",
    {
      include: ids.join(","),
      orderby: "include",
      per_page: String(ids.length),
      _embed: "wp:featuredmedia,wp:term,author",
    },
    { revalidate: 60, tags: [CACHE_TAGS.posts] }
  );
}

export async function getPostsByCategory(categoryId: number, perPage = 20): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>(
    "posts",
    {
      categories: String(categoryId),
      per_page: String(perPage),
      _embed: "wp:featuredmedia,wp:term,author",
    },
    { revalidate: 60, tags: [CACHE_TAGS.posts] }
  );
}

export async function searchPosts(query: string, perPage = 30): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>(
    "posts",
    {
      search: query,
      per_page: String(perPage),
      _embed: "wp:featuredmedia,wp:term,author",
    },
    { revalidate: 30, tags: [CACHE_TAGS.posts] }
  );
}

// Categories — change rarely, 1h cache
export async function getCategories(): Promise<WPCategory[]> {
  return fetchAPI<WPCategory[]>(
    "categories",
    { per_page: "100", hide_empty: "false" },
    { revalidate: 3600, tags: [CACHE_TAGS.categories] }
  );
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const cats = await fetchAPI<WPCategory[]>(
    "categories",
    { slug },
    { revalidate: 3600, tags: [CACHE_TAGS.categories, CACHE_TAGS.category(slug)] }
  );
  return cats[0] || null;
}

// Authors — change rarely, 1h cache
export async function getAuthors(): Promise<WPAuthor[]> {
  return fetchAPI<WPAuthor[]>(
    "users",
    { per_page: "100" },
    { revalidate: 3600, tags: [CACHE_TAGS.authors] }
  );
}

// Media
export async function getMedia(id: number): Promise<WPMedia> {
  return fetchAPI<WPMedia>(`media/${id}`, {}, { revalidate: 3600 });
}

// Helpers
export function getPostImageUrl(post: WPPost): string {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (media?.media_details?.sizes?.large) {
    return media.media_details.sizes.large.source_url;
  }
  return media?.source_url || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop";
}

export function getPostCategory(post: WPPost): { name: string; slug: string; color: string } {
  const term = post._embedded?.["wp:term"]?.[0]?.[0];
  return {
    name: decodeEntities(term?.name) || "Okategoriserat",
    slug: term?.slug || "okategoriserat",
    color: term?.acf?.color || "#1D4ED8",
  };
}

export function getPostAuthor(post: WPPost): { name: string; avatar: string; role: string; slug: string; bio: string } {
  const author = post._embedded?.author?.[0];
  return {
    name: decodeEntities(author?.name) || "Redaktionen",
    avatar: author?.avatar_urls?.["96"] || "https://i.pravatar.cc/150?img=1",
    role: decodeEntities(author?.acf?.role) || "Redaktör",
    slug: author?.slug || "redaktionen",
    bio: decodeEntities(author?.description),
  };
}

/** Convert a WPCategory to the frontend Category shape. */
export function wpCategoryToCategory(cat: WPCategory): Category {
  return {
    id: String(cat.id),
    name: decodeEntities(cat.name),
    slug: cat.slug,
    color: cat.acf?.color || "#1D4ED8",
  };
}

/** Convert a WPAuthor to the frontend Author shape. */
export function wpAuthorToAuthor(user: WPAuthor): Author {
  return {
    id: String(user.id),
    name: decodeEntities(user.name),
    avatar: user.avatar_urls?.["96"] || "https://i.pravatar.cc/150?img=1",
    role: decodeEntities(user.acf?.role) || "Redaktör",
    slug: user.slug,
    bio: decodeEntities(user.description),
  };
}

export async function getAuthorBySlug(slug: string): Promise<WPAuthor | null> {
  const users = await fetchAPI<WPAuthor[]>(
    "users",
    { slug },
    { revalidate: 3600, tags: [CACHE_TAGS.authors, CACHE_TAGS.author(slug)] }
  );
  return users[0] || null;
}

export async function getPostsByAuthor(authorId: number, perPage = 20): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>(
    "posts",
    {
      author: String(authorId),
      per_page: String(perPage),
      _embed: "wp:featuredmedia,wp:term,author",
    },
    { revalidate: 60, tags: [CACHE_TAGS.posts] }
  );
}

const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

export function decodeEntities(s: string | undefined | null): string {
  if (!s) return "";
  return s
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => HTML_ENTITIES[name.toLowerCase()] ?? m);
}

export function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, "").replace(/\n/g, " ").trim());
}

export function countWords(html: string): number {
  return stripHtml(html).split(/\s+/).filter(Boolean).length;
}

export function getPostReadTime(post: WPPost): number {
  if (post.read_time) return post.read_time;
  if (post.acf?.read_time) return post.acf.read_time;
  const words = countWords(post.content.rendered);
  return Math.max(1, Math.ceil(words / 200));
}

export function getPostImageCaption(post: WPPost): string {
  const raw = post._embedded?.["wp:featuredmedia"]?.[0]?.caption?.rendered;
  return stripHtml(raw ?? "");
}

/** Convert a WPPost (with _embedded) to the frontend Article shape. */
export function wpPostToArticle(post: WPPost): Article {
  const cat = getPostCategory(post);
  const aut = getPostAuthor(post);
  const catId = String(post._embedded?.["wp:term"]?.[0]?.[0]?.id ?? "0");
  const autId = String(post._embedded?.author?.[0]?.id ?? "0");
  const caption = getPostImageCaption(post);

  return {
    id: String(post.id),
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    content: stripHtml(post.content.rendered),
    contentHtml: post.content.rendered,
    image: getPostImageUrl(post),
    imageCaption: caption || undefined,
    category: { id: catId, name: cat.name, slug: cat.slug, color: cat.color },
    author: { id: autId, name: aut.name, avatar: aut.avatar, role: aut.role, slug: aut.slug, bio: aut.bio },
    publishedAt: post.date,
    readTime: getPostReadTime(post),
    wordCount: countWords(post.content.rendered),
    featured: post.featured_article ?? post.acf?.featured ?? false,
    breaking: post.breaking ?? post.acf?.breaking ?? false,
    views: post.views ?? { today: 0, twoDays: 0, week: 0 },
  };
}
