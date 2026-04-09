import { notFound } from "next/navigation";
import { categories, getArticlesByCategory, articles } from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Kategorin hittades inte" };
  return {
    title: `${category.name} — FinansRadarn`,
    description: `Senaste nyheterna och analyserna inom ${category.name.toLowerCase()} från FinansRadarn.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  const categoryArticles = getArticlesByCategory(slug);
  const otherCategories = categories.filter((c) => c.slug !== slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <AnimatedSection>
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
          <span className="text-muted/50">/</span>
          <span className="font-semibold" style={{ color: category.color }}>{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: category.color }} />
            <h1 className="font-serif text-3xl font-bold text-navy">{category.name}</h1>
          </div>
          <p className="text-muted mt-2">
            Senaste nyheter, analyser och fördjupningar inom {category.name.toLowerCase()}.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Articles */}
        <div className="lg:col-span-2">
          {categoryArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted text-lg">Inga artiklar i denna kategori ännu.</p>
              <Link href="/" className="text-accent hover:underline mt-2 inline-block font-semibold">
                Tillbaka till startsidan
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categoryArticles.map((article, i) => (
                <AnimatedSection key={article.id} delay={i * 0.08}>
                  <ArticleCard article={article} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <AnimatedSection direction="right">
            <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
              <h3 className="font-bold text-xs uppercase tracking-widest text-muted mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-accent rounded-full"></span>
                Övriga kategorier
              </h3>
              <div className="flex flex-col gap-1">
                {otherCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface transition"
                  >
                    <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm font-medium">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
              <h3 className="font-bold text-xs uppercase tracking-widest text-muted mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-accent rounded-full"></span>
                Senaste rubrikerna
              </h3>
              <div>
                {articles.slice(0, 5).map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </aside>
      </div>
    </div>
  );
}
