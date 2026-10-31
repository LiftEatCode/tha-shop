"use server";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireEditor } from "@/lib/admin/session";
import { postSchema, type CmsPost } from "@/lib/cms/model";
import { cmsDb } from "@/lib/cms/db";
import { savePost } from "@/lib/cms/store";
import { blogConfig } from "@/content/blog";
export async function createDraft(form: FormData) {
  const session = await requireEditor();
  const title = String(form.get("title") || "").trim();
  const slug = String(form.get("slug") || "");
  const today = new Date().toISOString().slice(0, 10);
  const result = postSchema.safeParse({
    title,
    slug,
    metaTitle: title,
    description: "Add a description",
    excerpt: "Add an excerpt",
    author: session.user.name || blogConfig.defaultAuthor,
    category: "Shop Notes",
    tags: [],
    publishedAt: today,
    featuredImage: "",
    featuredImageAlt: "",
    content: [],
    richContent: { type: "doc", content: [{ type: "paragraph" }] },
  });
  if (!result.success) redirect("/admin/blog/new?error=fields");
  const id = randomUUID();
  try {
    await cmsDb().query(
      "INSERT INTO cms_posts(id,slug,draft) VALUES($1,$2,$3::jsonb)",
      [id, slug, JSON.stringify(result.data)],
    );
  } catch (e) {
    if ((e as { code?: string }).code === "23505")
      redirect("/admin/blog/new?error=slug");
    throw e;
  }
  redirect(`/admin/blog/${id}`);
}
export async function updatePost(
  id: string,
  version: number,
  action: "save" | "publish" | "unpublish",
  input: unknown,
): Promise<{ error?: string; version?: number }> {
  const session = await requireEditor();
  if (
    !["save", "publish", "unpublish"].includes(action) ||
    !Number.isInteger(version)
  )
    return { error: "Invalid request" };
  if (!input || JSON.stringify(input).length > 500000)
    return { error: "Article is too large" };
  const parsed = postSchema.safeParse(input);
  if (!parsed.success)
    return {
      error: parsed.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; "),
    };
  try {
    const post = {
      ...parsed.data,
      updatedAt: new Date().toISOString().slice(0, 10),
    } as CmsPost;
    const row = await savePost(id, post, version, action, session.user.id);
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/admin/blog");
    return { version: row.version };
  } catch (e) {
    if ((e as Error).message.startsWith("This post changed"))
      return { error: (e as Error).message };
    return {
      error: "Could not save. Check the database connection and retry.",
    };
  }
}
