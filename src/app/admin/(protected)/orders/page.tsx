import { requireAdmin } from "@/lib/admin/session";
import { cmsDb } from "@/lib/cms/db";
import { merchProducts } from "@/content/merch";

type PaidOrder = {
  session_id: string;
  product_slug: string;
  size: string;
  customer_name: string | null;
  customer_email: string | null;
  total_cents: number;
  paid_at: Date;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const date = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function OrdersPage() {
  await requireAdmin();
  const result = await cmsDb()
    .query<PaidOrder>(
      `SELECT session_id, product_slug, size, customer_name, customer_email, total_cents, paid_at
     FROM merch_orders WHERE status = 'paid' ORDER BY paid_at DESC`,
    )
    .catch(() => null);

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold">Paid merch orders</h1>
      {!result ? (
        <p>
          Orders are temporarily unavailable. Check the merch database setup.
        </p>
      ) : !result.rows.length ? (
        <p>No paid orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                {[
                  "Paid (Central)",
                  "Product",
                  "Size",
                  "Customer",
                  "Total",
                  "Stripe session",
                ].map((label) => (
                  <th key={label} scope="col" className="p-3">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((order) => (
                <tr
                  key={order.session_id}
                  className="border-t border-gray-300 align-top"
                >
                  <td className="p-3">{date.format(order.paid_at)}</td>
                  <td className="p-3">
                    {merchProducts.find(
                      ({ slug }) => slug === order.product_slug,
                    )?.name ?? order.product_slug}
                  </td>
                  <td className="p-3">{order.size}</td>
                  <td className="p-3">
                    {order.customer_name}
                    {order.customer_email && (
                      <a
                        className="block underline"
                        href={`mailto:${order.customer_email}`}
                      >
                        {order.customer_email}
                      </a>
                    )}
                  </td>
                  <td className="p-3">
                    {currency.format(order.total_cents / 100)}
                  </td>
                  <td className="p-3 font-mono text-xs">{order.session_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
