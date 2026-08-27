import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentGap } from "@/components/sections/service-cta";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { featureFlags } from "@/config/features";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export function generateMetadata(): Metadata {
  if (!featureFlags.storeEnabled) {
    return {
      robots: { index: false, follow: false },
    };
  }

  return {
    title: "Store",
    description:
      "Tha Shop merchandise and featured products. The online store will open when inventory is ready.",
    alternates: { canonical: "/store" },
  };
}

export default function StorePage() {
  if (!featureFlags.storeEnabled) {
    notFound();
  }

  const schema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Store", path: "/store" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <Section className="grain pt-16 pb-10 md:pt-24">
        <Container>
          <PageHeader
            title="Store"
            description="Shop gear and featured products will list here when inventory is ready."
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <ContentGap
            title="Nothing listed online yet"
            message={`Need parts advice or shop gear? Call ${siteConfig.phone.display} — we will help you find it. Listings go up here once real stock is ready.`}
          />
        </Container>
      </Section>
    </>
  );
}
