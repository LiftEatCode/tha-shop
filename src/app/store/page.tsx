import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCard } from "./product-card";

import { merchProducts } from "@/content/merch";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { availableSizes, checkoutConfig } from "@/lib/merch/orders";
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
    description: "Browse Tha Shop merchandise and Crazy Eight Customs gear.",
    alternates: { canonical: "/store" },
  };
}

const checkoutMessages = {
  returned:
    "Thanks. If payment went through, Stripe will confirm it by email if receipts are enabled.",
  canceled:
    "Checkout was canceled. Any reserved shirt returns to stock when the checkout session expires.",
  "sold-out": "That size is currently unavailable. Please choose another size.",
  invalid: "Choose an available size.",
  unavailable: "Checkout is temporarily unavailable. Please try again.",
};

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string | string[] }>;
}) {
  if (!featureFlags.storeEnabled) {
    notFound();
  }

  const { checkout } = await searchParams;
  const notice = Object.entries(checkoutMessages).find(
    ([key]) => key === checkout,
  )?.[1];
  const stock = checkoutConfig()
    ? await Promise.all(
        merchProducts.map(({ slug }) => availableSizes(slug)),
      ).catch(() => null)
    : null;

  const listings = new Map<
    string,
    { product: (typeof merchProducts)[number]; stock: string[] | null }[]
  >();
  merchProducts.forEach((product, index) => {
    const title = "listing" in product ? product.listing : product.name;
    const variant = { product, stock: stock ? Array.from(stock[index]) : null };
    const variants = listings.get(title);
    if (variants) variants.push(variant);
    else listings.set(title, [variant]);
  });

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
          {notice && (
            <p role="status" className="mb-6">
              {notice}
            </p>
          )}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from(listings, ([title, variants]) => (
              <ProductCard
                key={title}
                title={title}
                variants={variants}
                pickupAddress={siteConfig.address.full}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
