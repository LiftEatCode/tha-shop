import "server-only";

import { Pool } from "pg";
import { createAdminAuth, readAdminConfig } from "./auth-config";

let auth: ReturnType<typeof createAdminAuth> | undefined;

export function getAdminAuth() {
  if (!auth) {
    const config = readAdminConfig();
    auth = createAdminAuth(
      new Pool({ connectionString: config.connectionString, max: 5 }),
      config,
    );
  }
  return auth;
}

export function isAdminConfigured() {
  try {
    readAdminConfig();
    return true;
  } catch {
    return false;
  }
}
