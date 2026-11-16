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
  let step = "read-form";
  try {
    const form = await request.formData();
    const product = merchProducts.find(
      ({ slug }) => slug === form.get("product"),
    );
    const size = product?.sizes.find(({ label }) => label === form.get("size"));
    if (!product || !size) return redirect("invalid");

    step = "reserve-inventory";
    const url = await reserveCheckout(
      product.slug,
      size.label,
      product.priceCents,
      async () => {
        step = "create-stripe-session";
        const session = await config.stripe.checkout.sessions.create({
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
        });
        step = "save-pending-order";
        return session;
      },
    );
    return url ? Response.redirect(url, 303) : redirect("sold-out");
  } catch (error) {
    const details = error as {
      code?: unknown;
      type?: unknown;
      statusCode?: unknown;
      requestId?: unknown;
      param?: unknown;
      message?: unknown;
    } | null;
    const safeToken = (value: unknown) =>
      typeof value === "string" && /^[a-zA-Z0-9_]{1,64}$/.test(value)
        ? value
        : undefined;
    const stripeMessage =
      step === "create-stripe-session" &&
      details?.type === "StripeInvalidRequestError" &&
      typeof details.message === "string"
        ? details.message
            .replace(
              /\b(?:sk|rk|pk|whsec|cs|pi|cus|acct)_[a-z0-9_]+/gi,
              "[redacted]",
            )
            .replace(/https?:\/\/[^\s"'`]+/gi, "[url]")
            .replace(/[^\s"'<>]+@[^\s"'<>]+/g, "[email]")
            .replace(/[\r\n]/g, " ")
            .slice(0, 500)
        : undefined;
    console.error("Merch checkout could not start.", {
      step,
      code: safeToken(details?.code),
      type: safeToken(details?.type),
      status:
        typeof details?.statusCode === "number"
          ? details.statusCode
          : undefined,
      stripeParameter:
        typeof details?.param === "string" &&
        /^[a-zA-Z0-9_\[\].]{1,100}$/.test(details.param)
          ? details.param
          : undefined,
      stripeMessage,
      stripeRequestId: safeToken(details?.requestId),
    });
    return redirect("unavailable");
  }
}
