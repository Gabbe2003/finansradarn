"use client";

import { useState } from "react";
import Link from "next/link";
import { glossaryTerms, glossaryCategories, getTermsByLetter } from "@/lib/glossary";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const grouped = getTermsByLetter();

  const filtered = glossaryTerms.filter((t) => {
    const matchesSearch = !search || t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredGrouped: Record<string, typeof glossaryTerms> = {};
  for (const term of filtered) {
    const letter = term.term[0].toUpperCase();
    if (!filteredGrouped[letter]) filteredGrouped[letter] = [];
    filteredGrouped[letter].push(term);
  }

  const availableLetters = new Set(Object.keys(filteredGrouped));

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
        <span className="text-muted/50">/</span>
        <span className="font-semibold text-navy">Ordlista</span>
      </div>

      <h1 className="font-serif text-3xl font-bold text-navy mb-2">Ekonomisk ordlista</h1>
      <p className="text-muted mb-8">Från A till Ö — alla ekonomiska begrepp förklarade enkelt och tydligt.</p>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Sök efter begrepp..."
          className="w-full px-4 py-3 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 bg-white"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider cursor-pointer transition ${
            !activeCategory ? "bg-navy text-white" : "bg-surface text-muted hover:text-navy"
          }`}
        >
          Alla
        </button>
        {glossaryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider cursor-pointer transition ${
              activeCategory === cat ? "bg-navy text-white" : "bg-surface text-muted hover:text-navy"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Alphabet nav */}
      <div className="flex flex-wrap gap-1 mb-8 border-b border-border pb-4">
        {alphabet.map((letter) => (
          <a
            key={letter}
            href={availableLetters.has(letter) ? `#letter-${letter}` : undefined}
            className={`w-8 h-8 flex items-center justify-center text-sm font-bold transition ${
              availableLetters.has(letter)
                ? "text-navy hover:bg-accent hover:text-white cursor-pointer"
                : "text-gray-300 cursor-default"
            }`}
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted mb-6">{filtered.length} begrepp</p>

      {/* Terms */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg font-bold text-navy mb-2">Inga begrepp hittades</p>
          <p className="text-muted text-sm">Prova ett annat sökord eller kategori.</p>
        </div>
      ) : (
        <div className="space-y-0">
          {alphabet.map((letter) => {
            const terms = filteredGrouped[letter];
            if (!terms) return null;
            return (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                <div className="sticky top-30 bg-background z-10 py-2 border-b border-border">
                  <span className="text-2xl font-black text-accent">{letter}</span>
                </div>
                {terms.map((term) => (
                  <div key={term.slug} className="border-b border-border/60">
                    <button
                      onClick={() => setExpandedTerm(expandedTerm === term.slug ? null : term.slug)}
                      className="w-full text-left py-4 flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <h3 className="font-serif text-[16px] font-semibold text-navy group-hover:text-accent transition">{term.term}</h3>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-accent shrink-0 hidden sm:inline">{term.category}</span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-4 h-4 text-muted shrink-0 transition-transform ${expandedTerm === term.slug ? "rotate-180" : ""}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {expandedTerm === term.slug && (
                      <div className="pb-4 pr-8">
                        <p className="text-[14px] text-gray-700 leading-relaxed">{term.definition}</p>
                        <span className="inline-block mt-2 text-[9px] font-bold uppercase tracking-widest text-accent sm:hidden">{term.category}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
