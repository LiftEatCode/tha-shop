import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3457";
const OUT = path.resolve("scripts/design-pass");
mkdirSync(OUT, { recursive: true });

const pages = [
  { route: "/", name: "home" },
  { route: "/auto-services", name: "services" },
  { route: "/cars", name: "garage" },
  { route: "/contact", name: "contact" },
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

async function runLighthouse(url, label) {
  const outJson = path.join(OUT, `lighthouse-${label}.json`);
  await new Promise((resolve, reject) => {
    const child = spawn(
      "npx",
      [
        "lighthouse",
        url,
        "--only-categories=performance,accessibility",
        "--output=json",
        `--output-path=${outJson}`,
        "--chrome-flags=--headless --no-sandbox --disable-gpu",
        "--quiet",
      ],
      { stdio: "inherit", shell: false },
    );
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`lh ${code}`)),
    );
  });

  const report = JSON.parse(
    await import("node:fs").then((fs) => fs.promises.readFile(outJson, "utf8")),
  );
  return {
    label,
    performance: Math.round((report.categories.performance?.score ?? 0) * 100),
    accessibility: Math.round(
      (report.categories.accessibility?.score ?? 0) * 100,
    ),
  };
}

async function main() {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    headless: true,
  });

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });
    for (const entry of pages) {
      await page.goto(`${BASE}${entry.route}`, { waitUntil: "networkidle" });
      const file = path.join(OUT, `${entry.name}-${vp.name}.png`);
      await page.screenshot({ path: file, fullPage: false });
      console.log("shot", file);
    }
    await page.close();
  }

  await browser.close();

  const scores = [];
  for (const entry of pages) {
    scores.push(await runLighthouse(`${BASE}${entry.route}`, entry.name));
  }

  writeFileSync(
    path.join(OUT, "lighthouse-summary.json"),
    JSON.stringify(scores, null, 2),
  );
  console.log("LIGHTHOUSE", JSON.stringify(scores, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
