import { isAdminConfigured } from "@/lib/admin/auth";
import { LoginForm } from "@/components/admin/login-form";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-md rounded border border-gray-300 bg-white p-8">
      <p className="font-mono text-xs tracking-widest uppercase">
        Tha Shop • Staff access
      </p>
      <h1 className="mt-3 text-3xl font-bold">Welcome back</h1>
      {isAdminConfigured() ? (
        <LoginForm />
      ) : (
        <p className="mt-6" role="status">
          Staff login is not available yet. The administrator needs to finish
          setup.
        </p>
      )}
    </section>
  );
}
