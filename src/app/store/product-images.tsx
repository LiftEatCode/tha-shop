"use client";

import Image from "next/image";
import { useState } from "react";

type ProductPhoto = {
  src: string;
  alt: string;
  side: "Front" | "Back";
};

export function ProductImages({
  src,
  alt,
  alternate,
}: {
  src: string;
  alt: string;
  alternate?: ProductPhoto;
}) {
  const [showAlternate, setShowAlternate] = useState(false);
  const primarySide = alternate?.side === "Front" ? "Back" : "Front";
  const photo = showAlternate && alternate ? alternate : { src, alt };

  return (
    <div>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={900}
        height={900}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-square w-full object-cover"
      />
      {alternate && (
        <div role="group" aria-label="Product photo view" className="flex justify-center gap-2 px-3 pt-3">
          {["Front", "Back"].map((side) => {
            const active = side === (showAlternate ? alternate.side : primarySide);
            return (
              <button
                key={side}
                type="button"
                aria-pressed={active}
                onClick={() => setShowAlternate(side === alternate.side)}
                className="rounded border border-current px-3 py-1 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 aria-pressed:bg-neutral-900 aria-pressed:text-white"
              >
                {side}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
