import type { Metadata } from "next";

import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using the Tha Shop website.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  const schema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Terms and Conditions", path: "/terms-and-conditions" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <Section className="pt-16 md:pt-24">
        <Container className="max-w-3xl space-y-6">
          <PageHeader title="Terms and Conditions" />
          <p className="text-steel text-sm leading-relaxed">
            By using {siteConfig.domain}, you agree to use the site for lawful
            purposes related to learning about Tha Shop services, inventory, and
            events. Website content is provided for general information and may
            change without notice.
          </p>
          <p className="text-steel text-sm leading-relaxed">
            Vehicle listings, pricing (when shown), and appointment availability
            are not guarantees until confirmed directly with the shop. Service
            work is subject to inspection and separate agreement at the time of
            service.
          </p>
          <p className="text-steel text-sm leading-relaxed">
            For questions, call{" "}
            <a href={siteConfig.phone.href} className="text-bay font-semibold">
              {siteConfig.phone.display}
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
