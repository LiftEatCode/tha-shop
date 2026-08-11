import Image from "next/image";
import type { Metadata } from "next";

import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { ServiceCta } from "@/components/sections/service-cta";
import { services } from "@/content/pages";
import {
  getBreadcrumbSchema,
  getServiceSchema,
  serializeJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: services.fabrication.metaTitle,
  description: services.fabrication.metaDescription,
  alternates: { canonical: "/fabrication-services" },
};

export default function FabricationServicesPage() {
  const content = services.fabrication;
  const schema = [
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Fabrication Services", path: "/fabrication-services" },
    ]),
    getServiceSchema({
      name: content.title,
      description: content.metaDescription,
      path: "/fabrication-services",
      serviceType: "MetalFabrication",
    }),
  ];

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
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-square overflow-hidden bg-ink/5">
            <Image
              src="/images/brands/hotrod-fab.jpg"
              alt="Hotrod Fabrication logo"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-5 text-base leading-relaxed text-steel">
            {content.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Container>
        <Container className="mt-16">
          <ServiceCta title="Start a fabrication project" />
        </Container>
      </Section>
    </>
  );
}
