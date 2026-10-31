import "server-only";
import { cmsDb } from "./db";
import type { Pool } from "pg";
import {
  getPublishedPosts as sourcePosts,
  type BlogPost,
} from "../../content/blog";
import type { CmsPost } from "./model";
export type PostRecord = {
  id: string;
  slug: string;
  draft: CmsPost;
  published: CmsPost | null;
  version: number;
  updated_at: Date;
};
export async function listPosts() {
  return (
    await cmsDb().query<PostRecord>(
      "SELECT * FROM cms_posts ORDER BY updated_at DESC",
    )
  ).rows;
}
export async function loadPost(id: string) {
  return (
    await cmsDb().query<PostRecord>("SELECT * FROM cms_posts WHERE id=$1", [id])
  ).rows[0];
}
export async function publishedPosts(database?: Pool): Promise<BlogPost[]> {
  if (!database && !process.env.DATABASE_URL) return sourcePosts();
  const rows = await (database ?? cmsDb())
    .query<{ published: CmsPost | null; slug: string }>(
      "SELECT slug,published FROM cms_posts",
    )
    .catch((e: unknown) => {
      if ((e as { code?: string }).code === "42P01") return { rows: [] };
      throw e;
    });
  // Source posts remain live until individually imported; null published rows are deliberate unpublishes.
  const managed = new Set(rows.rows.map((r) => r.slug));
  return [
    ...sourcePosts().filter((p) => !managed.has(p.slug)),
    ...rows.rows.flatMap((r) => (r.published ? [r.published] : [])),
  ].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export async function savePost(
  id: string,
  post: CmsPost,
  version: number,
  action: "save" | "publish" | "unpublish",
  userId: string,
  database: Pool = cmsDb(),
) {
  const client = await database.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query<PostRecord>(
      `UPDATE cms_posts SET draft=$2::jsonb,published=CASE WHEN $4='publish' THEN $2::jsonb WHEN $4='unpublish' THEN NULL ELSE published END,version=version+1,updated_at=now() WHERE id=$1 AND version=$3 AND slug=$5 RETURNING *`,
      [id, JSON.stringify(post), version, action, post.slug],
    );
    if (!result.rowCount)
      throw new Error(
        "This post changed in another window. Reload before saving. Published URLs cannot be changed.",
      );
    await client.query(
      "INSERT INTO cms_revisions(post_id,author_id,action,body) VALUES($1,$2,$3,$4::jsonb)",
      [id, userId, action, JSON.stringify(post)],
    );
    await client.query("COMMIT");
    return result.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
