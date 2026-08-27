import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/blog/article-body";
import { ArticleCta } from "@/components/blog/article-cta";
import { PostCard } from "@/components/blog/post-card";
import { Container, Section } from "@/components/ui/primitives";
import {
  formatPostDate,
  getPostBySlug,
  getPostLastModified,
  getPostPath,
  getPostSeoFields,
  getPublishedPosts,
  getRelatedPosts,
} from "@/content/blog";
import {
  getAbsoluteUrl,
  getBlogPostingSchema,
  getBreadcrumbSchema,
  serializeJsonLd,
} from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const seo = getPostSeoFields(post);

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.path },
    authors: [{ name: seo.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: seo.description,
      url: getAbsoluteUrl(seo.path),
      publishedTime: seo.publishedAt,
      modifiedTime: seo.modifiedAt,
      authors: [seo.author],
      images: [
        {
          url: seo.image,
          alt: seo.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const path = getPostPath(post.slug);
  const lastModified = getPostLastModified(post);
  const related = getRelatedPosts(post);
  const showUpdated = Boolean(
    post.updatedAt && post.updatedAt !== post.publishedAt,
  );

  const schema = [
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path },
    ]),
    getBlogPostingSchema({
      title: post.title,
      description: post.description,
      path,
      image: post.featuredImage,
      datePublished: post.publishedAt,
      dateModified: lastModified,
      author: post.author,
    }),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <article>
        <Section className="grain pt-16 pb-10 md:pt-24">
          <Container className="max-w-3xl">
            <p className="text-engine font-mono text-xs font-semibold tracking-[0.16em] uppercase">
              {post.category}
            </p>
            <h1 className="font-display text-bay mt-3 text-4xl leading-none tracking-wide sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <p className="text-steel mt-5 font-mono text-sm tracking-wide">
              <span>{post.author}</span>
              <span aria-hidden="true"> · </span>
              <time dateTime={post.publishedAt}>
                {formatPostDate(post.publishedAt)}
              </time>
              {showUpdated && post.updatedAt ? (
                <>
                  <span aria-hidden="true"> · </span>
                  <span>
                    Updated{" "}
                    <time dateTime={post.updatedAt}>
                      {formatPostDate(post.updatedAt)}
                    </time>
                  </span>
                </>
              ) : null}
            </p>
          </Container>
        </Section>

        <Section>
          <Container className="max-w-3xl">
            <div className="bg-bay/5 relative mb-10 aspect-[16/9] overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.featuredImageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
            <ArticleBody content={post.content} />
            <div className="mt-14">
              <ArticleCta
                title="Need the brakes inspected?"
                description="Tell us the vehicle and what you are hearing or feeling. We will follow up to confirm an appointment."
                serviceHref={post.relatedService?.href}
                serviceLabel={post.relatedService?.label}
              />
            </div>
          </Container>
        </Section>
      </article>

      {related.length > 0 ? (
        <Section tone="muted">
          <Container>
            <h2 className="font-display text-bay text-3xl tracking-wide">
              Related notes
            </h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-2">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} headingLevel="h3" />
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
