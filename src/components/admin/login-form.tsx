"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { adminAuthClient } from "@/lib/admin/auth-client";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError("");
    try {
      const result = await adminAuthClient.signIn.email({
        email: String(form.get("email")),
        password: String(form.get("password")),
        rememberMe: false,
      });
      if (result.error)
        setError(
          "Unable to sign in. Check your email and password, or try again later.",
        );
      else {
        router.replace("/admin/blog");
        router.refresh();
      }
    } catch {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <label>
        Email
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      <p role="alert" className="text-red-800">
        {error}
      </p>
      <button disabled={pending} type="submit">
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-sm text-gray-600">
        Need an account? Ask a Tha Shop administrator.
      </p>
    </form>
  );
}
