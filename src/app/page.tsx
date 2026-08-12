import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { ButtonLink, Container, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ServiceCta } from "@/components/sections/service-cta";
import { siteConfig } from "@/config/site";
import { homeContent, homeGallery, subBrands } from "@/content/home";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | Auto & Motorcycle Repair in Magnolia, TX`,
  },
  description:
    "Auto repair, motorcycle service, fleet maintenance, restoration, and custom fabrication at Tha Shops — 24495 FM 1488, Magnolia, TX.",
  alternates: { canonical: "/" },
};

const bayStripe = {
  engine: "bay-stripe-engine",
  lift: "bay-stripe-lift",
  torch: "bay-stripe-torch",
} as const;

const bayAccentText = {
  engine: "text-engine hover:text-engine-hot",
  lift: "text-lift hover:text-lift/80",
  torch: "text-torch hover:text-torch/80",
} as const;

const bayLayouts = [
  "lg:flex-row",
  "lg:flex-row-reverse",
  "lg:flex-row",
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[min(92vh,56rem)] overflow-hidden bg-bay text-daylight md:min-h-[92vh]">
        <Image
          src={homeContent.hero.image}
          alt={homeContent.hero.imageAlt}
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="hero-scrim absolute inset-0" aria-hidden="true" />
        <Container className="relative flex min-h-[min(92vh,56rem)] flex-col justify-end pb-36 pt-28 md:min-h-[92vh] md:pb-28">
          <div className="animate-rise relative mb-6 h-16 w-40 sm:h-20 sm:w-52">
            <Image
              src="/images/shop/logo-wordmark.png"
              alt=""
              fill
              sizes="208px"
              className="object-contain object-left"
              aria-hidden="true"
            />
          </div>
          <p className="animate-rise-delay font-mono text-xs uppercase tracking-[0.28em] text-chrome">
            Magnolia, Texas · FM 1488
          </p>
          <h1 className="sr-only">{homeContent.hero.title}</h1>
          <p className="animate-rise-delay-2 mt-4 max-w-xl font-display text-4xl leading-[0.95] tracking-wide text-daylight sm:text-5xl md:text-6xl">
            {homeContent.hero.headline}
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-daylight/75">
            {homeContent.hero.supporting}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.primaryCta.href} variant="primary">
              {siteConfig.primaryCta.name}
            </ButtonLink>
            <ButtonLink
              href={siteConfig.phone.href}
              variant="secondary"
              className="hidden border-daylight/30 bg-bay/40 text-daylight backdrop-blur-sm hover:border-daylight/50 hover:bg-bay/60 sm:inline-flex"
            >
              Call {siteConfig.phone.display}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl tracking-wide text-bay md:text-5xl">
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
                  className="group block border-t border-bay/15 pt-5 transition hover:border-engine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine"
                >
                  <h3 className="font-display text-2xl tracking-wide text-bay transition group-hover:text-engine">
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

      <Section tone="dark" className="overflow-hidden">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-chrome">
              Under one roof
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-wide text-daylight md:text-5xl">
              Three bays. One shop.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-daylight/70">
              Custom builds, everyday repair, and metal fabrication — related divisions,
              not copy-paste blocks.
            </p>
          </div>

          <div className="mt-14 space-y-10 lg:space-y-14">
            {subBrands.map((brand, index) => (
              <Reveal key={brand.id} delayMs={index * 80}>
                <article
                  className={cn(
                    "flex flex-col gap-0 overflow-hidden bg-bay",
                    bayStripe[brand.accent],
                    bayLayouts[index],
                    "lg:items-stretch",
                  )}
                >
                  <div className="relative aspect-[16/11] w-full lg:aspect-auto lg:min-h-[22rem] lg:w-[48%]">
                    <Image
                      src={brand.workImage}
                      alt={brand.workImageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center bg-surface-muted/10 px-6 py-8 lg:px-10 lg:py-12">
                    <div className="relative mb-5 h-20 w-full max-w-[11rem]">
                      <Image
                        src={brand.image}
                        alt={brand.imageAlt}
                        fill
                        sizes="176px"
                        className="object-contain object-left"
                      />
                    </div>
                    <h3 className="font-display text-3xl tracking-wide text-daylight">
                      {brand.name}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-daylight/70">
                      {brand.body}
                    </p>
                    <Link
                      href={brand.href}
                      className={cn(
                        "mt-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chrome",
                        bayAccentText[brand.accent],
                      )}
                    >
                      Explore {brand.name}
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl tracking-wide text-bay md:text-5xl">
                {homeContent.workFloor.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-steel">
                {homeContent.workFloor.body}
              </p>
            </div>
            <ButtonLink href="/cars" variant="secondary" className="shrink-0 self-start md:self-auto">
              Browse The Garage
            </ButtonLink>
          </div>

          <div className="mt-12 flex flex-col gap-3 md:gap-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
              <Reveal className="group relative aspect-[16/10] overflow-hidden bg-bay/5 md:col-span-8 md:aspect-auto md:h-[28rem]">
                <Image
                  src={homeGallery.feature.src}
                  alt={homeGallery.feature.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </Reveal>
              <Reveal
                delayMs={80}
                className="group relative aspect-[3/4] overflow-hidden bg-bay/5 md:col-span-4 md:aspect-auto md:h-[28rem]"
              >
                <Image
                  src={homeGallery.side.src}
                  alt={homeGallery.side.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {homeGallery.tiles.map((image, index) => (
                <Reveal
                  key={image.src}
                  delayMs={120 + index * 50}
                  className="group relative aspect-[4/3] overflow-hidden bg-bay/5"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden bg-bay/5 sm:aspect-[5/4] lg:aspect-[4/5]">
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
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-engine">
                Upcoming
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-wide text-bay md:text-5xl">
                {homeContent.featuredEvent.title}
              </h2>
              <p className="mt-4 font-mono text-sm font-semibold text-bay">
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
