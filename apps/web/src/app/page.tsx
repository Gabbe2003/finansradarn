import Link from "next/link";
import Image from "next/image";
import { articles, categories, formatDate, formatTime } from "@/lib/data";
import MarketTicker from "@/components/MarketTicker";
import KeyMetrics from "@/components/KeyMetrics";
import AnimatedSection from "@/components/AnimatedSection";
import MarketSection from "@/components/MarketSection";
import TradingViewMiniChart from "@/components/TradingViewMiniChart";
import InfiniteArticles from "@/components/InfiniteArticles";
import PopularArticles from "@/components/PopularArticles";
import NewsTicker from "@/components/NewsTicker";
import NewsletterBanner from "@/components/NewsletterBanner";

const tools = [
  { name: "Bolåneberäknare", href: "/verktyg/bolanekalkylator", desc: "Månadskostnad & ränta" },
  { name: "Sparandeberäknare", href: "/verktyg/sparandekalkylator", desc: "Ränta-på-ränta" },
  { name: "Inflationsberäknare", href: "/verktyg/inflationskalkylator", desc: "Köpkraft över tid" },
  { name: "Löneberäknare", href: "/verktyg/lonekalkylator", desc: "Nettolön efter skatt" },
  { name: "Ränta-på-ränta", href: "/verktyg/ranta-pa-ranta", desc: "Exponentiell tillväxt" },
  { name: "Pensionsberäknare", href: "/verktyg/pensionskalkylator", desc: "Pensionsgap & kapital" },
  { name: "ISK-skatt", href: "/verktyg/isk-skatt", desc: "Schablonsskatt ISK" },
  { name: "Skuldavbetalning", href: "/verktyg/skuldavbetalning", desc: "Tid till skuldfrihet" },
  { name: "ROI-beräknare", href: "/verktyg/roi-beraknare", desc: "Avkastning & CAGR" },
  { name: "Utdelningar", href: "/verktyg/utdelningskalkylator", desc: "Utdelningsinkomst" },
  { name: "FIRE", href: "/verktyg/fire-kalkylator", desc: "Ekonomisk frihet" },
  { name: "Hyra vs Köpa", href: "/verktyg/hyra-vs-kopa", desc: "Jämför boendekostnad" },
  { name: "Fondavgifter", href: "/verktyg/fondavgifter", desc: "Avgifternas påverkan" },
  { name: "Budgetplanerare", href: "/verktyg/budget", desc: "Planera din budget" },
  { name: "Break-even", href: "/verktyg/break-even", desc: "Enheter till lönsamhet" },
];

export default function Home() {
  const leadArticle = articles[0];
  const leftCards = articles.slice(1, 3);
  const feedArticles = articles.slice(3, 7);
  const initialArticles = articles.slice(3, 9);

  return (
    <div>
      {/* News ticker + market ticker */}
      <NewsTicker />
      <MarketTicker />
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <KeyMetrics />
        </div>
      </div>

      {/* Hero — DI-style 3-column layout */}
      <section className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x divide-border">

          {/* LEFT COLUMN — Lead + image cards (5 cols) */}
          <div className="lg:col-span-5 lg:pr-6 pb-6 lg:pb-0">
            {/* Lead article */}
            <AnimatedSection delay={0.05}>
              <Link href={`/article/${leadArticle.slug}`} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 mb-3">
                  <Image
                    src={leadArticle.image}
                    alt={leadArticle.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                    priority
                  />
                </div>
                <h2 className="font-serif text-xl md:text-2xl font-bold text-navy leading-snug group-hover:text-accent transition">
                  {leadArticle.title}
                </h2>
                <p className="text-[13px] text-muted mt-1.5 leading-relaxed line-clamp-2">
                  {leadArticle.excerpt}
                </p>
              </Link>
            </AnimatedSection>

            {/* 3 horizontal image cards below */}
            <div className="mt-4 pt-4 border-t border-border space-y-0 divide-y divide-border">
              {leftCards.map((article, i) => (
                <AnimatedSection key={article.id} delay={0.12 + i * 0.06}>
                  <Link href={`/article/${article.slug}`} className="group flex gap-4 py-3.5 first:pt-0">
                    <div className="relative w-32 h-20 overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-accent">
                        {article.category.name}
                      </span>
                      <h3 className="font-serif text-[14px] font-semibold text-navy mt-0.5 leading-snug line-clamp-2 group-hover:text-accent transition">
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* MIDDLE COLUMN — Feed with some images (4 cols) */}
          <div className="lg:col-span-4 lg:px-6 pb-6 lg:pb-0 border-t lg:border-t-0 border-border pt-6 lg:pt-0">
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-navy">Nyhetsflöde</h3>
              </div>

              <div>
                {feedArticles.map((article, i) => (
                  <Link
                    key={article.id}
                    href={`/article/${article.slug}`}
                    className="group block py-3 border-b border-border/60 last:border-0"
                  >
                    {i === 0 && (
                      <div className="relative aspect-[16/7] overflow-hidden bg-gray-100 mb-2">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition duration-500"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-muted tabular-nums">{formatTime(article.publishedAt)}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-accent">{article.category.name}</span>
                    </div>
                    <h4 className="font-serif text-[14px] font-semibold text-navy leading-snug group-hover:text-accent transition">
                      {article.title}
                    </h4>
                    <p className="text-[12px] text-muted mt-0.5 line-clamp-1 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* RIGHT COLUMN — Popular + mini chart (3 cols) */}
          <div className="lg:col-span-3 lg:pl-6 border-t lg:border-t-0 border-border pt-6 lg:pt-0">
            <AnimatedSection delay={0.2}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-navy">Mest läst</span>
              </div>
              <PopularArticles />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="mt-5 pt-5 border-t border-border">
                <TradingViewMiniChart symbol="FX:EURSEK" height={160} />
              </div>
            </AnimatedSection>
          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4"><div className="border-b border-border" /></div>

      {/* Tool Shortcuts */}
      <section id="verktyg" className="bg-surface border-y border-border py-8">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-xl font-black mb-1 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Ekonomiska verktyg
            </h2>
            <p className="text-sm text-muted mb-5 ml-4">Snabbberäkna ränta, sparande, skatt och inflation</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {tools.map((tool, i) => (
              <AnimatedSection key={tool.href} delay={i * 0.04}>
                <Link
                  href={tool.href}
                  className="group block p-3.5 bg-white rounded-xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <p className="font-bold text-sm text-navy group-hover:text-accent transition truncate">{tool.name}</p>
                  <p className="text-[11px] text-muted truncate mt-0.5">{tool.desc}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.5}>
            <div className="mt-4 text-center">
              <Link href="/verktyg" className="text-sm font-bold text-accent hover:text-accent-hover transition">
                Visa alla verktyg &rarr;
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Editor's Picks — large feature layout */}
      <section className="bg-surface border-y border-border py-10">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-xl font-black mb-1 flex items-center gap-3">
                  <span className="w-1 h-6 bg-accent rounded-full"></span>
                  Redaktionens val
                </h2>
                <p className="text-sm text-muted ml-4">Utvalda fördjupningar och analyser</p>
              </div>
              <Link href="/category/analys" className="text-sm font-bold text-accent hover:text-accent-hover transition hidden sm:block">
                Fler analyser &rarr;
              </Link>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Big feature with gradient overlay */}
            <AnimatedSection delay={0.1}>
              <Link href={`/article/${articles[8].slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                  <Image src={articles[8].image} alt={articles[8].title} fill className="object-cover group-hover:scale-[1.03] transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent" />
                  <div className="absolute top-3 left-3 bg-accent text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5">
                    Redaktörens val
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">{articles[8].category.name}</span>
                    <h3 className="font-serif text-lg font-bold text-white mt-1 leading-snug group-hover:text-white/90 transition">{articles[8].title}</h3>
                    <p className="text-[12px] text-white/65 mt-1 line-clamp-1 leading-relaxed">{articles[8].excerpt}</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted mt-2">{articles[8].author.name} · {formatDate(articles[8].publishedAt)}</p>
              </Link>
            </AnimatedSection>
            {/* Right column — 2 editorial picks + plain news items */}
            <div className="flex flex-col">
              {/* Ranked editorial picks */}
              <div className="divide-y divide-border">
                {articles.slice(9, 11).map((article, i) => (
                  <AnimatedSection key={article.id} delay={0.15 + i * 0.08}>
                    <Link href={`/article/${article.slug}`} className="group flex items-start gap-3 py-4 first:pt-0">
                      <span className="text-[26px] font-black text-border/60 group-hover:text-accent/30 transition tabular-nums leading-none pt-0.5 w-7 shrink-0 select-none">
                        {i + 1}
                      </span>
                      <div className="relative w-32 h-20 overflow-hidden bg-gray-100 shrink-0">
                        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-[1.03] transition duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-accent">{article.category.name}</span>
                        <h3 className="font-serif text-[14px] font-semibold text-navy mt-0.5 leading-snug line-clamp-2 group-hover:text-accent transition">{article.title}</h3>
                        <p className="text-[11px] text-muted mt-1.5">{formatDate(article.publishedAt)}</p>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>

              {/* Divider with label */}
              <div className="flex items-center gap-3 my-3 border-t border-border pt-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted">Senaste</span>
                <div className="flex-1 border-t border-border/50" />
              </div>

              {/* Plain news items — no image, no rank */}
              <div className="divide-y divide-border/60">
                {articles.slice(12, 15).map((article, i) => (
                  <AnimatedSection key={article.id} delay={0.35 + i * 0.06}>
                    <Link href={`/article/${article.slug}`} className="group flex items-start gap-2.5 py-2.5 first:pt-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold text-muted tabular-nums">{formatTime(article.publishedAt)}</span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-accent">{article.category.name}</span>
                        </div>
                        <h4 className="font-serif text-[13px] font-semibold text-navy leading-snug line-clamp-2 group-hover:text-accent transition">{article.title}</h4>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <AnimatedSection>
        <NewsletterBanner />
      </AnimatedSection>

      {/* Weekly Stats */}
      <section className="bg-surface border-y border-border py-10">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-xl font-black mb-1 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Veckans nyckeltal
            </h2>
            <p className="text-sm text-muted mb-6 ml-4">Senaste makroekonomiska data för Sverige</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "KPIF", value: "4,1%", change: "+0,2", up: true },
              { label: "Styrränta", value: "3,75%", change: "+0,25", up: true },
              { label: "Arbetslöshet", value: "5,8%", change: "-0,4", up: false },
              { label: "BNP kv/kv", value: "+0,8%", change: "+0,3", up: true },
              { label: "EUR/SEK", value: "11,52", change: "+0,07", up: true },
              { label: "OMXS30", value: "2 812", change: "+1,8%", up: true },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.05}>
                <div className="bg-white p-4 border border-border text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">{stat.label}</p>
                  <p className="text-lg font-black text-navy">{stat.value}</p>
                  <p className={`text-[11px] font-bold mt-0.5 ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
                    {stat.up ? "▲" : "▼"} {stat.change}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Market Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-xl font-black mb-1 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Marknaden
            </h2>
            <p className="text-sm text-muted mb-5 ml-4">Index, aktier, valutor och råvaror i realtid</p>
          </AnimatedSection>
          <MarketSection />
        </div>
      </section>

      {/* All articles — infinite scroll */}
      <section className="max-w-7xl mx-auto px-4 py-10 border-t border-border">
        <AnimatedSection>
          <h2 className="text-xl font-black mb-1 flex items-center gap-3">
            <span className="w-1 h-6 bg-accent rounded-full"></span>
            Alla artiklar
          </h2>
          <p className="text-sm text-muted mb-6 ml-4">Senaste analyserna och nyhetsbevakningen</p>
        </AnimatedSection>
        <InfiniteArticles initialArticles={initialArticles} />
      </section>

      {/* Category Quick Links */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Utforska efter kategori
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.id} delay={i * 0.05}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="font-semibold text-sm group-hover:text-accent transition">{cat.name}</span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
