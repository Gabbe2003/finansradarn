"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/data";
import { Article } from "@/lib/types";
import ArticleCharts from "@/app/article/[slug]/ArticleCharts";

interface InfiniteArticleReaderProps {
  currentArticle: Article;
}

function FullArticle({ article }: { article: Article }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && entries[0].intersectionRatio > 0.3) {
          const url = `/article/${article.slug}`;
          if (window.location.pathname !== url) {
            window.history.replaceState(null, "", url);
            document.title = `${article.title} - FinansRadarn`;
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [article.slug, article.title]);

  // Plain-text paragraph fallback when the article lacks a WP HTML body.
  const fallbackParagraphs = article.contentHtml ? [] : article.content.split("\n\n");
  const wordCount =
    article.wordCount ?? article.content.split(/\s+/).filter(Boolean).length;

  return (
    <article ref={ref} className="pt-10 mt-10 border-t-2 border-border">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <div className="flex items-center gap-2 text-sm mb-4">
          <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
          <span className="text-muted/50">/</span>
          <Link
            href={`/category/${article.category.slug}`}
            className="hover:text-accent transition font-semibold"
            style={{ color: article.category.color }}
          >
            {article.category.name}
          </Link>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-navy">
          {article.title}
        </h1>

        <p className="text-lg text-muted mt-4 leading-relaxed">{article.excerpt}</p>

        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
          <Image
            src={article.author.avatar}
            alt={article.author.name}
            width={48}
            height={48}
            className="rounded-full ring-2 ring-accent/30"
          />
          <div>
            <p className="font-bold text-navy">{article.author.name}</p>
            <p className="text-sm text-muted">{article.author.role}</p>
          </div>
          <div className="ml-auto text-right text-sm text-muted">
            <p className="font-medium">{formatDate(article.publishedAt)}</p>
            <p>{article.readTime} min läsning</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-[12px] text-muted border-t border-border/50 pt-3">
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {article.readTime} min läsning · {wordCount.toLocaleString("sv-SE")} ord
          </span>
          {article.featured && (
            <span className="flex items-center gap-1 text-accent font-semibold ml-auto">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Redaktörens val
            </span>
          )}
        </div>
      </div>

      {/* Image */}
      <figure className="max-w-5xl mx-auto px-4 mb-10">
        <div className="relative aspect-2/1 rounded-2xl overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>
        {article.imageCaption && (
          <figcaption className="text-center text-[13px] italic text-muted mt-3 max-w-3xl mx-auto">
            {article.imageCaption}
          </figcaption>
        )}
      </figure>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 pb-8">
        {article.contentHtml ? (
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        ) : (
          <div className="article-content">
            {fallbackParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        <div className="my-10">
          <ArticleCharts categorySlug={article.category.slug} />
        </div>

        {/* Share */}
        <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted">Kategori:</span>
            <Link
              href={`/category/${article.category.slug}`}
              className="px-3 py-1 text-sm rounded-lg border border-border hover:border-accent hover:text-accent font-medium transition"
            >
              {article.category.name}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

const BATCH_SIZE = 1;

export default function InfiniteArticleReader({ currentArticle }: InfiniteArticleReaderProps) {
  const [loaded, setLoaded] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef<number>(1);
  const loaderRef = useRef<HTMLDivElement>(null);
  const seenIdsRef = useRef<Set<string>>(new Set([currentArticle.id]));

  const loadNext = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const page = pageRef.current;
      const excludeParam = currentArticle.id ? `&exclude=${currentArticle.id}` : "";
      const res = await fetch(
        `/api/posts/feed?page=${page}&per_page=${BATCH_SIZE}${excludeParam}`
      );
      const data = (await res.json()) as { articles: Article[] };
      const fresh = (data.articles ?? []).filter((a) => !seenIdsRef.current.has(a.id));
      if (fresh.length === 0) {
        setHasMore(false);
      } else {
        fresh.forEach((a) => seenIdsRef.current.add(a.id));
        setLoaded((prev) => [...prev, ...fresh]);
        pageRef.current = page + 1;
      }
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, currentArticle.id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadNext();
        }
      },
      { threshold: 0, rootMargin: "600px" }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadNext, loading, hasMore]);

  return (
    <div>
      {loaded.map((article) => (
        <FullArticle key={article.id} article={article} />
      ))}

      {hasMore ? (
        <div ref={loaderRef} className="py-16 flex justify-center">
          {loading && (
            <div className="flex items-center gap-3 text-muted">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-sm font-medium">Laddar nästa artikel...</span>
            </div>
          )}
        </div>
      ) : loaded.length > 0 ? (
        <div className="py-12 text-center text-sm text-muted font-medium">
          Du har nått slutet
        </div>
      ) : null}
    </div>
  );
}
