import { Phone } from "lucide-react";

import { siteConfig } from "@/config/site";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 p-3 backdrop-blur md:hidden">
      <a
        href={siteConfig.phone.href}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-semibold text-cream"
        aria-label={`Call Tha Shops at ${siteConfig.phone.display}`}
      >
        <Phone className="size-4" aria-hidden="true" />
        Call {siteConfig.phone.display}
      </a>
    </div>
  );
}
