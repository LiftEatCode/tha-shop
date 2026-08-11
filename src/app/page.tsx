import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { ButtonLink, Container, Section } from "@/components/ui/primitives";
import { ServiceCta } from "@/components/sections/service-cta";
import { siteConfig } from "@/config/site";
import { homeContent, subBrands } from "@/content/home";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | Auto & Motorcycle Repair in Magnolia, TX`,
  },
  description:
    "Auto repair, motorcycle service, fleet maintenance, restoration, and custom fabrication at Tha Shops — 24495 FM 1488, Magnolia, TX.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[min(88vh,52rem)] overflow-hidden bg-ink text-cream md:min-h-[88vh]">
        <Image
          src={homeContent.hero.image}
          alt={homeContent.hero.imageAlt}
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-scrim absolute inset-0" aria-hidden="true" />
        <Container className="relative flex min-h-[min(88vh,52rem)] flex-col justify-end pb-36 pt-28 md:min-h-[88vh] md:pb-24">
          <p className="animate-rise font-display text-sm uppercase tracking-[0.28em] text-ember-soft">
            Magnolia, Texas
          </p>
          <h1 className="animate-rise-delay mt-4 max-w-4xl font-display text-6xl leading-[0.92] tracking-wide sm:text-7xl md:text-8xl">
            {homeContent.hero.title}
          </h1>
          <p className="animate-rise-delay-2 mt-5 max-w-xl text-xl font-medium text-cream/95 md:text-2xl">
            {homeContent.hero.headline}
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-cream/75">
            {homeContent.hero.supporting}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.primaryCta.href} variant="primary">
              {siteConfig.primaryCta.name}
            </ButtonLink>
            <ButtonLink
              href={siteConfig.phone.href}
              variant="secondary"
              className="hidden sm:inline-flex"
            >
              Call {siteConfig.phone.display}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl tracking-wide text-ink md:text-5xl">
              {homeContent.intro.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-steel">
              {homeContent.intro.body}
            </p>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {homeContent.servicesPreview.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="group block border-t border-ink/15 pt-5 transition hover:border-ember"
                >
                  <h3 className="font-display text-2xl tracking-wide text-ink group-hover:text-ember">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">
                    {service.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl tracking-wide text-ink md:text-5xl">
              Sub-brands under one roof
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-steel">
              Three focused teams — custom builds, everyday repair, and metal fabrication —
              sharing the same Magnolia shop.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {subBrands.map((brand) => (
              <article key={brand.id} className="flex flex-col">
                <div className="relative mb-5 aspect-square overflow-hidden bg-ink">
                  <Image
                    src={brand.image}
                    alt={brand.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="font-display text-2xl tracking-wide text-ink">
                  {brand.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">{brand.body}</p>
                <Link
                  href={brand.href}
                  className="mt-4 text-sm font-semibold text-ember hover:text-ember-hot"
                >
                  Explore {brand.name}
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
              <Image
                src={homeContent.featuredEvent.image}
                alt={homeContent.featuredEvent.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-display text-sm uppercase tracking-[0.2em] text-ember">
                Upcoming
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-wide text-ink md:text-5xl">
                {homeContent.featuredEvent.title}
              </h2>
              <p className="mt-4 text-base font-semibold text-ink">
                {homeContent.featuredEvent.dates}
              </p>
              <p className="mt-1 text-sm text-steel">
                {homeContent.featuredEvent.location}
              </p>
              <p className="mt-4 text-base leading-relaxed text-steel">
                {homeContent.featuredEvent.description}
              </p>
              <ButtonLink
                href={homeContent.featuredEvent.href}
                variant="primary"
                className="mt-6"
              >
                View event calendar
              </ButtonLink>
            </div>
          </div>

          <div className="mt-16">
            <ServiceCta />
          </div>
        </Container>
      </Section>
    </>
  );
}
