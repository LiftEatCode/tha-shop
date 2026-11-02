import Image from "next/image";
import Link from "next/link";
import { projectSpotlights } from "@/content/projects";
export function ProjectCards({ slugs }: { slugs?: string[] }) {
  const items = slugs
    ? projectSpotlights.filter((p) => slugs.includes(p.slug))
    : projectSpotlights;
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {items.map((p) => (
        <article key={p.slug}>
          <Link href={`/projects/${p.slug}`} className="group">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width:768px) 100vw,33vw"
                className="object-cover transition group-hover:scale-105"
              />
            </div>
            <h3 className="font-display text-bay group-hover:text-engine mt-4 text-2xl">
              {p.title}
            </h3>
          </Link>
          <p className="text-steel mt-3 text-sm leading-relaxed">
            {p.description}
          </p>
          <Link
            href={`/projects/${p.slug}`}
            className="text-engine mt-4 inline-block font-semibold underline"
          >
            Inside this project →
          </Link>
        </article>
      ))}
    </div>
  );
}
