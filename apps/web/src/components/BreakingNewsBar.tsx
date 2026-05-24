import Link from "next/link";
import { getPosts, wpPostToArticle } from "@/lib/wordpress/client";
import type { Article } from "@/lib/types";

const ONE_HOUR_MS = 60 * 60 * 1000;

async function fetchRecentArticles(): Promise<Article[]> {
  try {
    const wpPosts = await getPosts(15);
    return wpPosts.map(wpPostToArticle);
  } catch {
    return [];
  }
}

function isBreaking(a: Article): boolean {
  if (!a.breaking) return false;
  const published = new Date(a.publishedAt).getTime();
  if (Number.isNaN(published)) return false;
  return Date.now() - published <= ONE_HOUR_MS;
}

export default async function BreakingNewsBar() {
  const recent = await fetchRecentArticles();
  const breaking = recent
    .filter(isBreaking)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  if (breaking.length === 0) return null;
  const latest = breaking[0];
  const publishedAt = new Date(latest.publishedAt);
  const minutesAgo = Math.max(
    1,
    Math.round((Date.now() - publishedAt.getTime()) / 60000)
  );

  return (
    <div
      role="region"
      aria-label="Breaking news"
      className="bg-red-600 text-white border-b border-red-700"
    >
      <Link
        href={`/article/${latest.slug}`}
        className="group max-w-7xl mx-auto px-4 py-2 flex items-center gap-3"
      >
        <span className="relative inline-flex items-center shrink-0">
          <span className="absolute -inset-1 rounded-full bg-white/30 animate-ping" />
          <span className="relative inline-block w-2 h-2 rounded-full bg-white" />
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.25em] bg-white/15 px-2 py-0.5 rounded shrink-0">
          Breaking
        </span>
        <span className="font-bold text-sm leading-snug line-clamp-1 group-hover:underline">
          {latest.title}
        </span>
        <span className="ml-auto text-[11px] text-white/80 tabular-nums shrink-0 hidden sm:inline">
          {minutesAgo} min sedan
        </span>
        <span aria-hidden className="text-white/80 group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </Link>
    </div>
  );
}
