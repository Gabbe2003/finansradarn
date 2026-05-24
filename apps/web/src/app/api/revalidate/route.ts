import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/wordpress/client";

/**
 * On-demand revalidation endpoint.
 *
 * WordPress (or any other system) can POST here to purge specific cache
 * tags or paths. Authenticated via REVALIDATION_SECRET.
 *
 * Usage examples (from WP webhooks, e.g. "Webhooks for WordPress" plugin
 * on save_post / saved_term hooks):
 *
 *   POST https://finansradarn.se/api/revalidate?secret=XXX
 *   {
 *     "tags":  ["wp:posts", "wp:post:my-slug"],
 *     "paths": ["/", "/article/my-slug"]
 *   }
 *
 * Or simpler — purge everything WP-related:
 *
 *   POST https://finansradarn.se/api/revalidate?secret=XXX&all=1
 *
 * Also supports GET for quick manual testing in the browser:
 *
 *   GET  /api/revalidate?secret=XXX&tag=wp:posts
 *   GET  /api/revalidate?secret=XXX&path=/article/my-slug
 */

function getSecret(req: NextRequest): string | null {
  return (
    req.nextUrl.searchParams.get("secret") ||
    req.headers.get("x-revalidate-secret") ||
    null
  );
}

function unauthorized() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

function purgeAll() {
  revalidateTag(CACHE_TAGS.posts, "max");
  revalidateTag(CACHE_TAGS.categories, "max");
  revalidateTag(CACHE_TAGS.authors, "max");
  return [CACHE_TAGS.posts, CACHE_TAGS.categories, CACHE_TAGS.authors];
}

export async function POST(req: NextRequest) {
  const expected = process.env.REVALIDATION_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "REVALIDATION_SECRET not configured" },
      { status: 500 }
    );
  }
  if (getSecret(req) !== expected) return unauthorized();

  let body: { tags?: string[]; paths?: string[]; all?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    // empty body is fine — fall back to query params
  }

  const purgeAllFlag =
    body.all === true || req.nextUrl.searchParams.get("all") === "1";

  const tags = new Set<string>();
  const paths = new Set<string>();

  if (purgeAllFlag) {
    purgeAll().forEach((t) => tags.add(t));
  } else {
    (body.tags ?? []).forEach((t) => tags.add(t));
    (body.paths ?? []).forEach((p) => paths.add(p));
  }

  for (const tag of tags) revalidateTag(tag, "max");
  for (const path of paths) revalidatePath(path);

  return NextResponse.json({
    revalidated: true,
    tags: [...tags],
    paths: [...paths],
    at: new Date().toISOString(),
  });
}

// GET — convenient for manual browser testing. Same auth.
export async function GET(req: NextRequest) {
  const expected = process.env.REVALIDATION_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "REVALIDATION_SECRET not configured" },
      { status: 500 }
    );
  }
  if (getSecret(req) !== expected) return unauthorized();

  const params = req.nextUrl.searchParams;
  const all = params.get("all") === "1";
  const tags = params.getAll("tag");
  const paths = params.getAll("path");

  const purgedTags = new Set<string>();
  const purgedPaths = new Set<string>();

  if (all) {
    purgeAll().forEach((t) => purgedTags.add(t));
  }
  for (const tag of tags) {
    revalidateTag(tag, "max");
    purgedTags.add(tag);
  }
  for (const path of paths) {
    revalidatePath(path);
    purgedPaths.add(path);
  }

  return NextResponse.json({
    revalidated: true,
    tags: [...purgedTags],
    paths: [...purgedPaths],
    at: new Date().toISOString(),
  });
}
