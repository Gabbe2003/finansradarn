"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { searchArticles, articles } from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/lib/types";
import { Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Article[]>([]);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchArticles(query));
    } else {
      setResults(articles);
    }
  }, [query]);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-navy mb-6">Sök</h1>

      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sök efter artiklar, ämnen eller kategorier..."
          className="w-full px-5 py-3.5 border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-accent/50 bg-white shadow-sm"
          autoFocus
        />
      </div>

      <div className="mb-4 text-sm text-muted font-medium">
        {query.trim()
          ? `${results.length} resultat för "${query}"`
          : `Visar alla ${results.length} artiklar`}
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl font-bold text-navy mb-2">Inga resultat hittades</p>
          <p className="text-muted">Prova ett annat sökord eller bläddra bland våra kategorier.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black text-navy mb-6">Sök</h1>
        <p className="text-muted">Laddar...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
