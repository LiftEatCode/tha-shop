import Link from "next/link";
import { Phone } from "lucide-react";

import { ButtonLink } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function ServiceCta({
  title = "Ready to get on the schedule?",
  description = "Tell us about the vehicle and what you need. We will follow up to confirm availability.",
  className,
}: {
  title?: string;
  description?: string;
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
          Or call {siteConfig.phone.display}
        </a>
        <Link
          href="/contact"
          className="text-daylight/50 hover:text-daylight/80 focus-visible:outline-chrome text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Visit the contact page
        </Link>
      </div>
    </div>
  );
}

export function ContentGap({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="border-bay/25 bg-surface-muted border border-dashed px-6 py-10 text-center">
      <h2 className="font-display text-bay text-2xl">{title}</h2>
      <p className="text-steel mx-auto mt-3 max-w-xl text-sm leading-relaxed">
        {message}
      </p>
    </div>
  );
}
