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
    "Auto repair, motorcycle service, fleet maintenance, restoration, and custom fabrication at Tha Shop — 24495 FM 1488, Magnolia, TX.",
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
      <section className="bg-bay text-daylight relative isolate min-h-[min(92vh,56rem)] overflow-hidden md:min-h-[92vh]">
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
        <Container className="relative flex min-h-[min(92vh,56rem)] flex-col justify-end pt-28 pb-36 md:min-h-[92vh] md:pb-28">
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
          <p className="animate-rise-delay text-chrome font-mono text-xs tracking-[0.28em] uppercase">
            Magnolia, Texas · FM 1488
          </p>
          <h1 className="sr-only">{homeContent.hero.title}</h1>
          <p className="animate-rise-delay-2 font-display text-daylight mt-4 max-w-xl text-4xl leading-[0.95] tracking-wide sm:text-5xl md:text-6xl">
            {homeContent.hero.headline}
          </p>
          <p className="text-daylight/75 mt-4 max-w-lg text-base leading-relaxed">
            {homeContent.hero.supporting}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.primaryCta.href} variant="primary">
              {siteConfig.primaryCta.name}
            </ButtonLink>
            <ButtonLink
              href={siteConfig.phone.href}
              variant="secondary"
              className="border-daylight/30 bg-bay/40 text-daylight hover:border-daylight/50 hover:bg-bay/60 hidden backdrop-blur-sm sm:inline-flex"
            >
              Call {siteConfig.phone.display}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display text-bay text-4xl tracking-wide md:text-5xl">
              {homeContent.intro.title}
            </h2>
            <p className="text-steel mt-4 text-lg leading-relaxed">
              {homeContent.intro.body}
            </p>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {homeContent.servicesPreview.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="group border-bay/15 hover:border-engine focus-visible:outline-engine block border-t pt-5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <h3 className="font-display text-bay group-hover:text-engine text-2xl tracking-wide transition">
                    {service.title}
                  </h3>
                  <p className="text-steel mt-2 text-sm leading-relaxed">
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
            <p className="text-chrome font-mono text-xs tracking-[0.22em] uppercase">
              Under one roof
            </p>
            <h2 className="font-display text-daylight mt-3 text-4xl tracking-wide md:text-5xl">
              Three bays. One shop.
            </h2>
            <p className="text-daylight/70 mt-4 text-lg leading-relaxed">
              Custom builds, everyday repair, and metal fabrication — related
              divisions, not copy-paste blocks.
            </p>
          </div>

          <div className="mt-14 space-y-10 lg:space-y-14">
            {subBrands.map((brand, index) => (
              <Reveal key={brand.id} delayMs={index * 80}>
                <article
                  className={cn(
                    "bg-bay flex flex-col gap-0 overflow-hidden",
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
                  <div className="bg-surface-muted/10 flex flex-1 flex-col justify-center px-6 py-8 lg:px-10 lg:py-12">
                    <div className="relative mb-5 h-20 w-full max-w-[11rem]">
                      <Image
                        src={brand.image}
                        alt={brand.imageAlt}
                        fill
                        sizes="176px"
                        className="object-contain object-left"
                      />
                    </div>
                    <h3 className="font-display text-daylight text-3xl tracking-wide">
                      {brand.name}
                    </h3>
                    <p className="text-daylight/70 mt-3 max-w-md text-sm leading-relaxed">
                      {brand.body}
                    </p>
                    <Link
                      href={brand.href}
                      className={cn(
                        "focus-visible:outline-chrome mt-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
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
              <h2 className="font-display text-bay text-4xl tracking-wide md:text-5xl">
                {homeContent.workFloor.title}
              </h2>
              <p className="text-steel mt-4 text-lg leading-relaxed">
                {homeContent.workFloor.body}
              </p>
            </div>
            <ButtonLink
              href="/cars"
              variant="secondary"
              className="shrink-0 self-start md:self-auto"
            >
              Browse The Garage
            </ButtonLink>
          </div>

          <div className="mt-12 flex flex-col gap-3 md:gap-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
              <Reveal className="group bg-bay/5 relative aspect-[16/10] overflow-hidden md:col-span-8 md:aspect-auto md:h-[28rem]">
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
                className="group bg-bay/5 relative aspect-[3/4] overflow-hidden md:col-span-4 md:aspect-auto md:h-[28rem]"
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
                  className="group bg-bay/5 relative aspect-[4/3] overflow-hidden"
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
            <div className="bg-bay/5 relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
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
              <p className="text-engine font-mono text-xs tracking-[0.22em] uppercase">
                Upcoming
              </p>
              <h2 className="font-display text-bay mt-3 text-4xl tracking-wide md:text-5xl">
                {homeContent.featuredEvent.title}
              </h2>
              <p className="text-bay mt-4 font-mono text-sm font-semibold">
                {homeContent.featuredEvent.dates}
              </p>
              <p className="text-steel mt-1 text-sm">
                {homeContent.featuredEvent.location}
              </p>
              <p className="text-steel mt-4 text-base leading-relaxed">
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
