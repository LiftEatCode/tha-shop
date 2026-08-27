import Link from "next/link";

import { ButtonLink, Container } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <section className="grain flex min-h-[70vh] items-center py-20">
      <Container className="max-w-2xl text-center">
        <p className="text-engine font-mono text-xs tracking-[0.22em] uppercase">
          404
        </p>
        <h1 className="font-display text-bay mt-3 text-5xl tracking-wide">
          Page not found
        </h1>
        <p className="text-steel mt-4 text-base leading-relaxed">
          That page is not on this site. Head home, or call the shop if you need
          help finding a service.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/" variant="primary">
            Back to home
          </ButtonLink>
          <ButtonLink href={siteConfig.phone.href} variant="secondary">
            Call {siteConfig.phone.display}
          </ButtonLink>
          <Link
            href="/contact"
            className="text-engine hover:text-engine-hot focus-visible:outline-engine text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Request an Appointment
          </Link>
        </div>
      </Container>
    </section>
  );
}
