import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { formatDate } from "@/lib/data";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "compact";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <Link href={`/article/${article.slug}`} className="group flex gap-4 py-4 border-b border-border last:border-0">
        <div className="relative w-28 h-20 shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
            {article.category.name}
          </span>
          <h3 className="font-serif text-sm font-semibold mt-0.5 line-clamp-2 group-hover:text-accent transition leading-snug">
            {article.title}
          </h3>
          <p className="text-[11px] text-muted mt-1">{formatDate(article.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/article/${article.slug}`} className="group block py-3 border-b border-border last:border-0">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
          {article.category.name}
        </span>
        <h3 className="font-serif text-[15px] font-semibold mt-0.5 group-hover:text-accent transition line-clamp-2 leading-snug">
          {article.title}
        </h3>
        <p className="text-[11px] text-muted mt-1">{formatDate(article.publishedAt)}</p>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      {/* Clean image — no overlay, no badge */}
      <div className="relative aspect-[3/2] overflow-hidden mb-3 bg-gray-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition duration-500"
        />
      </div>

      {/* Category as small text */}
      <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
        {article.category.name}
      </span>

      {/* Serif headline */}
      <h3 className="font-serif text-[1.15rem] font-semibold leading-snug mt-1 group-hover:text-accent transition line-clamp-3">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-[13px] text-muted mt-2 line-clamp-2 leading-relaxed">
        {article.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-1.5 mt-3 text-[11px] text-muted">
        <span className="font-medium text-foreground">{article.author.name}</span>
        <span className="text-border">|</span>
        <span>{formatDate(article.publishedAt)}</span>
        <span className="text-border">|</span>
        <span>{article.readTime} min</span>
      </div>
    </Link>
  );
}
