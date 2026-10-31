import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";
import type { Pool } from "pg";
import { getPublishedPosts } from "../src/content/blog";
import { postSchema, toRich } from "../src/lib/cms/model";
import { publishedPosts, savePost } from "../src/lib/cms/store";
async function main() {
  const db = new PGlite();
  const query = async (sql: string, params?: unknown[]) => {
    const r = await db.query(sql, params);
    return { ...r, rowCount: r.affectedRows };
  };
  const pool = {
    query,
    connect: async () => ({ query, release() {} }),
  } as unknown as Pool;
  try {
    await db.exec(
      'CREATE TABLE "user" (id text primary key); INSERT INTO "user" VALUES (\'test-admin\');',
    );
    const sql = await readFile("migrations/001-blog-cms.sql", "utf8");
    await db.exec(sql);
    await db.exec(sql);
    for (const p of getPublishedPosts()) {
      const body = postSchema.parse({ ...p, richContent: toRich(p) });
      for (let i = 0; i < 2; i++)
        await query(
          "INSERT INTO cms_posts(id,slug,draft,published) VALUES($1,$2,$3::jsonb,$3::jsonb) ON CONFLICT(slug) DO NOTHING",
          [randomUUID(), p.slug, JSON.stringify(body)],
        );
    }
    assert.equal(
      (await publishedPosts(pool)).length,
      getPublishedPosts().length,
    );
    const first = getPublishedPosts()[0];
    const body = postSchema.parse({ ...first, richContent: toRich(first) });
    assert(
      !postSchema.safeParse({
        ...body,
        richContent: {
          type: "doc",
          content: [
            {
              type: "image",
              attrs: { src: "javascript:alert(1)", alt: "bad" },
            },
          ],
        },
      }).success,
    );
    assert(
      !postSchema.safeParse({
        ...body,
        richContent: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "bad",
                  marks: [
                    { type: "link", attrs: { href: "javascript:alert(1)" } },
                  ],
                },
              ],
            },
          ],
        },
      }).success,
    );
    const id = randomUUID();
    const draft = { ...body, slug: "cms-test", title: "Draft article" };
    await query(
      "INSERT INTO cms_posts(id,slug,draft) VALUES($1,$2,$3::jsonb)",
      [id, draft.slug, JSON.stringify(draft)],
    );
    assert(!(await publishedPosts(pool)).some((p) => p.slug === draft.slug));
    await savePost(id, draft, 1, "publish", "test-admin", pool);
    assert.equal(
      (await publishedPosts(pool)).find((p) => p.slug === draft.slug)?.title,
      "Draft article",
    );
    const edited = { ...draft, title: "Edited draft" };
    await savePost(id, edited, 2, "save", "test-admin", pool);
    assert.equal(
      (await publishedPosts(pool)).find((p) => p.slug === draft.slug)?.title,
      "Draft article",
    );
    await assert.rejects(
      savePost(id, draft, 2, "publish", "test-admin", pool),
      /changed in another window/,
    );
    await savePost(id, edited, 3, "publish", "test-admin", pool);
    assert.equal(
      (await publishedPosts(pool)).find((p) => p.slug === draft.slug)?.title,
      "Edited draft",
    );
    await savePost(id, edited, 4, "unpublish", "test-admin", pool);
    assert(!(await publishedPosts(pool)).some((p) => p.slug === draft.slug));
    // Unpublishing an imported post must not revive its source-file fallback.
    const imported = (
      await query("SELECT id FROM cms_posts WHERE slug=$1", [first.slug])
    ).rows[0] as { id: string };
    await savePost(imported.id, body, 1, "unpublish", "test-admin", pool);
    assert(!(await publishedPosts(pool)).some((p) => p.slug === first.slug));
    assert.equal(
      Number(
        (
          (await query("SELECT count(*) AS count FROM cms_revisions"))
            .rows[0] as { count: number }
        ).count,
      ),
      5,
    );
    console.log(
      "PASS: idempotent migration/import; draft isolation; publish; draft edits preserve live revision; stale-write rejection; republish; unpublish without source revival; revision history; unsafe content rejected.",
    );
  } finally {
    await db.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
