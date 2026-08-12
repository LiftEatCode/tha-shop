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
        "flex flex-col gap-6 border-l-4 border-engine bg-bay px-6 py-8 text-daylight sm:flex-row sm:items-center sm:justify-between sm:px-8",
        className,
      )}
    >
      <div className="max-w-xl">
        <h2 className="font-display text-3xl tracking-wide">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-daylight/70">{description}</p>
      </div>
      <div className="flex flex-col gap-3 sm:items-end">
        <ButtonLink href={siteConfig.primaryCta.href} variant="primary">
          {siteConfig.primaryCta.name}
        </ButtonLink>
        <a
          href={siteConfig.phone.href}
          className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-chrome transition hover:text-daylight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chrome"
        >
          <Phone className="size-4" aria-hidden="true" />
          Or call {siteConfig.phone.display}
        </a>
        <Link
          href="/contact"
          className="text-xs text-daylight/50 transition hover:text-daylight/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chrome"
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
    <div className="border border-dashed border-bay/25 bg-surface-muted px-6 py-10 text-center">
      <h2 className="font-display text-2xl text-bay">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-steel">
        {message}
      </p>
    </div>
  );
}
