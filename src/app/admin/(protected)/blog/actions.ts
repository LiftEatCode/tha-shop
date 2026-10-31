"use server";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireEditor } from "@/lib/admin/session";
import { postSchema, type CmsPost } from "@/lib/cms/model";
import { cmsDb } from "@/lib/cms/db";
import { savePost } from "@/lib/cms/store";
import { blogConfig } from "@/content/blog";
export async function createDraft(
  _state: { error: string },
  form: FormData,
): Promise<{ error: string }> {
  const session = await requireEditor();
  const title = String(form.get("title") || "").trim();
  const slug = String(form.get("slug") || "").trim();
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
  if (!result.success)
    return {
      error:
        "Enter a title and a URL slug using lowercase letters, numbers, and hyphens.",
    };
  const id = randomUUID();
  try {
    await cmsDb().query(
      "INSERT INTO cms_posts(id,slug,draft) VALUES($1,$2,$3::jsonb)",
      [id, slug, JSON.stringify(result.data)],
    );
  } catch (e) {
    const code = (e as { code?: string }).code;
    if (code === "23505")
      return { error: "That URL is already in use. Choose a different slug." };
    if (code === "42P01")
      return {
        error:
          "Blog tables are missing. Run npm run cms:migrate -- --apply in the project terminal, then retry.",
      };
    console.error("Draft creation failed", { code: code || "unknown" });
    return {
      error:
        "Could not create the draft. Check your database connection and the project terminal, then retry.",
    };
  }
  redirect(`/admin/blog/${id}`);
}
export async function updatePost(
  id: string,
  version: number,
  action: "save" | "publish" | "unpublish",
  input: string,
): Promise<{ error?: string; version?: number }> {
  const session = await requireEditor();
  if (
    !["save", "publish", "unpublish"].includes(action) ||
    !Number.isInteger(version)
  )
    return { error: "Invalid request" };
  if (typeof input !== "string" || input.length > 500000)
    return { error: "Invalid article payload or article is too large" };
  let document: unknown;
  try {
    document = JSON.parse(input);
  } catch {
    return { error: "Invalid article JSON. Please retry saving." };
  }
  const parsed = postSchema.safeParse(document);
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
