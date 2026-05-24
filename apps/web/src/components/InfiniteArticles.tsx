"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Article } from "@/lib/types";
import ArticleCard from "./ArticleCard";

const BATCH_SIZE = 6;

interface InfiniteArticlesProps {
  initialArticles: Article[];
}

export default function InfiniteArticles({ initialArticles }: InfiniteArticlesProps) {
  const [displayed, setDisplayed] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // The server already rendered the first slice; start paging from the next.
  const initialPage = Math.max(
    1,
    Math.ceil(initialArticles.length / BATCH_SIZE) + 1
  );
  const nextPageRef = useRef<number>(initialPage);
  const loaderRef = useRef<HTMLDivElement>(null);
  const seenIdsRef = useRef<Set<string>>(new Set(initialArticles.map((a) => a.id)));

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const page = nextPageRef.current;
      const res = await fetch(`/api/posts/feed?page=${page}&per_page=${BATCH_SIZE}`);
      const data = (await res.json()) as { articles: Article[] };
      const fresh = (data.articles ?? []).filter((a) => !seenIdsRef.current.has(a.id));
      if (fresh.length === 0) {
        setHasMore(false);
      } else {
        fresh.forEach((a) => seenIdsRef.current.add(a.id));
        setDisplayed((prev) => [...prev, ...fresh]);
        nextPageRef.current = page + 1;
      }
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0, rootMargin: "400px" }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMore, hasMore, loading]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {displayed.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (i % BATCH_SIZE) * 0.08 }}
          >
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </div>

      {/* Loader / sentinel */}
      <div ref={loaderRef} className="py-10 flex justify-center">
        {loading && (
          <div className="flex items-center gap-3 text-muted">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-sm font-medium">Laddar fler artiklar...</span>
          </div>
        )}
        {!hasMore && (
          <p className="text-sm text-muted font-medium">Du har nått slutet — {displayed.length} artiklar visade</p>
        )}
      </div>
    </div>
  );
}
