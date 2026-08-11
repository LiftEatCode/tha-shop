import type { Metadata } from "next";

import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { ServiceCta } from "@/components/sections/service-cta";
import { galleryPages } from "@/content/pages";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: galleryPages.trucks.title,
  description: galleryPages.trucks.metaDescription,
  alternates: { canonical: "/trucks" },
};

export default function TrucksPage() {
  const content = galleryPages.trucks;
  const schema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Trucks", path: "/trucks" },
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
          <GalleryGrid images={content.images} priorityCount={4} />
          <div className="mt-16">
            <ServiceCta title="Talk about a truck project" />
          </div>
        </Container>
      </Section>
    </>
  );
}
