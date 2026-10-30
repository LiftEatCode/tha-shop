"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminAuthClient } from "@/lib/admin/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  return (
    <div>
      <button
        disabled={pending}
        onClick={async () => {
          setPending(true);
          setError("");
          try {
            const result = await adminAuthClient.signOut();
            if (result.error) setError("Sign out failed. Please retry.");
            else {
              router.replace("/admin/login");
              router.refresh();
            }
          } catch {
            setError("Sign out failed. Please retry.");
          } finally {
            setPending(false);
          }
        }}
      >
        {pending ? "Signing out…" : "Sign out"}
      </button>
      <p role="alert">{error}</p>
    </div>
  );
}
