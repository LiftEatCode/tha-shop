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
  title: services.auto.metaTitle,
  description: services.auto.metaDescription,
  alternates: { canonical: "/auto-services" },
};

export default function AutoServicesPage() {
  const content = services.auto;
  const schema = [
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Auto Services", path: "/auto-services" },
    ]),
    getServiceSchema({
      name: content.title,
      description: content.metaDescription,
      path: "/auto-services",
      serviceType: "AutomotiveRepair",
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
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            {content.categories.map((category) => (
              <div key={category.title} className="border-t border-ink/15 pt-5">
                <h2 className="font-display text-2xl tracking-wide text-ink">
                  {category.title}
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-steel">
                  {category.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <ServiceCta title="Schedule auto service" />
          </div>
        </Container>
      </Section>
    </>
  );
}
