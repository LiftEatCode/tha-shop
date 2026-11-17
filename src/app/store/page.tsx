import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Image from "next/image";

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
            {merchProducts.map((product, index) => (
              <article
                key={product.slug}
                className="overflow-hidden rounded-lg border border-white/15"
              >
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
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(product.priceCents / 100)}
                  </p>
                  <p>{product.description}</p>
                  {stock ? (
                    <form
                      action="/api/merch/checkout"
                      method="post"
                      className="space-y-3"
                    >
                      <input
                        type="hidden"
                        name="product"
                        value={product.slug}
                      />
                      <p className="text-sm">
                        Pickup at Tha Shop, {siteConfig.address.full}
                      </p>
                      <label className="block">
                        <span className="block text-sm font-semibold">
                          Size
                        </span>
                        <select
                          name="size"
                          required
                          defaultValue=""
                          className="w-full rounded-sm border px-3 py-2"
                        >
                          <option value="" disabled>
                            Choose a size
                          </option>
                          {product.sizes.map(({ label }) => (
                            <option
                              key={label}
                              value={label}
                              disabled={!stock[index].has(label)}
                            >
                              {label}
                              {stock[index].has(label) ? "" : " — unavailable"}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="submit"
                        disabled={!stock[index].size}
                        className="bg-engine rounded-sm px-4 py-2 font-semibold text-white disabled:opacity-50"
                      >
                        Buy now
                      </button>
                    </form>
                  ) : (
                    <>
                      <p>
                        Sizes:{" "}
                        {product.sizes.map(({ label }) => label).join(", ")}
                      </p>
                      <p>Online ordering coming soon.</p>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
