import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { ServiceCta } from "@/components/sections/service-cta";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  album?: string;
};

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
      <Section className="grain pt-16 pb-10 md:pt-24">
        <Container>
          <PageHeader title={content.h1} description={content.intro} />
        </Container>
      </Section>
      <Section>
        <Container>
          {content.images.length ? (
            [...new Set(content.images.map((i) => i.album || ""))].map(
              (album, index) => (
                <section key={album} className="mb-10">
                  {album ? (
                    <h2 className="font-display mb-5 text-3xl">{album}</h2>
                  ) : null}
                  <GalleryGrid
                    images={content.images.filter(
                      (i) => (i.album || "") === album,
                    )}
                    priorityCount={index === 0 ? priorityCount : 0}
                  />
                </section>
              ),
            )
          ) : (
            <p>
              New photos are coming soon. Check back to see what’s happening at
              the shop.
            </p>
          )}
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
