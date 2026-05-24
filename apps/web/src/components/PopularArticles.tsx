"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatViews } from "@/lib/data";
import type { Article } from "@/lib/types";

type Period = "today" | "twoDays" | "week";

const tabs: { label: string; period: Period }[] = [
  { label: "Idag", period: "today" },
  { label: "2 dagar", period: "twoDays" },
  { label: "Veckan", period: "week" },
];

interface Props {
  buckets?: Partial<Record<Period, Article[]>>;
}

const EMPTY_BUCKETS: Record<Period, Article[]> = { today: [], twoDays: [], week: [] };

export default function PopularArticles({ buckets }: Props) {
  const [active, setActive] = useState<Period>("today");
  const safeBuckets = buckets ?? EMPTY_BUCKETS;
  const popular = safeBuckets[active] ?? [];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-0 border-b border-border mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.period}
            onClick={() => setActive(tab.period)}
            className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition relative cursor-pointer ${
              active === tab.period ? "text-accent" : "text-muted hover:text-navy"
            }`}
          >
            {tab.label}
            {active === tab.period && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div>
        {popular.length === 0 ? (
          <p className="py-4 text-[12px] text-muted text-center">Ingen statistik ännu.</p>
        ) : (
          popular.map((article, i) => (
            <Link
              key={`${article.id}-${active}`}
              href={`/article/${article.slug}`}
              className="group flex gap-3 py-2.5 border-b border-border/60 last:border-0 cursor-pointer items-start"
            >
              <span className="text-lg font-black text-border group-hover:text-accent transition w-6 shrink-0 text-center leading-tight mt-0.5">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-[13px] font-semibold text-navy leading-snug line-clamp-2 group-hover:text-accent transition">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-accent">
                    {article.category.name}
                  </span>
                  {article.views?.[active] ? (
                    <span className="text-[10px] text-muted">
                      {formatViews(article.views[active])} visningar
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="relative w-16 h-12 overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="64px"
                  className="object-cover group-hover:scale-[1.05] transition duration-500"
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
