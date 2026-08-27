import Image from "next/image";
import Link from "next/link";

import { formatPostDate, getPostPath, type BlogPost } from "@/content/blog";

export function PostCard({
  post,
  headingLevel = "h2",
  priority = false,
}: {
  post: BlogPost;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
}) {
  const href = getPostPath(post.slug);
  const Heading = headingLevel;

  return (
    <li className="border-bay/15 flex flex-col border-t pt-6">
      <Link
        href={href}
        className="group focus-visible:outline-engine rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <div className="bg-bay/5 relative mb-5 aspect-[16/10] overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            priority={priority}
          />
        </div>
        <p className="text-engine font-mono text-xs font-semibold tracking-[0.16em] uppercase">
          {post.category}
        </p>
        <Heading className="font-display text-bay group-hover:text-engine mt-2 text-3xl tracking-wide transition">
          {post.title}
        </Heading>
      </Link>
      <p className="text-steel mt-2 font-mono text-xs tracking-wide">
        <time dateTime={post.publishedAt}>
          {formatPostDate(post.publishedAt)}
        </time>
      </p>
      <p className="text-steel mt-3 text-sm leading-relaxed">{post.excerpt}</p>
      <Link
        href={href}
        className="text-engine hover:text-engine-hot focus-visible:outline-engine mt-5 self-start text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Read article
      </Link>
    </li>
  );
}
