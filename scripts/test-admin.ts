import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { getMigrations } from "better-auth/db/migration";
import { createAdminAuth } from "../src/lib/admin/auth-config";

async function main() {
  const database = new DatabaseSync(":memory:");
  const origin = "http://localhost:3000";
  const auth = createAdminAuth(database, {
    baseURL: origin,
    secret: "test-secret-for-admin-integration-only-123456789",
  });
  try {
    const migration = await getMigrations(auth.options);
    await migration.runMigrations();
    const admin = await auth.api.createUser({
      body: {
        name: "Owner",
        email: "owner@example.test",
        password: "Initial-admin-password-123",
        role: "admin",
      },
    });

    async function request(
      path: string,
      body?: object,
      cookie?: string,
      requestOrigin = origin,
    ) {
      return auth.handler(
        new Request(`${origin}/api/auth${path}`, {
          method: body ? "POST" : "GET",
          headers: {
            "content-type": "application/json",
            origin: requestOrigin,
            "x-forwarded-for": "127.0.0.1",
            ...(cookie ? { cookie } : {}),
          },
          body: body ? JSON.stringify(body) : undefined,
        }),
      );
    }
    async function login(email: string, password: string) {
      const response = await request("/sign-in/email", { email, password });
      assert.equal(response.status, 200, await response.clone().text());
      const cookie = response.headers
        .getSetCookie()
        .map((value) => value.split(";")[0])
        .join("; ");
      assert.ok(cookie);
      return cookie;
    }

    const newUser = {
      name: "Editor",
      email: "editor@example.test",
      password: "Initial-editor-password-123",
      role: "editor",
    };
    assert.ok(
      (await request("/sign-up/email", newUser)).status >= 400,
      "public signup must be closed",
    );
    assert.equal(
      (await request("/admin/create-user", newUser)).status,
      401,
      "anonymous creation must fail",
    );
    assert.equal(
      (await request("/admin/list-users")).status,
      401,
      "anonymous listing must fail",
    );
    const ownerCookie = await login(
      "owner@example.test",
      "Initial-admin-password-123",
    );
    assert.equal(
      (
        await request(
          "/admin/create-user",
          { ...newUser, password: "short" },
          ownerCookie,
        )
      ).status,
      400,
      "password length must be enforced on the server",
    );
    assert.equal(
      (
        await request(
          "/admin/create-user",
          newUser,
          ownerCookie,
          "https://attacker.example",
        )
      ).status,
      403,
      "cross-origin writes must fail",
    );
    assert.equal(
      (await request("/admin/create-user", newUser, ownerCookie)).status,
      200,
    );
    assert.equal(
      (await request("/admin/create-user", newUser, ownerCookie)).status,
      400,
      "duplicate accounts must fail",
    );
    const editorCookie = await login(newUser.email, newUser.password);
    assert.equal(
      (await request("/admin/list-users", undefined, editorCookie)).status,
      403,
    );
    assert.equal(
      (
        await request(
          "/admin/create-user",
          { ...newUser, email: "elevated@example.test", role: "admin" },
          editorCookie,
        )
      ).status,
      403,
      "editor cannot create administrators",
    );
    assert.equal(
      (
        await request(
          "/admin/set-role",
          { userId: admin.user.id, role: "editor" },
          ownerCookie,
        )
      ).status,
      403,
      "role changes are not enabled in this milestone",
    );
    const users = await request("/admin/list-users", undefined, ownerCookie);
    assert.equal(users.status, 200);
    assert.equal((await users.json()).total, 2);
    assert.equal(
      (
        await request(
          "/change-password",
          {
            currentPassword: "wrong-password",
            newPassword: "New-editor-password-123",
          },
          editorCookie,
        )
      ).status,
      400,
    );
    assert.equal(
      (
        await request(
          "/change-password",
          {
            currentPassword: newUser.password,
            newPassword: "New-editor-password-123",
            revokeOtherSessions: true,
          },
          editorCookie,
        )
      ).status,
      200,
    );
    assert.equal(
      (
        await request("/sign-in/email", {
          email: newUser.email,
          password: newUser.password,
        })
      ).status,
      401,
    );
    assert.equal(
      (
        await request("/sign-in/email", {
          email: newUser.email,
          password: "New-editor-password-123",
        })
      ).status,
      429,
      "rapid login attempts must be throttled",
    );
    // Simulate the login rate-limit window ending without sleeping in the test.
    database.prepare('DELETE FROM "rateLimit"').run();
    const newCookie = await login(newUser.email, "New-editor-password-123");
    assert.equal((await request("/sign-out", {}, newCookie)).status, 200);
    const ended = await request("/get-session", undefined, newCookie);
    assert.equal(
      await ended.json(),
      null,
      "signed-out sessions must stop working",
    );
    const stored = database
      .prepare('SELECT password FROM account WHERE "userId" = ?')
      .get(admin.user.id) as { password: string };
    assert.ok(
      stored.password && !stored.password.includes("Initial-admin-password"),
    );
    console.log(
      "Admin integration checks passed: signup, roles, CSRF, user creation, passwords, and session revocation.",
    );
  } finally {
    database.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
