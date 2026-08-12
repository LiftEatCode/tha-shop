import Link from "next/link";

import { ButtonLink, Container } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <section className="grain flex min-h-[70vh] items-center py-20">
      <Container className="max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-engine">
          404
        </p>
        <h1 className="mt-3 font-display text-5xl tracking-wide text-bay">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-steel">
          That page is not on this site. Head home, or call the shop if you need help finding a
          service.
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
            className="text-sm font-semibold text-engine transition hover:text-engine-hot focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine"
          >
            Request an Appointment
          </Link>
        </div>
      </Container>
    </section>
  );
}
