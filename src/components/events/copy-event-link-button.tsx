"use client";

import { useState } from "react";

type CopyEventLinkButtonProps = {
  url: string;
};

export function CopyEventLinkButton({ url }: CopyEventLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className="border-bay/25 text-bay hover:border-engine hover:text-engine inline-flex min-h-11 items-center justify-center border px-5 py-3 font-mono text-xs font-bold tracking-[0.12em] uppercase transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bay"
      aria-live="polite"
    >
      {copied ? "Link Copied!" : "Copy Event Link"}
    </button>
  );
}
