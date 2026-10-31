import { betterAuth, type BetterAuthOptions } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { admin } from "better-auth/plugins/admin";
import { z } from "zod";
import { adminRoles } from "./roles";

const createUserInput = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email(),
  password: z.string().min(12).max(128),
  role: z.enum(["admin", "editor"]).optional(),
});

export function createAdminAuth(
  database: BetterAuthOptions["database"],
  config: { secret: string; baseURL: string },
) {
  return betterAuth({
    appName: "Tha Shop Admin",
    database,
    secret: config.secret,
    baseURL: config.baseURL,
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        // set-role is required by Better Auth when assigning a new user's role,
        // but changes to existing accounts are outside this first milestone.
        if (ctx.path === "/admin/set-role") {
          throw new APIError("FORBIDDEN", {
            message: "Role changes are not enabled.",
          });
        }
        if (
          ctx.path === "/admin/create-user" &&
          !createUserInput.safeParse(ctx.body).success
        ) {
          throw new APIError("BAD_REQUEST", {
            message:
              "Use a name, valid email, supported role, and a password of 12–128 characters.",
          });
        }
      }),
    },
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 12,
      maxPasswordLength: 128,
      revokeSessionsOnPasswordReset: true,
    },
    session: { expiresIn: 60 * 60 * 12, cookieCache: { enabled: false } },
    rateLimit: { enabled: true, storage: "database", window: 60, max: 30 },
    plugins: [
      admin({
        defaultRole: "editor",
        adminRoles: ["admin"],
        roles: adminRoles,
      }),
    ],
  });
}

export function readAdminConfig() {
  const secret = process.env.BETTER_AUTH_SECRET;
  const baseURL = process.env.BETTER_AUTH_URL;
  const connectionString = process.env.DATABASE_URL;
  if (!secret || secret.length < 32 || !baseURL || !connectionString) {
    throw new Error(
      "Admin requires DATABASE_URL, BETTER_AUTH_URL, and BETTER_AUTH_SECRET (32+ characters).",
    );
  }
  const url = new URL(baseURL);
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error("Admin requires an HTTPS BETTER_AUTH_URL in production.");
  }
  return { secret, baseURL: url.origin, connectionString };
}
