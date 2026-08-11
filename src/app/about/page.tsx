import Image from "next/image";
import type { Metadata } from "next";

import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { ServiceCta } from "@/components/sections/service-cta";
import { aboutContent } from "@/content/pages";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: aboutContent.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const schema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <Section className="grain pb-10 pt-16 md:pt-24">
        <Container>
          <PageHeader title={aboutContent.title} description={aboutContent.description} />
        </Container>
      </Section>

      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
            <Image
              src={aboutContent.image}
              alt={aboutContent.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-3xl tracking-wide">{aboutContent.mission.title}</h2>
              <p className="mt-3 leading-relaxed text-steel">{aboutContent.mission.body}</p>
            </div>
            <div>
              <h2 className="font-display text-3xl tracking-wide">{aboutContent.craft.title}</h2>
              <p className="mt-3 leading-relaxed text-steel">{aboutContent.craft.body}</p>
            </div>
            <div>
              <h2 className="font-display text-3xl tracking-wide">{aboutContent.discount.title}</h2>
              <p className="mt-3 leading-relaxed text-steel">{aboutContent.discount.body}</p>
            </div>
          </div>
        </Container>
        <Container className="mt-16">
          <ServiceCta title="Come see the shop" />
        </Container>
      </Section>
    </>
  );
}
