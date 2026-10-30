import { requireEditor } from "@/lib/admin/session";
import { ChangePasswordForm } from "@/components/admin/change-password-form";

export default async function AccountPage() {
  const session = await requireEditor();
  return (
    <section className="max-w-lg">
      <h1 className="text-3xl font-bold">My account</h1>
      <p className="mt-3">Signed in as {session.user.email}</p>
      <div className="mt-8 rounded border border-gray-300 bg-white p-6">
        <h2 className="text-xl font-semibold">Change password</h2>
        <ChangePasswordForm />
      </div>
    </section>
  );
}
