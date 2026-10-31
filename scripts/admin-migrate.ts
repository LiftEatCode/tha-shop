import { loadEnvConfig } from "@next/env";
import { getMigrations } from "better-auth/db/migration";
import { Pool } from "pg";
import { createAdminAuth, readAdminConfig } from "../src/lib/admin/auth-config";

async function main() {
  loadEnvConfig(process.cwd());
  const config = readAdminConfig();
  const pool = new Pool({ connectionString: config.connectionString, max: 2 });
  try {
    const auth = createAdminAuth(pool, config);
    const migration = await getMigrations(auth.options);
    if (migration.schemaProblems.length || migration.unsafeChanges.length) {
      throw new Error(
        [...migration.schemaProblems, ...migration.unsafeChanges].join("\n"),
      );
    }
    if (process.argv.includes("--apply")) {
      await migration.runMigrations();
      console.log("Admin authentication schema is up to date.");
    } else {
      console.log(await migration.compileMigrations());
      console.log(
        "Review the SQL above. Run npm run admin:migrate -- --apply to apply it.",
      );
    }
  } finally {
    await pool.end();
  }
}

main().catch(() => {
  console.error(
    "Admin migration failed. Check configuration and database schema; no credentials are logged.",
  );
  process.exitCode = 1;
});
