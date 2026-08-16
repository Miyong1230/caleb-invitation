// Batched inspection round: envelope, opened invitation (desktop + mobile), admin.
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = process.env.SHOT_DIR || "shots";
mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:3000";

const browser = await chromium.launch();

async function run(name, width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/${name}-1-envelope.png` });

  await page.click('button[aria-label*="Break the seal"]', { force: true });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `${OUT}/${name}-2-hero.png` });

  // scroll through so whileInView reveals fire, then capture sections
  const sections = await page.$$eval("section", (els) =>
    els.map((el) => el.getAttribute("aria-label"))
  );
  console.log("sections:", sections);
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await delay(220);
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);

  let i = 3;
  for (const label of [
    "Event details",
    "Dress code",
    "Reminders",
    "Gift guide",
    "Save the date and RSVP",
  ]) {
    const el = page.locator(`section[aria-label="${label}"]`);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await el.screenshot({ path: `${OUT}/${name}-${i}-${label.replace(/\W+/g, "-").toLowerCase()}.png` });
    i++;
  }
  await page.close();
}

await run("desktop", 1440, 900);
await run("mobile", 390, 844);

// Admin
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/admin`, { waitUntil: "networkidle" });
await page.screenshot({ path: `${OUT}/admin-1-login.png` });
await page.fill('input[type="password"]', "levi-admin");
await page.click('button[type="submit"]');
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}/admin-2-editor.png` });
await page.click("text=RSVPs");
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/admin-3-rsvps.png` });
await page.close();

await browser.close();
console.log("done");
