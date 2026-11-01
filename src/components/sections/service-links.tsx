import Link from "next/link";
import { serviceDetails } from "@/content/services";
export function ServiceLinks({ parent }: { parent?: string }) {
  const services = parent
    ? serviceDetails.filter((s) => s.parent === parent)
    : serviceDetails;
  return (
    <div>
      <h2 className="font-display text-bay text-3xl tracking-wide">
        Find the service you need
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.slug} className="border-bay/15 border-t pt-5">
            <h3 className="text-xl font-semibold">
              <Link
                className="text-engine underline decoration-1 underline-offset-4"
                href={`/services/${s.slug}`}
              >
                {s.name} in Magnolia
              </Link>
            </h3>
            <p className="text-steel mt-3 text-sm leading-relaxed">
              {s.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
