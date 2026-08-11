import type { Metadata } from "next";

import { ContentGap } from "@/components/sections/service-cta";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Project builds and restorations from Tha Shops. New posts will appear here when published.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const schema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <Section className="grain pb-10 pt-16 md:pt-24">
        <Container>
          <PageHeader
            title="Project builds & restorations"
            description="This is where build journals and restoration stories will live. The previous site advertised a blog, but no published posts were available to migrate."
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <ContentGap
            title="No posts yet"
            message="We did not invent blog articles. When Tha Shops is ready to publish build write-ups, they can be added here with unique titles, photos, and publish dates."
          />
        </Container>
      </Section>
    </>
  );
}
