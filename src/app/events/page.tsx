import type { Metadata } from "next";

import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { galleryPages } from "@/content/pages";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: galleryPages.events.title,
  description: galleryPages.events.metaDescription,
  alternates: { canonical: "/events" },
};

export default function EventsGalleryPage() {
  const content = galleryPages.events;
  const schema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <Section className="grain pb-10 pt-16 md:pt-24">
        <Container>
          <PageHeader title={content.h1} description={content.intro} />
        </Container>
      </Section>
      <Section>
        <Container>
          <GalleryGrid images={content.images} priorityCount={2} />
        </Container>
      </Section>
    </>
  );
}
