import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";

import { Container } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-daylight/10 bg-bay text-daylight">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl tracking-wide">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-daylight/70">
            {siteConfig.tagline}
          </p>
          <a
            href={siteConfig.phone.href}
            className="mt-5 inline-flex min-h-11 items-center gap-2 py-2 font-mono text-lg font-semibold text-chrome transition hover:text-daylight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chrome"
            aria-label={`Call Tha Shops at ${siteConfig.phone.display}`}
          >
            <Phone className="size-5" aria-hidden="true" />
            {siteConfig.phone.display}
          </a>
        </div>

        <div>
          <h2 className="font-display text-lg tracking-wide text-daylight">Visit</h2>
          <p className="mt-3 inline-flex items-start gap-2 text-sm text-daylight/75">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{siteConfig.address.full}</span>
          </p>
          <div className="mt-4 inline-flex items-start gap-2 text-sm text-daylight/75">
            <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <ul className="space-y-1 font-mono text-xs tracking-wide">
              {siteConfig.hours.map((row) => (
                <li key={row.days}>
                  <span className="text-daylight/90">{row.days}:</span> {row.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg tracking-wide text-daylight">Explore</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-daylight/75">
            {siteConfig.footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center py-2 transition hover:text-daylight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chrome"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a
              href={siteConfig.social.facebook}
              className="inline-flex min-h-11 items-center py-2 transition hover:text-chrome focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chrome"
            >
              Facebook
            </a>
            <a
              href={siteConfig.social.instagram}
              className="inline-flex min-h-11 items-center py-2 transition hover:text-chrome focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chrome"
            >
              Instagram
            </a>
            <a
              href={siteConfig.social.tiktok}
              className="inline-flex min-h-11 items-center py-2 transition hover:text-chrome focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chrome"
            >
              TikTok
            </a>
            <a
              href={siteConfig.social.yelp}
              className="inline-flex min-h-11 items-center py-2 transition hover:text-chrome focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chrome"
            >
              Yelp
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-daylight/10">
        <Container className="flex flex-col gap-2 py-5 font-mono text-xs text-daylight/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.address.full}</p>
        </Container>
      </div>
    </footer>
  );
}
