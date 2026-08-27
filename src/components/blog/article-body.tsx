import Link from "next/link";

import type { BlogBlock } from "@/content/blog";

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-steel text-base leading-relaxed md:text-[1.05rem] md:leading-relaxed">
      {children}
    </p>
  );
}

export function ArticleBody({ content }: { content: readonly BlogBlock[] }) {
  return (
    <div className="space-y-5">
      {content.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={`${block.type}-${index}`}
              className="font-display text-bay mt-12 text-3xl tracking-wide first:mt-0"
            >
              {block.text}
            </h2>
          );
        }

        if ("parts" in block) {
          return (
            <Paragraph key={`${block.type}-${index}`}>
              {block.parts.map((part, partIndex) =>
                typeof part === "string" ? (
                  <span key={partIndex}>{part}</span>
                ) : (
                  <Link
                    key={partIndex}
                    href={part.href}
                    className="text-engine hover:text-engine-hot focus-visible:outline-engine font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {part.text}
                  </Link>
                ),
              )}
            </Paragraph>
          );
        }

        return (
          <Paragraph key={`${block.type}-${index}`}>{block.text}</Paragraph>
        );
      })}
    </div>
  );
}
