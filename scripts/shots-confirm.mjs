// Confirmation round: hero after fix + admin flow.
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "shots3";
mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:3000";
const browser = await chromium.launch();

for (const [name, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.click('button[aria-label*="Break the seal"]', { force: true });
  await page.waitForTimeout(3800);
  await page.screenshot({ path: `${OUT}/${name}-hero.png` });
  await page.close();
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/admin`, { waitUntil: "networkidle" });
await page.waitForSelector('input[type="password"]', { timeout: 15000 });
await page.fill('input[type="password"]', "levi-admin");
await page.click('button[type="submit"]');
await page.waitForSelector("text=Main card", { timeout: 15000 });
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/admin-editor.png` });
await page.click('nav >> text=RSVPs');
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/admin-rsvps.png` });
await page.close();
await browser.close();
console.log("done");
