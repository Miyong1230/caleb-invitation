// One-time seed: pushes your local data/content.json into Supabase so the
// deployed site shows exactly what you built locally.
// Usage: node scripts/seed-supabase.mjs   (reads .env.local or environment)

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";

// Minimal .env.local loader (no dependency needed)
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(
    "Missing env vars. Put NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first (see .env.example)."
  );
  process.exit(1);
}

const content = JSON.parse(readFileSync("data/content.json", "utf8"));
const sb = createClient(url, key);

const { error } = await sb.from("site_content").upsert({ id: 1, data: content });
if (error) {
  console.error("Seed failed:", error.message);
  console.error("Did you run supabase.sql in the Supabase SQL editor first?");
  process.exit(1);
}
console.log("✓ Content seeded to Supabase — the deployed site now matches your local edits.");
