import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatDate } from "@/lib/data";
import { fetchAuthorBySlug, fetchAuthors } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";
import AnimatedSection from "@/components/AnimatedSection";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = await fetchAuthors();
  return authors
    .filter((a) => !!a.slug)
    .map((a) => ({ slug: a.slug as string }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { author } = await fetchAuthorBySlug(slug);
  if (!author) {
    return { title: "Skribenten hittades inte", robots: { index: false, follow: false } };
  }
  return {
    title: `${author.name} — ${author.role}`,
    description:
      author.bio ||
      `Artiklar och analyser av ${author.name}, ${author.role.toLowerCase()} på FinansRadarn.`,
    alternates: { canonical: `/author/${slug}` },
    openGraph: {
      type: "profile",
      title: `${author.name} — FinansRadarn`,
      description: author.bio || `${author.role} på FinansRadarn`,
      images: [{ url: author.avatar }],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const [{ author, articles: authorArticles }, allAuthors] = await Promise.all([
    fetchAuthorBySlug(slug),
    fetchAuthors(),
  ]);
  if (!author) notFound();

  const sorted = [...authorArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const lastPublished = sorted[0]?.publishedAt;
  const otherAuthors = allAuthors.filter((a) => a.id !== author.id);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    image: author.avatar,
    url: `/author/${author.slug}`,
    affiliation: { "@type": "Organization", name: "FinansRadarn" },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section className="bg-linear-to-b from-surface to-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 pt-10 pb-12">
          <AnimatedSection>
            <div className="flex items-center gap-2 text-sm mb-6">
              <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
              <span className="text-muted/50">/</span>
              <span className="text-muted">Skribenter</span>
              <span className="text-muted/50">/</span>
              <span className="text-navy font-semibold">{author.name}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative shrink-0">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={120}
                  height={120}
                  className="rounded-full ring-4 ring-accent/30 shadow-lg"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">
                  Skribent
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mt-1 leading-tight">
                  {author.name}
                </h1>
                <p className="text-muted font-semibold mt-1">{author.role}</p>
                {author.bio && (
                  <p className="text-[15px] text-gray-700 mt-3 leading-relaxed max-w-2xl">
                    {author.bio}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-4 text-[12px] text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    {authorArticles.length} {authorArticles.length === 1 ? "artikel" : "artiklar"}
                  </span>
                  {lastPublished && (
                    <span className="inline-flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Senast publicerad {formatDate(lastPublished)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatedSection>
              <h2 className="text-lg font-black mb-5 flex items-center gap-3">
                <span className="w-1 h-5 bg-accent rounded-full" />
                Artiklar av {author.name.split(" ")[0]}
              </h2>
            </AnimatedSection>

            {sorted.length === 0 ? (
              <AnimatedSection>
                <div className="text-center py-16 border border-dashed border-border rounded-xl">
                  <p className="text-muted text-lg">Inga artiklar publicerade ännu.</p>
                  <Link href="/" className="text-accent hover:underline mt-2 inline-block font-semibold">
                    Tillbaka till startsidan
                  </Link>
                </div>
              </AnimatedSection>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sorted.map((article, i) => (
                  <AnimatedSection key={article.id} delay={i * 0.06}>
                    <ArticleCard article={article} />
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <AnimatedSection direction="right">
              <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
                <h3 className="font-bold text-xs uppercase tracking-widest text-muted mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-accent rounded-full" />
                  Fler skribenter
                </h3>
                <div className="flex flex-col gap-1">
                  {otherAuthors.map((a) => (
                    <Link
                      key={a.id}
                      href={a.slug ? `/author/${a.slug}` : "#"}
                      className="group flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-surface transition"
                    >
                      <Image
                        src={a.avatar}
                        alt={a.name}
                        width={36}
                        height={36}
                        className="rounded-full ring-1 ring-border group-hover:ring-accent/50 transition"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-navy group-hover:text-accent transition truncate">
                          {a.name}
                        </p>
                        <p className="text-[11px] text-muted truncate">{a.role}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </aside>
        </div>
      </div>
    </div>
  );
}
