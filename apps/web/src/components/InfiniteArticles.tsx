"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { articles as allArticles } from "@/lib/data";
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
  const loaderRef = useRef<HTMLDivElement>(null);

  // We cycle through all articles to simulate infinite content
  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      setDisplayed((prev) => {
        const nextIndex = prev.length % allArticles.length;
        const batch: Article[] = [];
        for (let i = 0; i < BATCH_SIZE; i++) {
          const srcIndex = (nextIndex + i) % allArticles.length;
          batch.push({
            ...allArticles[srcIndex],
            // Give unique id so React keys don't collide
            id: `${allArticles[srcIndex].id}-${prev.length + i}`,
          });
        }
        const next = [...prev, ...batch];
        // Cap at 60 articles
        if (next.length >= 60) setHasMore(false);
        return next;
      });
      setLoading(false);
    }, 600);
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
