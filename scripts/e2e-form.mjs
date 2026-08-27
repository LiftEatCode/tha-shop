import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3000";

async function main() {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });

  // Invalid submit
  await page.locator('form button[type="submit"]').click();
  await page.waitForTimeout(800);
  const invalidStatus = await page
    .locator("#appointment-form-status")
    .textContent()
    .catch(() => null);
  const invalidErrors = await page
    .locator("form p.text-danger, form .text-danger")
    .allTextContents();
  console.log("INVALID_STATUS:", invalidStatus);
  console.log("INVALID_ERRORS:", invalidErrors);

  // Fill valid
  await page.fill('input[name="name"]', "Josh Tester");
  await page.fill('input[name="email"]', "josh@example.com");
  await page.fill('input[name="phone"]', "(936) 555-1212");
  await page.fill('input[name="vehicle"]', "1969 Mustang");
  await page.selectOption(
    'select[name="serviceNeeded"]',
    "Check Engine / Diagnostics",
  );
  await page.selectOption('select[name="preferredContact"]', "Phone");
  await page.fill(
    'textarea[name="message"]',
    "Need a diagnostic and oil change appointment next week.",
  );
  await page.locator('form button[type="submit"]').click();
  await page.waitForSelector("#appointment-form-status", { timeout: 10000 });
  const validStatus = await page
    .locator("#appointment-form-status")
    .textContent();
  const validClass = await page
    .locator("#appointment-form-status")
    .getAttribute("class");
  console.log("VALID_STATUS:", validStatus);
  console.log("VALID_CLASS:", validClass);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
