import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/data";
import { fetchArticles } from "@/lib/content";
import { getPostBySlug, getPosts, getPostsByIds, wpPostToArticle, stripHtml, getPostImageUrl } from "@/lib/wordpress/client";
import { fetchAds } from "@/lib/ads/client";
import type { Article } from "@/lib/types";
import AnimatedSection from "@/components/AnimatedSection";
import ArticleCharts from "./ArticleCharts";
import InfiniteArticleReader from "@/components/InfiniteArticleReader";
import ShareButtons from "@/components/ShareButtons";
import ViewTracker from "@/components/ViewTracker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://finansradarn.se";
const SITE_NAME = "FinansRadarn";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const wpPosts = await getPosts(100);
    return wpPosts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;

  try {
    const wpPost = await getPostBySlug(slug);
    if (wpPost) {
      const seo = wpPost.seo;
      const title = seo?.title || `${stripHtml(wpPost.title.rendered)} — FinansRadarn`;
      const description = seo?.description || stripHtml(wpPost.excerpt.rendered);
      const image = getPostImageUrl(wpPost);
      const canonical = seo?.canonical || `https://finansradarn.se/article/${slug}`;

      return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
          title: seo?.og_title || title,
          description,
          images: [{ url: seo?.og_image || image }],
          locale: "sv_SE",
          type: "article",
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [seo?.og_image || image],
        },
      };
    }
  } catch {}

  return {
    title: "Artikeln hittades inte",
    robots: { index: false, follow: false },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  let article;
  let dateModified: string | undefined;
  let wpPostId: number | null = null;
  try {
    const wpPost = await getPostBySlug(slug);
    if (wpPost) {
      article = wpPostToArticle(wpPost);
      dateModified = wpPost.modified;
      wpPostId = wpPost.id;
    }
  } catch {}

  if (!article) notFound();

  let adArticle: Article | null = null;
  let adId: number | null = null;
  try {
    const scrollAdsResponse = await fetchAds("scroll");
    const candidate = (scrollAdsResponse?.ads ?? []).find(
      (a) =>
        a.linked_post?.id != null &&
        String(a.linked_post.id) !== article!.id
    );
    if (candidate?.linked_post?.id) {
      const wpPosts = await getPostsByIds([candidate.linked_post.id]);
      if (wpPosts[0]) {
        adArticle = wpPostToArticle(wpPosts[0]);
        adId = candidate.id;
      }
    }
  } catch {}

  const articleUrl = `${SITE_URL}/article/${article.slug}`;
  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    headline: article.title,
    description: article.excerpt,
    image: [article.image],
    datePublished: article.publishedAt,
    dateModified: dateModified || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    articleSection: article.category.name,
    inLanguage: "sv-SE",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.category.name,
        item: `${SITE_URL}/category/${article.category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  // Plain-text paragraph fallback for articles that have no HTML body (mock data).
  const fallbackParagraphs = article.contentHtml ? [] : article.content.split("\n\n");

  // Word count: prefer the precomputed value from WP, otherwise derive it from
  // the available text so the stats strip always shows the real number.
  const wordCount =
    article.wordCount ??
    article.content.split(/\s+/).filter(Boolean).length;

  const pool = (await fetchArticles(30)).filter((a) => a.id !== article.id);
  const randomPosts = [...pool].sort(() => Math.random() - 0.5).slice(0, 6);

  // Derive a small tag set from category + a static map of related Swedish economy terms
  const TAGS_BY_CATEGORY: Record<string, string[]> = {
    makroekonomi: ["BNP", "KPI", "Riksbanken", "Konjunktur"],
    finansmarknader: ["Aktier", "OMXS30", "Stockholmsbörsen", "Räntor"],
    statistik: ["SCB", "KPIF", "Arbetslöshet", "Nyckeltal"],
    penningpolitik: ["Styrränta", "Riksbanken", "Inflation", "ECB"],
    arbetsmarknad: ["Sysselsättning", "Arbetslöshet", "Lönebildning", "SCB"],
    "handel-export": ["Export", "Import", "Handelsbalans", "USA"],
    bostadsmarknad: ["Bolån", "Bostadspriser", "Räntor", "HOX"],
    konjunktur: ["BNP", "KI-barometern", "Konjunktur", "Företag"],
  };
  const tags = Array.from(
    new Set([
      article.category.name,
      ...(TAGS_BY_CATEGORY[article.category.slug] ?? []),
    ])
  );

  return (
    <article>
      {wpPostId !== null && <ViewTracker postId={wpPostId} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Article Header */}
      <AnimatedSection>
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-6">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
            <span className="text-muted/50">/</span>
            <Link
              href={`/category/${article.category.slug}`}
              className="text-muted hover:text-accent transition font-medium"
            >
              {article.category.name}
            </Link>
          </div>

          {/* Category badge — prominent placement above title */}
          <div className="mb-3">
            <Link
              href={`/category/${article.category.slug}`}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest text-white hover:opacity-90 transition shadow-sm"
              style={{ backgroundColor: article.category.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
              {article.category.name}
            </Link>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-navy">
            {article.title}
          </h1>

          <p className="text-lg text-muted mt-4 leading-relaxed">{article.excerpt}</p>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
            {article.author.slug ? (
              <Link
                href={`/author/${article.author.slug}`}
                className="group flex items-center gap-4 hover:opacity-90 transition"
              >
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-accent/30 group-hover:ring-accent transition"
                />
                <div>
                  <p className="font-bold text-navy group-hover:text-accent transition">
                    {article.author.name}
                  </p>
                  <p className="text-sm text-muted">{article.author.role}</p>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-accent/30"
                />
                <div>
                  <p className="font-bold text-navy">{article.author.name}</p>
                  <p className="text-sm text-muted">{article.author.role}</p>
                </div>
              </div>
            )}
            <div className="ml-auto text-right text-sm text-muted">
              <p className="font-medium">{formatDate(article.publishedAt)}</p>
              <p>{article.readTime} min läsning</p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-[12px] text-muted border-t border-border/50 pt-3">
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {article.readTime} min läsning · {wordCount.toLocaleString("sv-SE")} ord
            </span>
            {article.featured && (
              <span className="flex items-center gap-1 text-accent font-semibold ml-auto">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Redaktörens val
              </span>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Image */}
      <AnimatedSection delay={0.1}>
        <figure className="max-w-5xl mx-auto px-4 mb-10">
          <div className="relative aspect-2/1 rounded-2xl overflow-hidden shadow-2xl">
            <Image src={article.image} alt={article.title} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" priority />
          </div>
          {article.imageCaption && (
            <figcaption className="text-center text-[13px] italic text-muted mt-3 max-w-3xl mx-auto">
              {article.imageCaption}
            </figcaption>
          )}
        </figure>
      </AnimatedSection>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        {/* Mini TOC */}
        <AnimatedSection delay={0.15}>
          <nav
            aria-label="Innehåll"
            className="mb-8 rounded-xl border border-border bg-white px-4 py-3"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-1.5">
              Innehåll
            </p>
            <ol className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {[
                { href: "#inledning", label: "Artikel" },
                { href: "#data", label: "Diagram & data" },
                { href: "#fler", label: "Fler att läsa" },
              ].map((item, i) => (
                <li key={item.href} className="flex items-center gap-1.5">
                  <span className="text-[10px] tabular-nums font-bold text-muted/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={item.href}
                    className="font-semibold text-navy hover:text-accent transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          {article.contentHtml ? (
            <div
              id="inledning"
              className="article-content scroll-mt-24"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          ) : (
            <div id="inledning" className="article-content scroll-mt-24">
              {fallbackParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div id="data" className="my-10 scroll-mt-24">
            <ArticleCharts categorySlug={article.category.slug} />
          </div>
        </AnimatedSection>

        {/* Tags */}
        <AnimatedSection>
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex items-start gap-3 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-widest text-muted pt-1.5">
                Taggar:
              </span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-[13px] rounded-full border border-border bg-white text-navy hover:border-accent hover:bg-accent/5 hover:text-accent font-medium transition"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Share */}
        <AnimatedSection>
          <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted">
              Gillar du artikeln? Dela den vidare.
            </p>
            <ShareButtons url={articleUrl} title={article.title} />
          </div>
        </AnimatedSection>
      </div>

      {/* Related posts */}
      <section id="fler" className="border-t border-border bg-surface py-10 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection>
            <div className="mb-7">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                Fortsätt läsa
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mt-0.5 leading-none">
                Fler att läsa
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {randomPosts.map((related, i) => (
              <AnimatedSection key={related.id} delay={i * 0.05}>
                <Link
                  href={`/article/${related.slug}`}
                  className="group flex gap-4 items-start py-2 border-b border-border/60 last:border-0"
                >
                  <div className="relative w-28 h-20 sm:w-32 sm:h-24 shrink-0 overflow-hidden bg-gray-100">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      sizes="(min-width: 640px) 128px, 112px"
                      className="object-cover group-hover:scale-[1.04] transition duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="text-[9px] font-semibold uppercase tracking-widest"
                      style={{ color: related.category.color }}
                    >
                      {related.category.name}
                    </span>
                    <h3 className="font-serif text-[14px] font-semibold text-navy mt-1 leading-snug line-clamp-2 group-hover:text-accent transition">
                      {related.title}
                    </h3>
                    <p className="text-[11px] text-muted mt-1.5">
                      {formatDate(related.publishedAt)}
                    </p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite article reader */}
      <InfiniteArticleReader
        currentArticle={article}
        adArticle={adArticle}
        adId={adId}
      />
    </article>
  );
}
