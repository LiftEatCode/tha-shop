import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { ServiceCta } from "@/components/sections/service-cta";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { services } from "@/content/pages";
import {
  getBreadcrumbSchema,
  getServiceSchema,
  serializeJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: services.crazyEight.metaTitle,
  description: services.crazyEight.metaDescription,
  alternates: { canonical: "/crazy-eight-customs" },
};

const showcaseImages = [
  {
    src: "/images/gallery/cars/home-1.jpg",
    alt: "Harley on a lift in the Crazy Eight Customs bay",
  },
  {
    src: "/images/gallery/motorcycles/1.jpg",
    alt: "Custom motorcycle at Tha Shop",
  },
  {
    src: "/images/gallery/motorcycles/2.jpg",
    alt: "Motorcycle service project",
  },
  {
    src: "/images/gallery/cars/home-2.jpg",
    alt: "Shop floor project at Tha Shop",
  },
  { src: "/images/gallery/motorcycles/3.jpg", alt: "Bike build in the shop" },
  {
    src: "/images/gallery/motorcycles/4.jpg",
    alt: "Finished motorcycle custom work",
  },
  {
    src: "/images/gallery/cars/home-3.jpg",
    alt: "Custom car detail at Tha Shop",
  },
  {
    src: "/images/gallery/motorcycles/5.jpg",
    alt: "Cruiser project at Tha Shop",
  },
] as const;

export default function CrazyEightCustomsPage() {
  const content = services.crazyEight;
  const schema = [
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Crazy Eight Customs", path: "/crazy-eight-customs" },
    ]),
    getServiceSchema({
      name: content.title,
      description: content.metaDescription,
      path: "/crazy-eight-customs",
      serviceType: "AutomotiveCustomization",
    }),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <Section className="grain pt-16 pb-10 md:pt-24">
        <Container>
          <PageHeader
            eyebrow="Crazy Eight Customs"
            title={content.h1}
            description={content.intro}
          />
        </Container>
      </Section>
      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-bay bay-stripe-engine relative aspect-square overflow-hidden">
            <Image
              src="/images/brands/crazy-eight.jpg"
              alt="Crazy Eight Customs logo"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain p-6"
              priority
            />
          </div>
          <div className="text-steel space-y-5 text-base leading-relaxed">
            {content.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <ul className="space-y-2 pt-2 text-sm">
              {content.focus.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="bg-engine mt-2 size-1.5 shrink-0 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm">
              Looking for metalwork and signage instead?{" "}
              <Link
                href="/fabrication-services"
                className="text-torch hover:text-torch/80 focus-visible:outline-torch font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                See Hotrod Fabrication
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>
      <Section tone="muted">
        <Container>
          <div className="mb-10 max-w-2xl">
            <h2 className="font-display text-bay text-3xl tracking-wide md:text-4xl">
              Work from the bay
            </h2>
            <p className="text-steel mt-3 text-base leading-relaxed">
              Real builds and bikes from the Crazy Eight side of the shop.{" "}
              <Link
                href="/motorcycles"
                className="text-engine hover:text-engine-hot focus-visible:outline-engine font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Browse the motorcycle gallery
              </Link>
              .
            </p>
          </div>
          <GalleryGrid images={showcaseImages} priorityCount={2} />
          <div className="mt-16">
            <ServiceCta
              title="Request an Appointment"
              description="Tell us about the bike or build you have in mind. We will follow up to confirm scope and timing."
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
