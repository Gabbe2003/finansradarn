export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  featured_media: number;
  categories: number[];
  author: number;
  acf?: {
    read_time?: number;
    featured?: boolean;
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPCategory[][];
    author?: WPAuthor[];
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  acf?: {
    color?: string;
  };
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls?: Record<string, string>;
  description?: string;
  acf?: {
    role?: string;
  };
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}
