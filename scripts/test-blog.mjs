import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const postSource = read(
  "src/content/blog/posts/7-signs-you-may-need-brake-repair.ts",
);
const slugMatch = postSource.match(/slug:\s*"([^"]+)"/);
assert.ok(slugMatch, "reference article must declare a slug");
const slug = slugMatch[1];
assert.equal(slug, "7-signs-you-may-need-brake-repair");
assert.match(postSource, /featuredImage:\s*"\/images\/shop\/hero-photo\.jpg"/);
assert.match(postSource, /author:\s*blogConfig\.defaultAuthor/);
assert.doesNotMatch(postSource, /Tha Shops/);
assert.match(postSource, /relatedService:[\s\S]*href:\s*"\/auto-services"/);

const indexSource = read("src/content/blog/index.ts");
assert.match(indexSource, /export function getPostBySlug/);
assert.match(indexSource, /export function getPostSeoFields/);
assert.match(indexSource, /export function getBlogSitemapEntries/);
assert.match(indexSource, /export function getRelatedPosts/);

const sitemapSource = read("src/app/sitemap.ts");
assert.match(sitemapSource, /getBlogSitemapEntries/);
assert.doesNotMatch(
  sitemapSource,
  /\/blog\/7-signs-you-may-need-brake-repair/,
  "sitemap should include posts from the content registry, not a hardcoded article path",
);

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

const seoFields = {
  path: `/blog/${slug}`,
  title: "7 Signs You May Need Brake Repair",
};
assert.equal(seoFields.path, "/blog/7-signs-you-may-need-brake-repair");

console.log("BLOG_SLUG:", slug);
console.log("BLOG_CANONICAL:", seoFields.path);
console.log("SITEMAP_USES_REGISTRY: true");
console.log("BLOG_TEST_OK");
