import { loadEnvConfig } from "@next/env";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";
import { getPublishedPosts } from "../src/content/blog";
import { toRich } from "../src/lib/cms/model";
async function main() {
  loadEnvConfig(process.cwd());
  const pool = new Pool({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
    connectionTimeoutMillis: 10000,
  });
  try {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
    const sql = await readFile("migrations/001-blog-cms.sql", "utf8");
    if (!process.argv.includes("--apply"))
      console.log(
        sql + "\nPreview only. Apply with npm run cms:migrate -- --apply",
      );
    else {
      const c = await pool.connect();
      try {
        await c.query("BEGIN");
        await c.query(sql);
        for (const p of getPublishedPosts()) {
          const body = JSON.stringify({ ...p, richContent: toRich(p) });
          await c.query(
            "INSERT INTO cms_posts(id,slug,draft,published) VALUES($1,$2,$3::jsonb,$3::jsonb) ON CONFLICT(slug) DO NOTHING",
            [randomUUID(), p.slug, body],
          );
        }
        await c.query("COMMIT");
        console.log(
          "CMS schema ready; existing posts imported without overwriting edits.",
        );
      } catch (e) {
        await c.query("ROLLBACK");
        throw e;
      } finally {
        c.release();
      }
    }
  } catch {
    console.error(
      "CMS migration failed. Check database configuration and auth tables.",
    );
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}
main().catch(() => {
  console.error("Operation failed; check configuration.");
  process.exitCode = 1;
});
