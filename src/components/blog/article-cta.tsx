import Link from "next/link";
import { Phone } from "lucide-react";

import { ButtonLink } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function ArticleCta({
  title = "Ready to get on the schedule?",
  description = "Tell us the vehicle and what you need. We will follow up to confirm an appointment.",
  serviceHref,
  serviceLabel,
  className,
}: {
  title?: string;
  description?: string;
  serviceHref?: string;
  serviceLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-engine bg-bay text-daylight flex flex-col gap-6 border-l-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8",
        className,
      )}
    >
      <div className="max-w-xl">
        <h2 className="font-display text-3xl tracking-wide">{title}</h2>
        <p className="text-daylight/70 mt-2 text-sm leading-relaxed">
          {description}
        </p>
        {serviceHref && serviceLabel ? (
          <p className="mt-3 text-sm">
            <Link
              href={serviceHref}
              className="text-chrome hover:text-daylight focus-visible:outline-chrome font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              View {serviceLabel}
            </Link>
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 sm:items-end">
        <ButtonLink href={siteConfig.primaryCta.href} variant="primary">
          {siteConfig.primaryCta.name}
        </ButtonLink>
        <a
          href={siteConfig.phone.href}
          className="text-chrome hover:text-daylight focus-visible:outline-chrome inline-flex items-center gap-2 font-mono text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Phone className="size-4" aria-hidden="true" />
          Call {siteConfig.name} at {siteConfig.phone.display}
        </a>
      </div>
    </div>
  );
}
