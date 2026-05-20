export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`animate-pulse bg-slate-200/80 rounded ${className}`}
    />
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="block">
      <Skeleton className="aspect-3/2 mb-3 rounded-lg" />
      <Skeleton className="h-2.5 w-16 mb-2" />
      <Skeleton className="h-5 w-full mb-1.5" />
      <Skeleton className="h-5 w-3/4 mb-3" />
      <Skeleton className="h-3 w-full mb-1" />
      <Skeleton className="h-3 w-2/3 mb-3" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-2.5 w-20" />
        <span className="text-border">|</span>
        <Skeleton className="h-2.5 w-16" />
      </div>
    </div>
  );
}

export function ArticleRowSkeleton() {
  return (
    <div className="flex gap-4 py-3.5">
      <Skeleton className="w-32 h-20 shrink-0" />
      <div className="flex-1 min-w-0">
        <Skeleton className="h-2.5 w-20 mb-2" />
        <Skeleton className="h-4 w-full mb-1.5" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function AuthorHeroSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <Skeleton className="w-30 h-30 rounded-full shrink-0" />
      <div className="flex-1 min-w-0 w-full">
        <Skeleton className="h-2.5 w-20 mb-2" />
        <Skeleton className="h-9 w-2/3 mb-2" />
        <Skeleton className="h-4 w-32 mb-3" />
        <Skeleton className="h-3.5 w-full mb-1.5" />
        <Skeleton className="h-3.5 w-full mb-1.5" />
        <Skeleton className="h-3.5 w-4/5" />
      </div>
    </div>
  );
}
