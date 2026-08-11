import type { Metadata } from "next";

import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using the Tha Shops website.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container className="max-w-3xl space-y-6">
        <PageHeader title="Terms and Conditions" />
        <p className="text-sm leading-relaxed text-steel">
          By using {siteConfig.domain}, you agree to use the site for lawful purposes related to
          learning about Tha Shops services, inventory, and events. Website content is provided
          for general information and may change without notice.
        </p>
        <p className="text-sm leading-relaxed text-steel">
          Vehicle listings, pricing (when shown), and appointment availability are not guarantees
          until confirmed directly with the shop. Service work is subject to inspection and
          separate agreement at the time of service.
        </p>
        <p className="text-sm leading-relaxed text-steel">
          For questions, call{" "}
          <a href={siteConfig.phone.href} className="font-semibold text-ink">
            {siteConfig.phone.display}
          </a>
          .
        </p>
      </Container>
    </Section>
  );
}
