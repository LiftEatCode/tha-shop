import Link from "next/link";

import { ButtonLink, Container } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <section className="grain flex min-h-[70vh] items-center py-20">
      <Container className="max-w-2xl text-center">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-ember">
          404
        </p>
        <h1 className="mt-3 font-display text-5xl tracking-wide text-ink">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-steel">
          That link does not match a page on the rebuilt Tha Shops site. Head home or call the
          shop if you need help finding a service.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/" variant="primary">
            Back to home
          </ButtonLink>
          <ButtonLink href={siteConfig.phone.href} variant="secondary">
            Call {siteConfig.phone.display}
          </ButtonLink>
          <Link href="/contact" className="text-sm font-semibold text-ember hover:text-ember-hot">
            Contact page
          </Link>
        </div>
      </Container>
    </section>
  );
}
