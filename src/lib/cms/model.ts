import { z } from "zod";
import { BLOG_CATEGORIES } from "../../content/blog/config";
import type { BlogPost } from "../../content/blog/types";
export type RichNode = {
  type: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  content?: RichNode[];
};
export function safeUrl(value: string) {
  return (
    /^(\/(?!\/)|https?:\/\/|mailto:|tel:)/i.test(value) &&
    !/[\s\\\u0000-\u001f]/.test(value)
  );
}
const url = z
  .string()
  .max(2048)
  .refine((v) => !v || safeUrl(v), "Use a local path or HTTP(S) URL");
export const postSchema = z
  .object({
    slug: z
      .string()
      .min(1)
      .max(160)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().trim().min(1).max(200),
    metaTitle: z.string().trim().min(1).max(200),
    description: z.string().trim().min(1).max(500),
    excerpt: z.string().trim().min(1).max(1000),
    author: z.string().trim().min(1).max(100),
    category: z.enum(BLOG_CATEGORIES),
    tags: z.array(z.string().trim().min(1).max(80)).max(30),
    publishedAt: z.iso.date(),
    updatedAt: z.iso.date().optional(),
    featuredImage: z
      .string()
      .max(2048)
      .refine(
        (v) => !v || (v.startsWith("/") && safeUrl(v)),
        "Upload an image or use a local image path",
      ),
    featuredImageAlt: z.string().max(300),
    relatedService: z
      .object({ href: url, label: z.string().max(100) })
      .optional(),
    cta: z
      .object({ title: z.string().max(200), description: z.string().max(1000) })
      .optional(),
    content: z
      .array(
        z.union([
          z.object({ type: z.literal("h2"), text: z.string() }),
          z.object({ type: z.literal("p"), text: z.string() }),
          z.object({
            type: z.literal("p"),
            parts: z.array(
              z.union([z.string(), z.object({ text: z.string(), href: url })]),
            ),
          }),
        ]),
      )
      .default([]),
    richContent: z
      .custom<RichNode>()
      .refine(validateRich, "Invalid article content"),
  })
  .refine((p) => !p.featuredImage || p.featuredImageAlt.trim().length > 0, {
    message: "Add alternative text for the featured image",
  });
function validateRich(value: unknown): boolean {
  let count = 0;
  function visit(n: unknown, depth: number): boolean {
    if (!n || typeof n !== "object" || depth > 20 || ++count > 10000)
      return false;
    const v = n as RichNode;
    if (
      ![
        "doc",
        "paragraph",
        "heading",
        "text",
        "bulletList",
        "orderedList",
        "listItem",
        "blockquote",
        "hardBreak",
        "horizontalRule",
        "image",
        "codeBlock",
      ].includes(v.type)
    )
      return false;
    if (
      v.text !== undefined &&
      (typeof v.text !== "string" || v.text.length > 100000)
    )
      return false;
    if (
      v.type === "image" &&
      (typeof v.attrs?.src !== "string" ||
        !(v.attrs.src.startsWith("/") && safeUrl(v.attrs.src)) ||
        typeof v.attrs.alt !== "string")
    )
      return false;
    if (v.type === "heading" && ![2, 3].includes(Number(v.attrs?.level)))
      return false;
    if (
      v.marks &&
      (!Array.isArray(v.marks) ||
        !v.marks.every(
          (m) =>
            m &&
            typeof m === "object" &&
            ["bold", "italic", "strike", "code", "underline", "link"].includes(
              m.type,
            ) &&
            (m.type !== "link" ||
              (typeof m.attrs?.href === "string" && safeUrl(m.attrs.href))),
        ))
    )
      return false;
    return (
      !v.content ||
      (Array.isArray(v.content) && v.content.every((c) => visit(c, depth + 1)))
    );
  }
  return (value as RichNode)?.type === "doc" && visit(value, 0);
}
export type CmsPost = BlogPost & { richContent: RichNode };
export function toRich(post: BlogPost): RichNode {
  return {
    type: "doc",
    content: post.content.map((b) => ({
      type: b.type === "h2" ? "heading" : "paragraph",
      ...(b.type === "h2" ? { attrs: { level: 2 } } : {}),
      content: ("parts" in b ? b.parts : [b.text]).map((p) =>
        typeof p === "string"
          ? { type: "text", text: p }
          : {
              type: "text",
              text: p.text,
              marks: [{ type: "link", attrs: { href: p.href } }],
            },
      ),
    })),
  };
}
