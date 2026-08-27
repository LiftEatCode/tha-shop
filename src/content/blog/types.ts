import { BLOG_CATEGORIES } from "./config";

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogInline =
  | string
  | {
      text: string;
      href: string;
    };

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "p"; parts: BlogInline[] }
  | { type: "h2"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: BlogCategory;
  tags: readonly string[];
  featuredImage: string;
  featuredImageAlt: string;
  relatedService?: {
    href: string;
    label: string;
  };
  draft?: boolean;
  content: readonly BlogBlock[];
};
