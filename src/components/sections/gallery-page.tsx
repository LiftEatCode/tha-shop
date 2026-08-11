import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { ServiceCta } from "@/components/sections/service-cta";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

type GalleryImage = { src: string; alt: string };

type GalleryPageContent = {
  h1: string;
  intro: string;
  images: readonly GalleryImage[];
};

/** Shared layout for /cars, /trucks, /motorcycles, and /events galleries. */
export function GalleryPageView({
  breadcrumbName,
  path,
  content,
  ctaTitle,
  priorityCount = 4,
}: {
  breadcrumbName: string;
  path: string;
  content: GalleryPageContent;
  ctaTitle?: string;
  priorityCount?: number;
}) {
  const schema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: breadcrumbName, path },
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
          <GalleryGrid images={content.images} priorityCount={priorityCount} />
          {ctaTitle ? (
            <div className="mt-16">
              <ServiceCta title={ctaTitle} />
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
