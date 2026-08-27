import { affordableMotorcyclePerformanceMods } from "./posts/5-affordable-motorcycle-performance-mods";
import { signsYouNeedBrakeRepair } from "./posts/7-signs-you-may-need-brake-repair";
import { dodgeD100Sweptline } from "./posts/1962-dodge-d100-sweptline";
import { harleyDavidsonWl } from "./posts/1945-harley-davidson-wl";
import { inspectClassicCarBeforeBuying } from "./posts/how-to-inspect-a-classic-car-before-buying";
import type { BlogPost } from "./types";

/** Register new posts here. Drafts (`draft: true`) stay off the index, routes, and sitemap. */
const posts: readonly BlogPost[] = [
  signsYouNeedBrakeRepair,
  dodgeD100Sweptline,
  inspectClassicCarBeforeBuying,
  harleyDavidsonWl,
  affordableMotorcyclePerformanceMods,
];

export type { BlogPost, BlogBlock, BlogInline, BlogCategory } from "./types";
export { blogConfig, BLOG_CATEGORIES } from "./config";

export function getPostPath(slug: string): string {
  return `/blog/${slug}`;
}

export function getPublishedPosts(): BlogPost[] {
  return [...posts]
    .filter((post) => !post.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const others = getPublishedPosts().filter((item) => item.slug !== post.slug);
  const tagged = new Set(post.tags);

  return others
    .map((item) => {
      const categoryScore = item.category === post.category ? 2 : 0;
      const tagScore = item.tags.filter((tag) => tagged.has(tag)).length;
      return { item, score: categoryScore + tagScore };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export function getPostLastModified(post: BlogPost): string {
  return post.updatedAt ?? post.publishedAt;
}

export function getPostSeoFields(post: BlogPost) {
  const path = getPostPath(post.slug);

  return {
    path,
    title: post.metaTitle,
    description: post.description,
    publishedAt: post.publishedAt,
    modifiedAt: getPostLastModified(post),
    image: post.featuredImage,
    imageAlt: post.featuredImageAlt,
    author: post.author,
  };
}

export function getBlogSitemapEntries(): {
  path: string;
  lastModified: string;
}[] {
  return getPublishedPosts().map((post) => ({
    path: getPostPath(post.slug),
    lastModified: getPostLastModified(post),
  }));
}

export function formatPostDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
