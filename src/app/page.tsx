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

      <Section tone="dark" className="overflow-hidden">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-chrome font-mono text-xs tracking-[0.22em] uppercase">
              Magnolia, TX · Auto & Motorcycle Service
            </p>
            <h2 className="font-display text-daylight mt-3 text-4xl tracking-wide md:text-5xl">
              Don&apos;t wait for a breakdown.
              <span className="text-engine mt-2 block">Get road ready at Tha Shop.</span>
            </h2>
            <p className="text-daylight/75 mt-5 text-base leading-relaxed md:text-lg">
              Your car, truck, or motorcycle deserves attention before problems turn into expensive repairs.
              From brake inspections to seasonal maintenance, we&apos;re here to keep you moving.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                eyebrow: "Stop with confidence",
                title: "Free Brake Inspection",
                description: "Hearing squeaks? Feeling vibrations? Get a full brake inspection at no charge. We’ll check your braking system and explain what we find.",
                image: "/images/shop/brakeInspection.png",
                alt: "Brake rotor and caliper being inspected with a flashlight",
                action: "Schedule inspection",
                service: "Free Brake Inspection",
              },
              {
                eyebrow: "Beat the cold",
                title: "Winterize Your Vehicle",
                description: "Texas weather can change fast. Let us check your battery, fluids, cooling system, and tires so you’re ready for colder mornings.",
                image: "/images/shop/winterizeVehicle.png",
                alt: "Vehicle battery testing and coolant checks for Texas cold-weather preparation",
                action: "Get winter ready",
                service: "Winter Vehicle Maintenance",
              },
              {
                eyebrow: "Two wheels. Open road.",
                title: "Get Your Bike Ride Ready",
                description: "Cooler Texas days make for great riding. From tires and brakes to fluids and maintenance, we’ll help get your motorcycle ready for the road.",
                image: "/images/shop/ridingSeason.png",
                alt: "Cruiser motorcycle receiving a tire-pressure check before a Texas ride",
                action: "Schedule bike service",
                service: "Motorcycle Service",
              },
            ].map((offer) => (
              <article key={offer.title} className="bg-bay flex h-full flex-col overflow-hidden border border-daylight/15">
                <div className="relative aspect-[4/3]">
                  <Image src={offer.image} alt={offer.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-engine font-mono text-xs tracking-[0.15em] uppercase">{offer.eyebrow}</p>
                  <h3 className="font-display text-daylight mt-3 text-2xl tracking-wide">{offer.title}</h3>
                  <p className="text-daylight/75 mt-3 flex-1 text-sm leading-relaxed">{offer.description}</p>
                  <Link
                    href={`/contact?service=${encodeURIComponent(offer.service)}#appointment`}
                    className="text-engine hover:text-engine-hot focus-visible:outline-engine mt-6 inline-flex w-fit font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {offer.action} <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 border-t border-daylight/15 pt-10 text-center">
            <h3 className="font-display text-daylight text-2xl tracking-wide md:text-3xl">
              Real work. Real people. No runaround.
            </h3>
            <p className="text-daylight/70 mx-auto mt-3 max-w-2xl text-sm leading-relaxed">
              Proudly serving Magnolia, Tomball, The Woodlands, and surrounding Texas communities.
              Not sure what your vehicle needs? Tell us what&apos;s going on and we&apos;ll help you figure out the next step.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact#appointment" variant="primary">Request Service</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="overflow-hidden">
        <Container>
          <div className="mb-10 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-red-600">We&apos;re growing the crew</p>
            <h2 className="font-display text-bay mt-3 text-4xl tracking-wide md:text-5xl">
              Old school skills. <span className="text-red-600">Still got it?</span>
            </h2>
            <p className="text-steel mt-4">Tha Shop is hiring a part-time mechanic in Magnolia, Texas.</p>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden bg-bay">
              <Image
                src="/images/shop/weHiring.jpg"
                alt="Tha Shop is hiring a part-time mechanic in Magnolia, Texas"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Part-time opportunity</p>
              <h3 className="font-display text-bay mt-3 text-3xl tracking-wide md:text-4xl">Not ready to hang up your wrenches?</h3>
              <p className="text-steel mt-5 leading-relaxed">
                Been turning wrenches for years? Retired but still love working on cars?
                We&apos;re looking for an experienced old-school mechanic who takes pride in doing the job right.
                If you&apos;re not quite ready to leave the industry, we&apos;d like to talk.
              </p>
              <ul className="text-bay mt-6 space-y-3 text-sm">
                {[
                  "Part-time position with a flexible schedule",
                  "Retired mechanics welcome",
                  "Automotive repair experience",
                  "Motorcycle experience is a plus",
                  "Competitive pay and a great team environment",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span aria-hidden="true" className="font-bold text-red-600">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="text-steel mt-6 text-sm leading-relaxed">
                Think you&apos;re a good fit? Call us or stop by. We&apos;d rather shake your hand and talk.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact#appointment" variant="primary">Interested in the Position? Contact Us</ButtonLink>
                <ButtonLink href={siteConfig.phone.href} variant="secondary">Call About the Job</ButtonLink>
                <ButtonLink href={siteConfig.directionsUrl} variant="secondary">Get Directions</ButtonLink>
              </div>
              <p className="text-steel mt-5 text-sm">Tha Shop · 24495 FM 1488 Rd · Magnolia, TX 77355 · {siteConfig.phone.display}</p>
            </div>
          </div>
          <div className="border-bay/15 mt-12 border-t pt-8 text-center">
            <h3 className="font-display text-bay text-2xl tracking-wide">Know someone who fits the bill?</h3>
            <p className="text-steel mx-auto mt-3 max-w-xl text-sm">
              A retired mechanic, an old riding buddy, or someone who&apos;s been working on cars their whole life?
              Send them our way and share this opportunity.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <div className="">
            <ServiceCta />
          </div>
        </Container>
      </Section>
    </>
  );
}
