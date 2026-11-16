import {
  checkoutConfig,
  recordPaidOrder,
  releaseExpiredOrder,
} from "@/lib/merch/orders";

export async function POST(request: Request) {
  const config = checkoutConfig();
  if (!config) return new Response(null, { status: 503 });
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response(null, { status: 400 });

  let event;
  try {
    event = config.stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      config.signingSecret,
    );
  } catch {
    return new Response("Invalid Stripe signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        if (event.data.object.metadata?.source === "tha-shop-merch") {
          await recordPaidOrder(event.data.object);
        }
        break;
      case "checkout.session.expired":
      case "checkout.session.async_payment_failed":
        if (event.data.object.metadata?.source === "tha-shop-merch") {
          await releaseExpiredOrder(event.data.object.id);
        }
        break;
    }
    return new Response(null, { status: 204 });
  } catch {
    console.error("Merch webhook could not be processed", event.id);
    return new Response(null, { status: 500 });
  }
}
