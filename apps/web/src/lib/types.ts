export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: Category;
  author: Author;
  publishedAt: string;
  readTime: number;
  featured: boolean;
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
}
