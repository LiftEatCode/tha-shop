import Link from "next/link";
import { requireEditor } from "@/lib/admin/session";
import { SignOutButton } from "@/components/admin/sign-out-button";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireEditor();
  return (
    <>
      <header className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-gray-300 pb-6">
        <div>
          <p className="text-xs tracking-widest uppercase">Tha Shop Admin</p>
          <p className="mt-1 font-semibold">
            {session.user.name} ·{" "}
            {session.user.role === "admin" ? "Admin" : "Editor"}
          </p>
        </div>
        <nav
          aria-label="Administration"
          className="flex flex-wrap items-center gap-6"
        >
          <Link href="/admin/blog">Blog</Link>
          {session.user.role === "admin" && (
            <Link href="/admin/users">Users</Link>
          )}
          <Link href="/admin/account">My account</Link>
          <SignOutButton />
        </nav>
      </header>
      {children}
    </>
  );
}
