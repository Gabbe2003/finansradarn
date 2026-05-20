import { Skeleton, ArticleCardSkeleton, AuthorHeroSkeleton } from "@/components/Skeleton";

export default function AuthorLoading() {
  return (
    <div>
      <section className="bg-gradient-to-b from-surface to-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 pt-10 pb-12">
          <Skeleton className="h-3.5 w-48 mb-6" />
          <AuthorHeroSkeleton />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-5 w-48 mb-5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          </div>
          <aside>
            <div className="bg-white rounded-xl p-5 border border-border">
              <Skeleton className="h-3 w-32 mb-4" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <Skeleton className="w-9 h-9 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-3.5 w-32 mb-1" />
                    <Skeleton className="h-2.5 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
