import type { Metadata } from "next";

import { PostCard } from "@/components/blog/post-card";
import { ContentGap } from "@/components/sections/service-cta";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { blogConfig, getPublishedPosts } from "@/content/blog";
import { getBlogSchema, getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description: blogConfig.indexDescription,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: blogConfig.indexDescription,
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getPublishedPosts();
  const schema = [
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
    getBlogSchema(),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <Section className="grain pt-16 pb-10 md:pt-24">
        <Container>
          <PageHeader
            eyebrow="Blog"
            title={blogConfig.indexTitle}
            description={blogConfig.indexDescription}
          />
        </Container>
      </Section>
      <Section>
        <Container>
          {posts.length > 0 ? (
            <ul className="grid gap-10 md:grid-cols-2">
              {posts.map((post, index) => (
                <PostCard key={post.slug} post={post} priority={index === 0} />
              ))}
            </ul>
          ) : (
            <ContentGap
              title="No posts yet"
              message="Nothing published right now. Check back for shop notes, or call if you want the story on a project you see in The Garage."
            />
          )}
        </Container>
      </Section>
    </>
  );
}
