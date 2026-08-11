import Image from "next/image";
import type { Metadata } from "next";

import { ButtonLink, Container, PageHeader, Section } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { inventory } from "@/content/pages";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Vehicles for Sale",
  description:
    "Current cars, trucks, and RVs for sale from Tha Shops in Magnolia, TX. Call to check availability or schedule a look.",
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
      <Section className="grain pb-10 pt-16 md:pt-24">
        <Container>
          <PageHeader
            eyebrow="Inventory"
            title="Cars, trucks & RVs for sale"
            description="Listings currently published by Tha Shops. Availability changes — call to confirm before you drive out."
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <ul className="grid gap-10 md:grid-cols-2">
            {inventory.map((item) => (
              <li key={item.id} className="flex flex-col border-t border-ink/15 pt-6">
                <div className="relative mb-5 aspect-[16/10] overflow-hidden bg-ink/5">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">
                  {item.category}
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-wide text-ink">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-steel">{item.description}</p>
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
