import { Skeleton, ArticleCardSkeleton, ArticleRowSkeleton } from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <div>
      {/* News ticker */}
      <div className="bg-navy h-9 border-b border-white/10" />
      {/* Market ticker */}
      <div className="bg-surface h-9 border-b border-border" />
      {/* Key metrics */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 flex-1 min-w-24" />
          ))}
        </div>
      </div>

      {/* Hero — 3-column */}
      <section className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x divide-border">
          <div className="lg:col-span-5 lg:pr-6 pb-6 lg:pb-0">
            <Skeleton className="aspect-16/9 mb-3" />
            <Skeleton className="h-7 w-full mb-2" />
            <Skeleton className="h-7 w-3/4 mb-3" />
            <Skeleton className="h-3.5 w-full mb-1.5" />
            <Skeleton className="h-3.5 w-2/3" />
            <div className="mt-4 pt-4 border-t border-border space-y-1 divide-y divide-border">
              <ArticleRowSkeleton />
              <ArticleRowSkeleton />
            </div>
          </div>
          <div className="lg:col-span-4 lg:px-6 pb-6 lg:pb-0 border-t lg:border-t-0 border-border pt-6 lg:pt-0">
            <Skeleton className="h-3 w-24 mb-4" />
            <div className="divide-y divide-border/60">
              <div className="py-3">
                <Skeleton className="aspect-16/7 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="py-3">
                  <Skeleton className="h-2.5 w-20 mb-1.5" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 lg:pl-6 border-t lg:border-t-0 border-border pt-6 lg:pt-0">
            <Skeleton className="h-3 w-20 mb-4" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="py-3 border-b border-border/60 last:border-0">
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools section */}
      <section className="bg-surface border-y border-border py-10">
        <div className="max-w-7xl mx-auto px-4">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-3.5 w-72 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <Skeleton className="lg:col-span-5 h-96 rounded-2xl" />
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <Skeleton className="h-6 w-40 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
