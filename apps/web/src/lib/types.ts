export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  /** Original HTML body from WP (headings, lists, links preserved). Falls back to plain `content` for mock articles. */
  contentHtml?: string;
  image: string;
  /** Optional caption for the featured image (WP `caption.rendered`, stripped to plain text). */
  imageCaption?: string;
  category: Category;
  author: Author;
  publishedAt: string;
  readTime: number;
  /** Word count of the article body. */
  wordCount?: number;
  featured: boolean;
  breaking?: boolean;
  views: ViewStats;
}

export interface ViewStats {
  today: number;
  twoDays: number;
  week: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
  slug?: string;
  bio?: string;
}
