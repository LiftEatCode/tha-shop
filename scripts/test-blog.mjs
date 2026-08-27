import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const expectedSlugs = [
  "7-signs-you-may-need-brake-repair",
  "1962-dodge-d100-sweptline",
  "how-to-inspect-a-classic-car-before-buying",
  "1945-harley-davidson-wl",
  "5-affordable-motorcycle-performance-mods",
];

const indexSource = read("src/content/blog/index.ts");
assert.match(indexSource, /export function getPostBySlug/);
assert.match(indexSource, /export function getPostSeoFields/);
assert.match(indexSource, /export function getBlogSitemapEntries/);
assert.match(indexSource, /export function getRelatedPosts/);

for (const slug of expectedSlugs) {
  assert.match(
    indexSource,
    new RegExp(slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `registry must include ${slug}`,
  );
}

const postFiles = {
  "7-signs-you-may-need-brake-repair":
    "src/content/blog/posts/7-signs-you-may-need-brake-repair.ts",
  "1962-dodge-d100-sweptline":
    "src/content/blog/posts/1962-dodge-d100-sweptline.ts",
  "how-to-inspect-a-classic-car-before-buying":
    "src/content/blog/posts/how-to-inspect-a-classic-car-before-buying.ts",
  "1945-harley-davidson-wl":
    "src/content/blog/posts/1945-harley-davidson-wl.ts",
  "5-affordable-motorcycle-performance-mods":
    "src/content/blog/posts/5-affordable-motorcycle-performance-mods.ts",
};

const featuredImages = {
  "7-signs-you-may-need-brake-repair": "/images/shop/hero-photo.jpg",
  "1962-dodge-d100-sweptline": "/images/gallery/trucks/1.jpg",
  "how-to-inspect-a-classic-car-before-buying": "/images/gallery/cars/1.jpg",
  "1945-harley-davidson-wl": "/images/gallery/motorcycles/1.jpg",
  "5-affordable-motorcycle-performance-mods":
    "/images/gallery/motorcycles/2.jpg",
};

for (const [slug, relative] of Object.entries(postFiles)) {
  const source = read(relative);
  assert.match(source, new RegExp(`slug:\\s*"${slug}"`));
  assert.match(source, /author:\s*blogConfig\.defaultAuthor/);
  assert.doesNotMatch(source, /Tha Shops/);
  assert.match(
    source,
    new RegExp(
      `featuredImage:\\s*"${featuredImages[slug].replaceAll("/", "\\/")}"`,
    ),
  );
}

const sitemapSource = read("src/app/sitemap.ts");
assert.match(sitemapSource, /getBlogSitemapEntries/);
for (const slug of expectedSlugs) {
  assert.doesNotMatch(
    sitemapSource,
    new RegExp(`/blog/${slug}`),
    "sitemap should include posts from the content registry, not hardcoded article paths",
  );
}

const seoSource = read("src/lib/seo.ts");
assert.match(seoSource, /"@type": "BlogPosting"/);
assert.match(seoSource, /publisher: \{ "@id": `\$\{SITE_URL\}\/#business` \}/);
assert.doesNotMatch(seoSource, /"@type": "AggregateRating"/);
assert.doesNotMatch(seoSource, /"@type": "Review"/);

const articlePage = read("src/app/blog/[slug]/page.tsx");
assert.match(articlePage, /generateStaticParams/);
assert.match(articlePage, /generateMetadata/);
assert.match(articlePage, /getBlogPostingSchema/);
assert.match(articlePage, /getBreadcrumbSchema/);
assert.match(articlePage, /dynamicParams = false/);
assert.match(articlePage, /getRelatedPosts/);

const features = read("src/config/features.ts");
assert.match(features, /storeEnabled:\s*false/);

console.log("BLOG_SLUGS:", expectedSlugs.join(", "));
console.log("SITEMAP_USES_REGISTRY: true");
console.log("STORE_STILL_DISABLED: true");
console.log("BLOG_TEST_OK");
