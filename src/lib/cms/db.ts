import { Pool } from "pg";
let pool: Pool | undefined;
export function cmsDb() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  return (pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 10000,
  }));
}
