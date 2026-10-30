import { loadEnvConfig } from "@next/env";
import { Pool } from "pg";
import { z } from "zod";
import { createAdminAuth, readAdminConfig } from "../src/lib/admin/auth-config";

async function main() {
  loadEnvConfig(process.cwd());
  const config = readAdminConfig();
  const input = z
    .object({
      email: z.email(),
      name: z.string().trim().min(1).max(100),
      password: z.string().min(12).max(128),
    })
    .parse({
      email: process.env.ADMIN_EMAIL,
      name: process.env.ADMIN_NAME,
      password: process.env.ADMIN_PASSWORD,
    });
  delete process.env.ADMIN_PASSWORD;
  const pool = new Pool({ connectionString: config.connectionString, max: 2 });
  const client = await pool.connect();
  try {
    // Serialize bootstrap commands. The auth library uses a second connection.
    await client.query("SELECT pg_advisory_lock(734871202)");
    const existing = await client.query(
      'SELECT id FROM "user" WHERE role = $1 LIMIT 1',
      ["admin"],
    );
    if (existing.rowCount)
      throw new Error(
        "An administrator already exists. Add users through /admin/users.",
      );
    const auth = createAdminAuth(pool, config);
    await auth.api.createUser({ body: { ...input, role: "admin" } });
    console.log("First administrator created. Sign in at /admin/login.");
  } finally {
    await client.query("SELECT pg_advisory_unlock(734871202)");
    client.release();
    await pool.end();
  }
}

main().catch(() => {
  console.error(
    "Bootstrap failed. Verify schema, configuration, and account fields. If an admin exists, use the Users screen. No credentials are logged.",
  );
  process.exitCode = 1;
});
