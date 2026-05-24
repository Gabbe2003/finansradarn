import type { Metadata } from "next";
import Link from "next/link";
import { fetchSearch } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = (q || "").trim();
  return {
    title: query ? `Sök: ${query}` : "Sök",
    description: query
      ? `Sökresultat för "${query}" på FinansRadarn.`
      : "Sök bland ekonomiska nyheter, analyser och verktyg på FinansRadarn.",
    robots: { index: !query, follow: true },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q || "").trim();
  const results = await fetchSearch(query);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-navy mb-6">Sök</h1>

      <form action="/search" method="get" className="mb-8">
        <div className="relative">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Sök efter artiklar, ämnen eller kategorier..."
            className="w-full px-5 py-3.5 pr-28 border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-accent/50 bg-white shadow-sm"
            autoFocus
          />
          <button
            type="submit"
            className="absolute top-1/2 -translate-y-1/2 right-1.5 px-4 py-2 bg-accent text-navy rounded-lg text-sm font-bold hover:bg-accent-hover transition cursor-pointer"
          >
            Sök
          </button>
        </div>
      </form>

      <div className="mb-4 text-sm text-muted font-medium">
        {query
          ? `${results.length} resultat för "${query}"`
          : `Visar senaste ${results.length} artiklarna`}
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl font-bold text-navy mb-2">Inga resultat hittades</p>
          <p className="text-muted mb-4">Prova ett annat sökord eller bläddra bland våra kategorier.</p>
          <Link href="/" className="text-accent hover:underline font-semibold">
            Tillbaka till startsidan
          </Link>
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
