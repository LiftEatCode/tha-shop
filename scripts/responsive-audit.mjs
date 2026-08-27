import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3456";
const widths = [375, 768, 1440];
const routes = [
  "/",
  "/about",
  "/for-sale",
  "/auto-services",
  "/contact",
  "/cars",
  "/event-calendar",
  "/store",
];

async function main() {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    headless: true,
  });

  const issues = [];

  for (const width of widths) {
    const page = await browser.newPage({
      viewport: { width, height: width === 375 ? 812 : 900 },
    });

    for (const route of routes) {
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
      const metrics = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        const overflowX =
          Math.max(doc.scrollWidth, body.scrollWidth) > doc.clientWidth + 1;
        const overlapping = [];
        const targets = [...document.querySelectorAll("a, button")].slice(
          0,
          80,
        );
        for (const el of targets) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.width < 24 || r.height < 24) {
            // allow text links in prose; flag interactive chrome
            if (el.closest("header, footer, form, [id*='mobile']")) {
              overlapping.push({
                tag: el.tagName,
                text: (el.textContent || "").trim().slice(0, 40),
                w: Math.round(r.width),
                h: Math.round(r.height),
              });
            }
          }
        }
        return {
          scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
          clientWidth: doc.clientWidth,
          overflowX,
          tinyTargets: overlapping.slice(0, 8),
        };
      });

      const menuVisible =
        width < 1024
          ? await page.getByRole("button", { name: /menu/i }).isVisible()
          : !(await page.getByRole("button", { name: /menu/i }).isVisible());

      if (metrics.overflowX) {
        issues.push({ width, route, type: "overflow-x", metrics });
      }
      if (metrics.tinyTargets.length) {
        issues.push({ width, route, type: "tiny-targets", metrics });
      }
      if (width < 1024 && route === "/" && !menuVisible) {
        issues.push({ width, route, type: "missing-hamburger" });
      }

      console.log(
        `${width} ${route}: overflow=${metrics.overflowX} scroll=${metrics.scrollWidth}/${metrics.clientWidth} tiny=${metrics.tinyTargets.length} menuOk=${menuVisible}`,
      );

      if (width === 375 && route === "/") {
        await page.screenshot({
          path: `scripts/responsive-375-home.png`,
          fullPage: false,
        });
      }
      if (width === 768 && route === "/") {
        await page.screenshot({ path: `scripts/responsive-768-home.png` });
      }
      if (width === 1440 && route === "/") {
        await page.screenshot({ path: `scripts/responsive-1440-home.png` });
      }
    }

    await page.close();
  }

  console.log("\nISSUES", JSON.stringify(issues, null, 2));
  await browser.close();
  if (
    issues.some(
      (i) => i.type === "overflow-x" || i.type === "missing-hamburger",
    )
  ) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
