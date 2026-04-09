"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { articles } from "@/lib/data";

export default function NewsTicker() {
  const tickerArticles = articles.slice(0, 8);

  return (
    <div className="bg-navy text-white overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className="bg-accent text-navy px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shrink-0 mr-4">
          Just nu
        </div>
        <div className="overflow-hidden flex-1 py-2">
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: [0, -2400] }}
            transition={{ x: { duration: 40, repeat: Infinity, ease: "linear" } }}
          >
            {[...tickerArticles, ...tickerArticles].map((article, i) => (
              <Link
                key={`${article.id}-${i}`}
                href={`/article/${article.slug}`}
                className="inline-flex items-center gap-2 text-sm hover:text-accent transition shrink-0"
              >
                <span className="text-accent font-bold">&#9656;</span>
                <span className="font-medium">{article.title}</span>
                <span className="text-white/30 ml-2">|</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
