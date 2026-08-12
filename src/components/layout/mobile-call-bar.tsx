import { Phone } from "lucide-react";

import { siteConfig } from "@/config/site";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bay/10 bg-daylight/95 p-3 backdrop-blur md:hidden">
      <a
        href={siteConfig.phone.href}
        className="flex w-full items-center justify-center gap-2 rounded-sm bg-bay px-4 py-3 text-sm font-semibold text-daylight transition hover:bg-steel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine"
        aria-label={`Call Tha Shops at ${siteConfig.phone.display}`}
      >
        <Phone className="size-4" aria-hidden="true" />
        Call {siteConfig.phone.display}
      </a>
    </div>
  );
}
