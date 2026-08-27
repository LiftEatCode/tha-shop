import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";

import { Container } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-daylight/10 bg-bay text-daylight border-t">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl tracking-wide">
            {siteConfig.name}
          </p>
          <p className="text-daylight/70 mt-3 max-w-sm text-sm leading-relaxed">
            {siteConfig.tagline}
          </p>
          <a
            href={siteConfig.phone.href}
            className="text-chrome hover:text-daylight focus-visible:outline-chrome mt-5 inline-flex min-h-11 items-center gap-2 py-2 font-mono text-lg font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={`Call ${siteConfig.name} at ${siteConfig.phone.display}`}
          >
            <Phone className="size-5" aria-hidden="true" />
            {siteConfig.phone.display}
          </a>
        </div>

        <div>
          <h2 className="font-display text-daylight text-lg tracking-wide">
            Visit
          </h2>
          <p className="text-daylight/75 mt-3 inline-flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{siteConfig.address.full}</span>
          </p>
          <div className="text-daylight/75 mt-4 inline-flex items-start gap-2 text-sm">
            <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <ul className="space-y-1 font-mono text-xs tracking-wide">
              {siteConfig.hours.map((row) => (
                <li key={row.days}>
                  <span className="text-daylight/90">{row.days}:</span>{" "}
                  {row.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="font-display text-daylight text-lg tracking-wide">
            Explore
          </h2>
          <ul className="text-daylight/75 mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {siteConfig.footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-daylight focus-visible:outline-chrome inline-flex min-h-11 items-center py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a
              href={siteConfig.social.facebook}
              className="hover:text-chrome focus-visible:outline-chrome inline-flex min-h-11 items-center py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Facebook
            </a>
            <a
              href={siteConfig.social.instagram}
              className="hover:text-chrome focus-visible:outline-chrome inline-flex min-h-11 items-center py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Instagram
            </a>
            <a
              href={siteConfig.social.tiktok}
              className="hover:text-chrome focus-visible:outline-chrome inline-flex min-h-11 items-center py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              TikTok
            </a>
            <a
              href={siteConfig.social.yelp}
              className="hover:text-chrome focus-visible:outline-chrome inline-flex min-h-11 items-center py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Yelp
            </a>
          </div>
        </div>
      </Container>

      <div className="border-daylight/10 border-t">
        <Container className="text-daylight/50 flex flex-col gap-2 py-5 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.address.full}</p>
        </Container>
      </div>
    </footer>
  );
}
