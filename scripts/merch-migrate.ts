import { loadEnvConfig } from "@next/env";
import { readFile } from "node:fs/promises";
import { Pool } from "pg";
import { merchProducts } from "../src/content/merch";

async function main() {
  loadEnvConfig(process.cwd());
  const sql = await readFile("migrations/003-merch.sql", "utf8");
  if (!process.argv.includes("--apply")) {
    console.log(
      sql + "\nPreview only. Apply with npm run merch:migrate -- --apply",
    );
    return;
  }
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Missing database URL");
  const pool = new Pool({ connectionString, connectionTimeoutMillis: 10000 });
  try {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(sql);
      for (const product of merchProducts) {
        for (const size of product.sizes) {
          await client.query(
            "INSERT INTO merch_inventory (product_slug, size, available) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
            [product.slug, size.label, size.initialQuantity],
          );
        }
      }
      await client.query("COMMIT");
      console.log("Merch tables ready. Existing stock counts were preserved.");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } finally {
    await pool.end();
  }
}

main().catch(() => {
  console.error(
    "Merch migration failed. Check database configuration and access.",
  );
  process.exitCode = 1;
});
