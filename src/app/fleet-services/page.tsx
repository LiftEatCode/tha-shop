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
  title: services.fleet.metaTitle,
  description: services.fleet.metaDescription,
  alternates: { canonical: "/fleet-services" },
};

export default function FleetServicesPage() {
  const content = services.fleet;
  const schema = [
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Fleet Services", path: "/fleet-services" },
    ]),
    getServiceSchema({
      name: content.title,
      description: content.metaDescription,
      path: "/fleet-services",
      serviceType: "FleetVehicleMaintenance",
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
          <ol className="grid gap-8 md:grid-cols-2">
            {content.points.map((point, index) => (
              <li key={point.title} className="border-t border-ink/15 pt-5">
                <p className="font-display text-sm uppercase tracking-[0.18em] text-ember">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-2xl tracking-wide text-ink">
                  {point.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-steel">{point.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16">
            <ServiceCta title="Talk to us about your fleet" />
          </div>
        </Container>
      </Section>
    </>
  );
}
