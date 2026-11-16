import { featureFlags } from "@/config/features";
import { siteConfig } from "@/config/site";
import { merchProducts } from "@/content/merch";
import { checkoutConfig, reserveCheckout } from "@/lib/merch/orders";

export async function POST(request: Request) {
  if (!featureFlags.storeEnabled) return new Response(null, { status: 404 });
  const config = checkoutConfig();
  if (!config) return new Response("Checkout is unavailable", { status: 503 });
  if (request.headers.get("origin") !== config.origin) {
    return new Response("Invalid origin", { status: 403 });
  }
  const redirect = (status: string) =>
    Response.redirect(new URL(`/store?checkout=${status}`, config.origin), 303);
  try {
    const form = await request.formData();
    const product = merchProducts.find(
      ({ slug }) => slug === form.get("product"),
    );
    const size = product?.sizes.find(({ label }) => label === form.get("size"));
    if (!product || !size) return redirect("invalid");

    const url = await reserveCheckout(
      product.slug,
      size.label,
      product.priceCents,
      () =>
        config.stripe.checkout.sessions.create({
          mode: "payment",
          allowed_payment_method_types: ["card"],
          adaptive_pricing: { enabled: false },
          expires_at: Math.floor(Date.now() / 1000) + 31 * 60,
          success_url: new URL("/store?checkout=returned", config.origin).href,
          cancel_url: new URL("/store?checkout=canceled", config.origin).href,
          metadata: { source: "tha-shop-merch" },
          automatic_tax: { enabled: config.automaticTax },
          custom_text: {
            submit: {
              message: `Pickup at Tha Shop, ${siteConfig.address.full}.`,
            },
          },
          line_items: [
            {
              quantity: 1,
              price_data: {
                currency: "usd",
                unit_amount: product.priceCents,
                product_data: { name: `${product.name} / ${size.label}` },
              },
            },
          ],
        }),
    );
    return url ? Response.redirect(url, 303) : redirect("sold-out");
  } catch {
    console.error("Merch checkout could not start.");
    return redirect("unavailable");
  }
}
