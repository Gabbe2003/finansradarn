import { Skeleton, ArticleCardSkeleton } from "@/components/Skeleton";

export default function ArticleLoading() {
  return (
    <article>
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-6">
        <Skeleton className="h-3.5 w-32 mb-4" />
        <Skeleton className="h-7 w-32 rounded-full mb-3" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-5/6 mb-4" />
        <Skeleton className="h-5 w-full mb-1.5" />
        <Skeleton className="h-5 w-4/5 mb-1.5" />
        <Skeleton className="h-5 w-2/3" />

        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-1.5" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="text-right">
            <Skeleton className="h-3.5 w-20 mb-1 ml-auto" />
            <Skeleton className="h-3 w-16 ml-auto" />
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-border/50">
          <Skeleton className="h-3 w-64" />
        </div>
      </div>

      {/* Featured image */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <Skeleton className="aspect-2/1 rounded-2xl" />
      </div>

      {/* TOC + body */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <Skeleton className="h-14 mb-8 rounded-xl" />

        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className={`h-4 ${i % 3 === 0 ? "w-2/3" : "w-11/12"}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Related posts */}
      <section className="border-t border-border bg-surface py-10">
        <div className="max-w-5xl mx-auto px-4">
          <Skeleton className="h-5 w-32 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
