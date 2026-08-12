import type { Metadata } from "next";

import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Tha Shops website.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  const schema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy-policy" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <Section className="pt-16 md:pt-24">
        <Container className="max-w-3xl space-y-6">
          <PageHeader title="Privacy Policy" />
          <p className="text-sm leading-relaxed text-steel">
            Tha Shops ({siteConfig.address.full}) respects your privacy. Information you submit
            through appointment or contact forms — such as name, email, phone, vehicle details,
            message content, and optional photo attachments — is used only to respond to your
            request and schedule service.
          </p>
          <p className="text-sm leading-relaxed text-steel">
            We do not sell personal information. Form delivery may use email or a database
            operated on our behalf. Access is limited to people who need it to serve customers.
          </p>
          <p className="text-sm leading-relaxed text-steel">
            Questions about this policy can be directed by calling{" "}
            <a href={siteConfig.phone.href} className="font-semibold text-bay">
              {siteConfig.phone.display}
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
