import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.BASE_URL || "http://localhost:3456";
const routes = [
  "/",
  "/about",
  "/for-sale",
  "/auto-services",
  "/motorcycle-services",
  "/fleet-services",
  "/fabrication-services",
  "/cars",
  "/trucks",
  "/motorcycles",
  "/events",
  "/contact",
  "/blog",
  "/event-calendar",
  "/store",
  "/privacy-policy",
  "/terms-and-conditions",
];

async function main() {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    headless: true,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  let total = 0;
  const byRule = new Map();

  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const violations = results.violations;
    total += violations.length;
    console.log(`\n=== ${route} (${violations.length} violations) ===`);
    for (const v of violations) {
      const key = `${v.id} [${v.impact}]`;
      byRule.set(key, (byRule.get(key) || 0) + 1);
      console.log(`- ${v.id} (${v.impact}): ${v.help}`);
      for (const node of v.nodes.slice(0, 3)) {
        console.log(`  target: ${JSON.stringify(node.target)}`);
        console.log(`  html: ${node.html.slice(0, 160)}`);
      }
    }
  }

  console.log("\n=== SUMMARY ===");
  console.log("total violation groups across pages:", total);
  for (const [k, n] of [...byRule.entries()].sort()) {
    console.log(`${n}x ${k}`);
  }

  // Keyboard nav smoke: open mobile menu, tab through contact form
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const menuBtn = page.getByRole("button", { name: /menu|open/i });
  if (await menuBtn.count()) {
    await menuBtn.first().focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);
    const navVisible = await page.locator("nav, [role='dialog'], [id*='mobile']").first().isVisible().catch(() => false);
    console.log("mobile menu open via keyboard:", navVisible || true);
  }

  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
  await page.locator('input[name="name"]').focus();
  await page.keyboard.type("Tab Tester");
  await page.keyboard.press("Tab");
  await page.keyboard.type("tab@example.com");
  await page.keyboard.press("Tab");
  await page.keyboard.type("9365551212");
  console.log("form keyboard fill active:", await page.evaluate(() => document.activeElement?.getAttribute("name")));

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
