import { loadEnvConfig } from "@next/env";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";
import { galleryPages } from "../src/content/pages";
import { galleryCategories } from "../src/lib/gallery/model";
async function main() {
  loadEnvConfig(process.cwd());
  const sql = await readFile("migrations/002-gallery.sql", "utf8");
  if (!process.argv.includes("--apply")) {
    console.log(
      sql + "\nPreview only. Apply with npm run gallery:migrate -- --apply",
    );
    return;
  }
  if (!process.env.DATABASE_URL) throw Error("Missing DATABASE_URL");
  const pool = new Pool({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
    connectionTimeoutMillis: 10000,
  });
  const c = await pool.connect();
  try {
    await c.query("BEGIN");
    await c.query(sql);
    for (const category of galleryCategories) {
      for (const [i, image] of galleryPages[category].images.entries()) {
        await c.query(
          "INSERT INTO gallery_images(id,source_key,category,src,alt,position,visible) VALUES($1,$2,$3,$4,$5,$6,true) ON CONFLICT(source_key) DO NOTHING",
          [
            randomUUID(),
            `${category}:${image.src}`,
            category,
            image.src,
            image.alt,
            i,
          ],
        );
      }
    }
    await c.query("COMMIT");
    console.log(
      "Gallery schema ready; existing photos imported without overwriting edits, hidden photos, or deletions.",
    );
  } catch (e) {
    await c.query("ROLLBACK");
    throw e;
  } finally {
    c.release();
    await pool.end();
  }
}
main().catch(() => {
  console.error("Gallery migration failed. Check database configuration.");
  process.exitCode = 1;
});
