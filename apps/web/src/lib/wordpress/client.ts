import { WPPost, WPCategory, WPAuthor, WPMedia } from "./types";
import type { Article } from "@/lib/types";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://finansradarn.se";
const API = `${WP_URL}/wp-json/wp/v2`;

async function fetchAPI<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${API}/${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Posts
export async function getPosts(perPage = 20, page = 1): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>("posts", {
    per_page: String(perPage),
    page: String(page),
    _embed: "wp:featuredmedia,wp:term,author",
  });
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchAPI<WPPost[]>("posts", {
    slug,
    _embed: "wp:featuredmedia,wp:term,author",
  });
  return posts[0] || null;
}

export async function getPostsByCategory(categoryId: number, perPage = 20): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>("posts", {
    categories: String(categoryId),
    per_page: String(perPage),
    _embed: "wp:featuredmedia,wp:term,author",
  });
}

// Categories
export async function getCategories(): Promise<WPCategory[]> {
  return fetchAPI<WPCategory[]>("categories", { per_page: "100", hide_empty: "false" });
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const cats = await fetchAPI<WPCategory[]>("categories", { slug });
  return cats[0] || null;
}

// Authors
export async function getAuthors(): Promise<WPAuthor[]> {
  return fetchAPI<WPAuthor[]>("users", { per_page: "100" });
}

// Media
export async function getMedia(id: number): Promise<WPMedia> {
  return fetchAPI<WPMedia>(`media/${id}`);
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
    name: term?.name || "Okategoriserat",
    slug: term?.slug || "okategoriserat",
    color: term?.acf?.color || "#1D4ED8",
  };
}

export function getPostAuthor(post: WPPost): { name: string; avatar: string; role: string; slug: string; bio: string } {
  const author = post._embedded?.author?.[0];
  return {
    name: author?.name || "Redaktionen",
    avatar: author?.avatar_urls?.["96"] || "https://i.pravatar.cc/150?img=1",
    role: author?.acf?.role || "Redaktör",
    slug: author?.slug || "redaktionen",
    bio: author?.description || "",
  };
}

export async function getAuthorBySlug(slug: string): Promise<WPAuthor | null> {
  const users = await fetchAPI<WPAuthor[]>("users", { slug });
  return users[0] || null;
}

export async function getPostsByAuthor(authorId: number, perPage = 20): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>("posts", {
    author: String(authorId),
    per_page: String(perPage),
    _embed: "wp:featuredmedia,wp:term,author",
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\n/g, " ").trim();
}

export function getPostReadTime(post: WPPost): number {
  if (post.read_time) return post.read_time;
  if (post.acf?.read_time) return post.acf.read_time;
  const words = stripHtml(post.content.rendered).split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Convert a WPPost (with _embedded) to the frontend Article shape. */
export function wpPostToArticle(post: WPPost): Article {
  const cat = getPostCategory(post);
  const aut = getPostAuthor(post);
  const catId = String(post._embedded?.["wp:term"]?.[0]?.[0]?.id ?? "0");
  const autId = String(post._embedded?.author?.[0]?.id ?? "0");

  return {
    id: String(post.id),
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    content: stripHtml(post.content.rendered),
    image: getPostImageUrl(post),
    category: { id: catId, name: cat.name, slug: cat.slug, color: cat.color },
    author: { id: autId, name: aut.name, avatar: aut.avatar, role: aut.role, slug: aut.slug, bio: aut.bio },
    publishedAt: post.date,
    readTime: getPostReadTime(post),
    featured: post.featured_article ?? post.acf?.featured ?? false,
    breaking: post.breaking ?? post.acf?.breaking ?? false,
    views: post.views ?? { today: 0, twoDays: 0, week: 0 },
  };
}
