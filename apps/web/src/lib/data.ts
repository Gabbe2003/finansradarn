/**
 * Shared formatting helpers. Mock article/author/category data used to live
 * here — it has been removed; all content now comes from WordPress via
 * `@/lib/content` and `@/lib/wordpress/client`.
 */

export type TimePeriod = "today" | "twoDays" | "week";

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}k`;
  return String(n);
}
