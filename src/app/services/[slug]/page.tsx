import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findService } from "@/content/services";
import { publishedPosts } from "@/lib/cms/store";
import {
  ButtonLink,
  Container,
  Section,
  PageHeader,
} from "@/components/ui/primitives";
import { ServiceCta } from "@/components/sections/service-cta";
import { ProjectCards } from "@/components/sections/project-cards";
import {
  getBreadcrumbSchema,
  getServiceSchema,
  serializeJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/config/site";
type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = findService((await params).slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: s.title,
      description: s.description,
      url: `/services/${s.slug}`,
      images: [{ url: s.image, alt: s.alt }],
    },
  };
}
export default async function ServicePage({ params }: Props) {
  const s = findService((await params).slug);
  if (!s) notFound();
  const articles = (await publishedPosts()).filter((p) =>
    s.articleSlugs.includes(p.slug),
  );
  const schema = [
    getServiceSchema({
      name: s.title,
      description: s.description,
      path: `/services/${s.slug}`,
      serviceType: s.name,
    }),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      {
        name:
          s.parent === "/auto-services"
            ? "Auto Services"
            : "Motorcycle Services",
        path: s.parent,
      },
      { name: s.name, path: `/services/${s.slug}` },
    ]),
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <Section className="grain pt-16 pb-10 md:pt-24">
        <Container>
          <Link href={s.parent} className="text-engine text-sm underline">
            ← All {s.parent === "/auto-services" ? "auto" : "motorcycle"}{" "}
            services
          </Link>
          <div className="mt-6">
            <PageHeader
              eyebrow="Tha Shop · Magnolia, Texas"
              title={s.title}
              description={s.intro}
            />
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.primaryCta.href}>{s.cta}</ButtonLink>
            <ButtonLink href={siteConfig.phone.href} variant="secondary">
              Call {siteConfig.phone.display}
            </ButtonLink>
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            {s.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-bay text-3xl">
                  {section.title}
                </h2>
                <p className="text-steel mt-4 leading-relaxed">
                  {section.body}
                </p>
                {section.items ? (
                  <ul className="text-steel mt-4 list-disc space-y-2 pl-5">
                    {section.items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
          <aside className="space-y-6">
            <div className="relative aspect-[4/3]">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="(max-width:1024px) 100vw,40vw"
                className="object-cover"
              />
            </div>
            <div className="border-bay/15 border p-6">
              <h2 className="font-display text-2xl">Plan your visit</h2>
              <p className="text-steel mt-3">{siteConfig.address.full}</p>
              <p className="text-steel mt-2">Monday–Friday, 8:00 AM–6:00 PM</p>
              <a
                className="text-engine mt-4 inline-block underline"
                href={siteConfig.directionsUrl}
              >
                Get directions
              </a>
              <p className="text-steel mt-4 text-sm">
                Appointment requests are followed up by the shop to confirm
                availability.
              </p>
            </div>
          </aside>
        </Container>
      </Section>
      <Section tone="muted">
        <Container className="max-w-4xl">
          <h2 className="font-display text-3xl">Questions before you book</h2>
          <div className="mt-6 space-y-3">
            {s.faq.map((f) => (
              <details key={f.q} className="border-bay/15 border-b py-4">
                <summary className="cursor-pointer font-semibold">
                  {f.q}
                </summary>
                <p className="text-steel mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
      {articles.length ? (
        <Section>
          <Container>
            <h2 className="font-display text-3xl">Read before your visit</h2>
            <ul className="mt-5 space-y-4">
              {articles.map((p) => (
                <li key={p.slug}>
                  <Link
                    className="text-engine font-semibold underline"
                    href={`/blog/${p.slug}`}
                  >
                    {p.title}
                  </Link>
                  <p className="text-steel mt-1 text-sm">{p.excerpt}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
      {s.projectSlugs.length ? (
        <Section>
          <Container>
            <h2 className="font-display mb-7 text-3xl">From the shop floor</h2>
            <ProjectCards slugs={s.projectSlugs} />
          </Container>
        </Section>
      ) : null}
      <Section>
        <Container>
          <ServiceCta
            title={s.cta}
            description="Share the vehicle details and what you are noticing. We will follow up to confirm availability."
          />
        </Container>
      </Section>
    </>
  );
}
