import "server-only";

import Stripe from "stripe";
import { cmsDb } from "@/lib/cms/db";

export function checkoutConfig() {
  const key = process.env.STRIPE_SECRET_KEY;
  const signingSecret = process.env.STRIPE_MERCH_WEBHOOK_SECRET;
  const storeUrl = process.env.MERCH_STORE_URL;
  const tax = process.env.MERCH_AUTOMATIC_TAX;
  if (
    !key ||
    (process.env.VERCEL_ENV === "preview" && !/^(sk|rk)_test_/.test(key)) ||
    !signingSecret ||
    !storeUrl ||
    !process.env.DATABASE_URL ||
    (tax !== "true" && tax !== "false")
  )
    return null;

  return {
    stripe: new Stripe(key, { timeout: 8000, maxNetworkRetries: 0 }),
    signingSecret,
    origin: new URL(storeUrl).origin,
    automaticTax: tax === "true",
  };
}

export async function availableSizes(productSlug: string) {
  const result = await cmsDb().query<{ size: string }>(
    "SELECT size FROM merch_inventory WHERE product_slug = $1 AND available > 0",
    [productSlug],
  );
  return new Set(result.rows.map(({ size }) => size));
}

export async function reserveCheckout(
  productSlug: string,
  size: string,
  priceCents: number,
  createSession: () => Promise<Stripe.Checkout.Session>,
) {
  const client = await cmsDb().connect();
  try {
    await client.query("BEGIN");
    const reservation = await client.query(
      "UPDATE merch_inventory SET available = available - 1 WHERE product_slug = $1 AND size = $2 AND available > 0",
      [productSlug, size],
    );
    if (!reservation.rowCount) {
      await client.query("ROLLBACK");
      return null;
    }
    const session = await createSession();
    if (!session.url) throw new Error("Stripe did not return a checkout URL");
    await client.query(
      "INSERT INTO merch_orders (session_id, product_slug, size, price_cents) VALUES ($1, $2, $3, $4)",
      [session.id, productSlug, size, priceCents],
    );
    await client.query("COMMIT");
    return session.url;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function recordPaidOrder(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return;
  const result = await cmsDb().query(
    `UPDATE merch_orders
     SET status = 'paid', customer_email = $2, customer_name = $3,
         total_cents = $4, paid_at = now()
     WHERE session_id = $1 AND status = 'pending'
       AND price_cents = $5 AND $6 = 'usd'`,
    [
      session.id,
      session.customer_details?.email,
      session.customer_details?.name,
      session.amount_total,
      session.amount_subtotal,
      session.currency,
    ],
  );
  if (result.rowCount) return;
  const existing = await cmsDb().query(
    "SELECT 1 FROM merch_orders WHERE session_id = $1 AND status = 'paid'",
    [session.id],
  );
  if (!existing.rowCount)
    throw new Error("Paid checkout did not match an order");
}

export async function releaseExpiredOrder(sessionId: string) {
  await cmsDb().query(
    `WITH released AS (
       UPDATE merch_orders SET status = 'expired'
       WHERE session_id = $1 AND status = 'pending'
       RETURNING product_slug, size
     )
     UPDATE merch_inventory AS stock SET available = stock.available + 1
     FROM released WHERE stock.product_slug = released.product_slug AND stock.size = released.size`,
    [sessionId],
  );
}
