"use client";

import { useState } from "react";

import type { merchProducts } from "@/content/merch";

import { ProductImages } from "./product-images";

type StoreVariant = {
  product: (typeof merchProducts)[number];
  stock: string[] | null;
};

export function ProductCard({
  title,
  variants,
  pickupAddress,
}: {
  title: string;
  variants: StoreVariant[];
  pickupAddress: string;
}) {
  const [selected, setSelected] = useState(0);
  const { product, stock } = variants[selected];

  return (
    <article className="overflow-hidden rounded-lg border border-white/15">
      {variants.length > 1 && (
        <div role="group" aria-label="Color" className="flex justify-center gap-2 p-3">
          {variants.map(({ product: variant }, index) => (
            <button
              key={variant.slug}
              type="button"
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
              className="rounded border border-current px-3 py-1 text-sm aria-pressed:bg-neutral-900 aria-pressed:text-white"
            >
              {"color" in variant ? variant.color : variant.name}
            </button>
          ))}
        </div>
      )}
      <ProductImages
        src={product.image}
        alt={product.imageAlt}
        alternate={"alternateImage" in product ? product.alternateImage : undefined}
      />
      <div className="space-y-3 p-5">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="font-semibold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(product.priceCents / 100)}
        </p>
        <p>{product.description}</p>
        {stock ? (
          <form
            key={product.slug}
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
              Pickup at Tha Shop, {pickupAddress}
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
                    disabled={!stock.includes(label)}
                  >
                    {label}
                    {stock.includes(label) ? "" : " — unavailable"}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              disabled={!stock.length}
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
  );
}
