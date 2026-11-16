import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Image from "next/image";

import { merchProducts } from "@/content/merch";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { featureFlags } from "@/config/features";
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
      "Browse Tha Shop merchandise and Crazy Eight Customs gear.",
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
            description="Tha Shop and Crazy Eight Customs gear."
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {merchProducts.map((product) => (
              <article key={product.slug} className="overflow-hidden rounded-lg border border-white/15">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  width={900}
                  height={900}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-square w-full object-cover"
                />
                <div className="space-y-3 p-5">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="font-semibold">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                      product.priceCents / 100,
                    )}
                  </p>
                  <p>{product.description}</p>
                  <p>Sizes: {product.sizes.filter(({ initialQuantity }) => initialQuantity > 0).map(({ label }) => label).join(", ")}</p>
                  <p>Online ordering coming soon.</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
