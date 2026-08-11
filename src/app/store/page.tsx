import type { Metadata } from "next";

import { ContentGap } from "@/components/sections/service-cta";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Tha Shops merchandise and featured products. The online store will open when inventory is ready.",
  alternates: { canonical: "/store" },
};

export default function StorePage() {
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
      <Section className="grain pb-10 pt-16 md:pt-24">
        <Container>
          <PageHeader
            title="Store"
            description="The previous site showed a Featured Products section and store page with no items. We removed empty placeholders instead of inventing merchandise."
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <ContentGap
            title="Online store not stocked yet"
            message={`Call ${siteConfig.phone.display} if you are looking for shop gear or parts recommendations. Product listings will be added here once real inventory is provided.`}
          />
        </Container>
      </Section>
    </>
  );
}
