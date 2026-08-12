"use client";

import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function GalleryGrid({
  images,
  priorityCount = 0,
  className,
}: {
  images: readonly { src: string; alt: string }[];
  priorityCount?: number;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4",
        className,
      )}
    >
      {images.map((image, index) => (
        <li key={image.src}>
          <Reveal delayMs={Math.min(index, 8) * 40}>
            <div className="group relative aspect-[4/3] overflow-hidden bg-bay/5 transition hover:ring-2 hover:ring-engine/40">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                loading={index < priorityCount ? "eager" : "lazy"}
                priority={index < priorityCount}
              />
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
