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
            title="Build notes"
            description="Write-ups on projects and restorations from the Magnolia shop — when we publish them, they land here."
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <ContentGap
            title="No posts yet"
            message="Nothing published right now. Check back for build journals, or call the shop if you want the story on a project you see in The Garage."
          />
        </Container>
      </Section>
    </>
  );
}
