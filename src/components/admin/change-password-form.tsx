"use client";

import { useState, type FormEvent } from "react";
import { adminAuthClient } from "@/lib/admin/auth-client";

export function ChangePasswordForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = event.currentTarget;
    const form = new FormData(element);
    if (form.get("newPassword") !== form.get("confirmPassword")) {
      setMessage("New passwords do not match.");
      return;
    }
    setPending(true);
    setMessage("");
    try {
      const result = await adminAuthClient.changePassword({
        currentPassword: String(form.get("currentPassword")),
        newPassword: String(form.get("newPassword")),
        revokeOtherSessions: true,
      });
      if (result.error)
        setMessage(
          "Unable to change your password. Check your current password and try again.",
        );
      else {
        element.reset();
        setMessage("Password changed. Other sessions have been signed out.");
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
        Current password
        <input
          type="password"
          name="currentPassword"
          autoComplete="current-password"
          required
        />
      </label>
      <label>
        New password
        <input
          type="password"
          name="newPassword"
          autoComplete="new-password"
          minLength={12}
          maxLength={128}
          required
        />
      </label>
      <label>
        Confirm new password
        <input
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          minLength={12}
          maxLength={128}
          required
        />
      </label>
      <button disabled={pending} type="submit">
        {pending ? "Updating…" : "Change password"}
      </button>
      <p role="status">{message}</p>
    </form>
  );
}
