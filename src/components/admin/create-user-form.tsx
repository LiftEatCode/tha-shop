"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { adminAuthClient } from "@/lib/admin/auth-client";

export function CreateUserForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = event.currentTarget;
    const form = new FormData(element);
    const role = form.get("role") === "admin" ? "admin" : "editor";
    setPending(true);
    setMessage("");
    try {
      const result = await adminAuthClient.admin.createUser({
        name: String(form.get("name")).trim(),
        email: String(form.get("email")).trim(),
        password: String(form.get("password")),
        role,
      });
      if (result.error)
        setMessage(result.error.message ?? "Unable to create this user.");
      else {
        element.reset();
        setMessage(
          "Account created. Share the initial password securely and ask the user to change it in My account.",
        );
        router.refresh();
      }
    } catch {
      setMessage("Unable to reach the server. Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <form onSubmit={submit} className="mt-6 space-y-5">
      <label>
        Name
        <input name="name" required maxLength={100} autoComplete="off" />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="off" />
      </label>
      <label>
        Initial password
        <input
          name="password"
          type="password"
          required
          minLength={12}
          maxLength={128}
          autoComplete="new-password"
        />
      </label>
      <label>
        Role
        <select name="role" defaultValue="editor">
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <p className="text-sm text-gray-600">
        Admins can add users. Editors can create, edit, and publish blog posts.
      </p>
      <button type="submit" disabled={pending}>
        {pending ? "Creating…" : "Create user"}
      </button>
      <p role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
