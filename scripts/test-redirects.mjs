import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(
  path.join(root, "src/config/redirects.ts"),
  "utf8",
);

const expected = [
  ["/events-1", "/events"],
  ["/ols/all", "/"],
  ["/blog/f/upcoming-ride-into-the-lone-star-rally-2025", "/events"],
  [
    "/blog/f/born-free-texas-2025-the-ultimate-motorcycle-rally-in-the-heart",
    "/events",
  ],
  [
    "/blog/f/1962-dodge-d100-sweptline-a-classic-dodge-pickup-worth-restoring",
    "/blog/1962-dodge-d100-sweptline",
  ],
  [
    "/blog/f/how-to-inspect-a-classic-car-before-buying-one-a-complete-guide",
    "/blog/how-to-inspect-a-classic-car-before-buying",
  ],
  [
    "/blog/f/1945-harley-davidson-wl-the-flathead-that-shaped-harley-history",
    "/blog/1945-harley-davidson-wl",
  ],
  [
    "/blog/f/5-affordable-mods-to-improve-motorcycle-performance",
    "/blog/5-affordable-motorcycle-performance-mods",
  ],
];

for (const [from, to] of expected) {
  const escapedFrom = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedTo = to.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(
    source,
    new RegExp(
      `source:\\s*"${escapedFrom}"[\\s\\S]*?destination:\\s*"${escapedTo}"`,
    ),
    `${from} must permanently redirect to ${to}`,
  );
}

assert.match(source, /\/ols\/all/);
assert.doesNotMatch(
  source,
  /\/ols\/all[\s\S]{0,80}destination:\s*"\/store"/,
  "/ols/all must not redirect to /store",
);

const nextConfig = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");
assert.match(nextConfig, /permanentRedirects/);
assert.match(nextConfig, /permanent:\s*true/);

console.log(
  "REDIRECT_MAP:",
  expected.map(([from, to]) => `${from} → ${to}`).join("\n"),
);
console.log("REDIRECT_TEST_OK");
