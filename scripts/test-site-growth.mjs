import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
const origin = "http://127.0.0.1:3112";
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3112",
  ],
  { stdio: ["ignore", "pipe", "pipe"] },
);
const services = [
  "brake-repair",
  "ac-repair",
  "check-engine-diagnostics",
  "suspension-repair",
  "motorcycle-maintenance",
];
const projects = [
  "hot-rod-engine-bay",
  "harley-in-the-bay",
  "classic-pickup-in-the-shop",
];
const articles = [
  "november-vehicle-maintenance-magnolia",
  "prepare-for-check-engine-diagnostics",
  "motorcycle-checks-after-sitting",
];
const paths = [
  "/",
  "/auto-services",
  "/motorcycle-services",
  "/projects",
  "/blog",
  "/event-calendar",
  ...services.map((s) => "/services/" + s),
  ...projects.map((s) => "/projects/" + s),
  ...articles.map((s) => "/blog/" + s),
  "/blog/burnout-bash-2026-final-call",
];
const pages = new Map();
try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(Error("Server startup timeout")),
      15000,
    );
    server.stdout.on("data", (chunk) => {
      if (chunk.toString().includes("Ready")) {
        clearTimeout(timeout);
        resolve();
      }
    });
    server.once("exit", (code) => {
      clearTimeout(timeout);
      reject(Error("Server exit " + code));
    });
  });
  for (const path of paths) {
    const r = await fetch(origin + path);
    assert.equal(r.status, 200, path);
    const html = await r.text();
    pages.set(path, html);
    assert.equal(
      (html.match(/<h1\b/g) || []).length,
      1,
      path + " must have one H1",
    );
    assert(html.includes('rel="canonical"'), path + " canonical missing");
    for (const m of html.matchAll(
      /<script type="application\/ld\+json">(.*?)<\/script>/gs,
    ))
      JSON.parse(m[1]);
  }
  for (const slug of services) {
    const html = pages.get("/services/" + slug);
    assert(html.includes("Magnolia"));
    assert(html.includes("/contact#appointment"));
    assert(html.includes("Questions before you book"));
  }
  const home = pages.get("/");
  assert.match(
    home,
    /<h1[^>]*>Auto &amp; Motorcycle Repair in Magnolia, TX<\/h1>/,
  );
  assert(!/<h1[^>]*class="[^"]*sr-only/.test(home));
  assert(home.includes("Hear from customers"));
  assert(!home.includes("AggregateRating"));
  assert(!home.includes("/blog/burnout-bash-2026-final-call"));
  const archived = pages.get("/blog/burnout-bash-2026-final-call");
  assert(archived.includes("This announcement is retained for reference"));
  assert(archived.includes("(Past event)"));
  assert(pages.get("/blog").includes("Past events"));
  const calendar = pages.get("/event-calendar");
  assert(calendar.includes("No upcoming event dates"));
  assert(!calendar.includes("Download the official vendor application"));
  const sitemap = await (await fetch(origin + "/sitemap.xml")).text();
  for (const p of paths.filter(
    (p) =>
      p.startsWith("/services/") ||
      p.startsWith("/projects/") ||
      articles.some((a) => p === "/blog/" + a),
  ))
    assert(
      sitemap.includes("https://thashops.com" + p),
      p + " missing from sitemap",
    );
  assert(!/<loc>https:\/\/thashops.com\/<\/loc>\s*<lastmod>/.test(sitemap));
  // Crawl rendered internal navigation and content links to catch orphaned or broken destinations.
  const links = new Set();
  for (const html of pages.values())
    for (const m of html.matchAll(/href="(\/(?!\/)[^"#?]*)(?:[^\"]*)"/g)) {
      if (!m[1].startsWith("/_next/") && !m[1].startsWith("/images/"))
        links.add(m[1]);
    }
  for (const path of links) {
    const response = await fetch(origin + path);
    assert(response.status < 400, path + " broken: " + response.status);
  }
  assert.equal((await fetch(origin + "/services/not-a-service")).status, 404);
  assert.equal((await fetch(origin + "/projects/not-a-project")).status, 404);
  console.log(
    `PASS: ${paths.length} rendered routes, single visible homepage H1, canonical/schema output, service CTAs, archive handling, sitemap inclusion, ${links.size} internal links and unknown-route 404s.`,
  );
} finally {
  server.kill();
  await Promise.race([
    once(server, "exit"),
    new Promise((r) => setTimeout(r, 2000)),
  ]);
}
