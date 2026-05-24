import { NextRequest, NextResponse } from "next/server";
import { getPosts, wpPostToArticle } from "@/lib/wordpress/client";

/**
 * Paginated article feed used by client components (InfiniteArticles,
 * InfiniteArticleReader). Always hits WordPress — there is no mock fallback.
 *
 *   GET /api/posts/feed?page=1&per_page=6&exclude=41,38
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const perPage = Math.min(30, Math.max(1, Number(searchParams.get("per_page") ?? "6")));
  const exclude = (searchParams.get("exclude") ?? "")
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n) && n > 0);

  try {
    // Over-fetch slightly when excluding so the caller still gets `perPage`
    // items after filtering.
    const fetchSize = exclude.length ? perPage + exclude.length : perPage;
    const posts = await getPosts(fetchSize, page);
    const filtered = exclude.length
      ? posts.filter((p) => !exclude.includes(p.id))
      : posts;
    const articles = filtered.slice(0, perPage).map(wpPostToArticle);
    return NextResponse.json({ articles, page });
  } catch (err) {
    return NextResponse.json(
      { articles: [], page, error: String(err) },
      { status: 502 }
    );
  }
}
