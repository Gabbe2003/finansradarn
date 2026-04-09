"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { articles as allArticles, formatDate } from "@/lib/data";
import { Article } from "@/lib/types";
import ArticleCharts from "@/app/article/[slug]/ArticleCharts";

interface InfiniteArticleReaderProps {
  currentArticle: Article;
}

function FullArticle({ article, isFirst }: { article: Article; isFirst: boolean }) {
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

  const paragraphs = article.content.split("\n\n");
  const firstHalf = paragraphs.slice(0, Math.ceil(paragraphs.length / 2));
  const secondHalf = paragraphs.slice(Math.ceil(paragraphs.length / 2));

  return (
    <article ref={ref} className={isFirst ? "" : "pt-10 mt-10 border-t-2 border-border"}>
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
      </div>

      {/* Image */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <div className="relative aspect-[2/1] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 pb-8">
        <div className="prose prose-lg max-w-none">
          {firstHalf.map((paragraph, i) => (
            <p
              key={i}
              className={`mb-5 leading-[1.85] text-gray-700 ${
                i === 0 ? "first-letter:text-5xl first-letter:font-black first-letter:text-navy first-letter:float-left first-letter:mr-2 first-letter:mt-1" : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="my-8">
          <ArticleCharts categorySlug={article.category.slug} />
        </div>

        <div className="prose prose-lg max-w-none">
          {secondHalf.map((paragraph, i) => (
            <p key={i} className="mb-5 leading-[1.85] text-gray-700">
              {paragraph}
            </p>
          ))}
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
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted mr-1">Dela:</span>
            <button className="p-2.5 rounded-lg border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition" aria-label="Dela på X">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
            <button className="p-2.5 rounded-lg border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition" aria-label="Dela på LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function InfiniteArticleReader({ currentArticle }: InfiniteArticleReaderProps) {
  const remaining = allArticles.filter((a) => a.id !== currentArticle.id);
  const [loaded, setLoaded] = useState<Article[]>([]);
  const [nextIndex, setNextIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadNext = useCallback(() => {
    if (loading || nextIndex >= remaining.length) return;
    setLoading(true);
    setTimeout(() => {
      setLoaded((prev) => [...prev, remaining[nextIndex]]);
      setNextIndex((prev) => prev + 1);
      setLoading(false);
    }, 300);
  }, [loading, nextIndex, remaining]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && nextIndex < remaining.length) {
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
  }, [loadNext, loading, nextIndex, remaining.length]);

  return (
    <div>
      {/* Current article is rendered server-side in the page, this handles the next ones */}
      {loaded.map((article, i) => (
        <FullArticle key={article.id} article={article} isFirst={false} />
      ))}

      {/* Loader sentinel */}
      {nextIndex < remaining.length && (
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
      )}
    </div>
  );
}
