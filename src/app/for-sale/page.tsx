import Image from "next/image";
import type { Metadata } from "next";

import {
  ButtonLink,
  Container,
  PageHeader,
  Section,
} from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { inventory } from "@/content/pages";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Vehicles for Sale",
  description:
    "Current cars, trucks, and RVs for sale from Tha Shop in Magnolia, TX. Call to check availability or schedule a look.",
  alternates: { canonical: "/for-sale" },
};

export default function ForSalePage() {
  const schema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "For Sale", path: "/for-sale" },
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
            eyebrow="Inventory"
            title="Cars, trucks & RVs for sale"
            description="Listings currently published by Tha Shop. Availability changes — call to confirm before you drive out."
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <ul className="grid gap-10 md:grid-cols-2">
            {inventory.map((item) => (
              <li
                key={item.id}
                className="border-bay/15 flex flex-col border-t pt-6"
              >
                <div className="bg-bay/5 relative mb-5 aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-engine font-mono text-xs font-semibold tracking-[0.16em] uppercase">
                  {item.category}
                </p>
                <h2 className="font-display text-bay mt-2 text-3xl tracking-wide">
                  {item.title}
                </h2>
                <p className="text-steel mt-3 text-sm leading-relaxed">
                  {item.description}
                </p>
                <ButtonLink
                  href={siteConfig.phone.href}
                  variant="primary"
                  className="mt-5 self-start"
                >
                  Call about this vehicle
                </ButtonLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
