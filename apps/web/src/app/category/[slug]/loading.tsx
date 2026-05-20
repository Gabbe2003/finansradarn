import { Skeleton, ArticleCardSkeleton, ArticleRowSkeleton } from "@/components/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Skeleton className="h-3.5 w-40 mb-6" />
      <div className="mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-9 w-56" />
        </div>
        <Skeleton className="h-4 w-96 mt-3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
        <aside className="space-y-6">
          <div className="bg-white rounded-xl p-5 border border-border">
            <Skeleton className="h-3 w-32 mb-4" />
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="py-2.5 flex items-center gap-3">
                <Skeleton className="w-2.5 h-2.5 rounded" />
                <Skeleton className="h-3.5 flex-1" />
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl p-5 border border-border">
            <Skeleton className="h-3 w-32 mb-4" />
            {Array.from({ length: 4 }).map((_, i) => (
              <ArticleRowSkeleton key={i} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
