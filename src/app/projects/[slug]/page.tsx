import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findProject, projectSpotlights } from "@/content/projects";
import {
  Container,
  PageHeader,
  Section,
  ButtonLink,
} from "@/components/ui/primitives";
import { ServiceCta } from "@/components/sections/service-cta";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projectSpotlights.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = findProject((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.description,
      images: [{ url: p.image, alt: p.alt }],
    },
  };
}
export default async function Project({ params }: Props) {
  const p = findProject((await params).slug);
  if (!p) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            getBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: p.title, path: `/projects/${p.slug}` },
            ]),
          ),
        }}
      />
      <Section className="grain">
        <Container>
          <Link href="/projects" className="text-engine underline">
            ← All project spotlights
          </Link>
          <div className="mt-6">
            <PageHeader
              eyebrow="From the Magnolia shop floor"
              title={p.title}
              description={p.description}
            />
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="max-w-4xl">
          <figure>
            <div className="relative aspect-[4/3]">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                priority
                sizes="(max-width:896px) 100vw,896px"
                className="object-contain"
              />
            </div>
            <figcaption className="text-steel mt-3 text-sm">{p.alt}</figcaption>
          </figure>
          <div className="mt-10 space-y-10">
            {p.sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-display text-3xl">{s.title}</h2>
                <p className="text-steel mt-4 leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={p.service}>{p.serviceLabel}</ButtonLink>
            <Link
              href={p.gallery}
              className="text-engine self-center underline"
            >
              Browse more photos →
            </Link>
          </div>
          <div className="mt-14">
            <ServiceCta
              title="Have a vehicle or project to discuss?"
              description="Tell us what you have, what it needs, and how you plan to use it. We will follow up to discuss availability."
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
