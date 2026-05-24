import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { formatDate, formatTime } from "@/lib/data";
import { fetchArticles, fetchCategories } from "@/lib/content";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Sidan hittades inte (404)",
  description:
    "Sidan du letar efter finns inte. Här är de senaste nyheterna från FinansRadarn istället.",
  robots: { index: false, follow: true },
};

function isToday(iso: string): boolean {
  const now = new Date();
  const d = new Date(iso);
  return (
    d.getUTCFullYear() === now.getUTCFullYear() &&
    d.getUTCMonth() === now.getUTCMonth() &&
    d.getUTCDate() === now.getUTCDate()
  );
}

export default async function NotFound() {
  const [recent, categories] = await Promise.all([
    fetchArticles(8),
    fetchCategories(),
  ]);
  const todays = recent.filter((a) => isToday(a.publishedAt));
  const hasToday = todays.length > 0;
  const items = (hasToday ? todays : recent).slice(0, 4);

  const todayLabel = new Date().toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-surface to-background">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
          <AnimatedSection>
            <div className="flex flex-col items-center text-center">
              {/* Radar lost-signal mark */}
              <div className="relative w-20 h-20 mb-6">
                <span className="absolute inset-0 rounded-full bg-accent/10 animate-ping" />
                <span className="absolute inset-2 rounded-full bg-accent/20" />
                <span className="absolute inset-5 rounded-full bg-navy flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-accent"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </span>
              </div>

              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-2">
                Fel 404
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-navy leading-tight">
                Radarn tappade sidan
              </h1>
              <p className="text-lg text-muted mt-4 max-w-xl leading-relaxed">
                Sidan du letade efter finns inte längre — eller flyttades. Inga
                problem, vi har samlat de senaste nyheterna åt dig nedan.
              </p>

              {/* Big 404 typography */}
              <div className="my-8 select-none" aria-hidden>
                <span className="block font-serif text-[5rem] md:text-[8rem] font-black leading-none text-navy/10 tracking-tighter">
                  404
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy text-white text-sm font-bold hover:bg-navy-light transition shadow-md hover:shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    aria-hidden
                  >
                    <path d="m3 12 9-9 9 9" />
                    <path d="M5 10v10h14V10" />
                  </svg>
                  Tillbaka till startsidan
                </Link>
                <Link
                  href="/verktyg"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-navy text-sm font-bold hover:bg-accent-hover transition shadow-md hover:shadow-lg"
                >
                  Ekonomiska verktyg <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-white text-navy text-sm font-bold hover:border-accent hover:text-accent transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    aria-hidden
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  Sök
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Today's news */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-black mb-1 flex items-center gap-3">
                <span className="w-1 h-6 bg-accent rounded-full" />
                {hasToday ? "Nyheter idag" : "Senaste nyheterna"}
              </h2>
              <p className="text-sm text-muted ml-4 capitalize">
                {hasToday
                  ? todayLabel
                  : "Det senaste från FinansRadarns redaktion"}
              </p>
            </div>
            <Link
              href="/"
              className="text-sm font-bold text-accent hover:text-accent-hover transition"
            >
              Alla nyheter →
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((article, i) => (
            <AnimatedSection key={article.id} delay={i * 0.06}>
              <Link href={`/article/${article.slug}`} className="group block">
                <div className="relative aspect-video overflow-hidden bg-gray-100 rounded-lg mb-3">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                  <span
                    className="absolute top-2 left-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow"
                    style={{ backgroundColor: article.category.color }}
                  >
                    {article.category.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-muted tabular-nums">
                    {formatTime(article.publishedAt)}
                  </span>
                  <span className="text-[10px] text-muted/60">·</span>
                  <span className="text-[10px] text-muted">
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
                <h3 className="font-serif text-[15px] font-semibold text-navy leading-snug line-clamp-2 group-hover:text-accent transition">
                  {article.title}
                </h3>
                <p className="text-[12px] text-muted mt-1 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Categories quick links */}
      <section className="border-t border-border bg-surface py-10">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection>
            <h3 className="text-sm font-black uppercase tracking-widest text-muted mb-4 text-center">
              Utforska efter ämne
            </h3>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.id} delay={i * 0.03}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-sm font-semibold text-navy hover:border-accent hover:text-accent transition"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                    aria-hidden
                  />
                  {cat.name}
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
