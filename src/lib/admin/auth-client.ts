"use client";

import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { adminRoles } from "./roles";

export const adminAuthClient = createAuthClient({
  plugins: [adminClient({ roles: adminRoles })],
});
