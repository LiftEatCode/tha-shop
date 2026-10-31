import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAuth, isAdminConfigured } from "./auth";

export async function requireEditor() {
  if (!isAdminConfigured()) redirect("/admin/login");
  const session = await getAdminAuth().api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/admin/login");
  if (
    session.user.banned ||
    !["admin", "editor"].includes(session.user.role ?? "")
  ) {
    redirect("/admin/login?error=access");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireEditor();
  if (session.user.role !== "admin") redirect("/admin/blog");
  return session;
}
