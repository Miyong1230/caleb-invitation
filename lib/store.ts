// Storage adapter: Supabase when configured, local files otherwise.
// Supabase setup (see README): table `site_content` (id int pk, data jsonb),
// table `rsvps` (id uuid pk default gen_random_uuid(), name text, attending text,
// guests int, message text, created_at timestamptz default now()),
// public storage bucket `invitation-photos`.

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import {
  SiteContent,
  RsvpEntry,
  DEFAULT_CONTENT,
  mergeContent,
} from "./content";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const RSVP_FILE = path.join(DATA_DIR, "rsvps.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!supabase) supabase = createClient(url, key);
  return supabase;
}

export function storageMode(): "supabase" | "local" {
  return getSupabase() ? "supabase" : "local";
}

// ---------- Content ----------

export async function getContent(): Promise<SiteContent> {
  const sb = getSupabase();
  if (sb) {
    const { data } = await sb
      .from("site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle();
    return mergeContent(data?.data);
  }
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    return mergeContent(JSON.parse(raw));
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb
      .from("site_content")
      .upsert({ id: 1, data: content });
    if (error) throw new Error(error.message);
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf8");
}

// ---------- RSVPs ----------

export async function addRsvp(
  entry: Omit<RsvpEntry, "id" | "createdAt">
): Promise<void> {
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from("rsvps").insert({
      name: entry.name,
      attending: entry.attending,
      guests: entry.guests,
      message: entry.message,
    });
    if (error) throw new Error(error.message);
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  let list: RsvpEntry[] = [];
  try {
    list = JSON.parse(await fs.readFile(RSVP_FILE, "utf8"));
  } catch {
    // first entry
  }
  list.push({
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  });
  await fs.writeFile(RSVP_FILE, JSON.stringify(list, null, 2), "utf8");
}

export async function deleteRsvp(id: string): Promise<void> {
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from("rsvps").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  let list: RsvpEntry[] = [];
  try {
    list = JSON.parse(await fs.readFile(RSVP_FILE, "utf8"));
  } catch {
    return;
  }
  await fs.writeFile(
    RSVP_FILE,
    JSON.stringify(list.filter((r) => r.id !== id), null, 2),
    "utf8"
  );
}

export async function getRsvps(): Promise<RsvpEntry[]> {
  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb
      .from("rsvps")
      .select("id, name, attending, guests, message, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => ({
      id: String(row.id),
      name: row.name,
      attending: row.attending,
      guests: row.guests,
      message: row.message ?? "",
      createdAt: row.created_at,
    }));
  }
  try {
    const list: RsvpEntry[] = JSON.parse(await fs.readFile(RSVP_FILE, "utf8"));
    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

// ---------- Photo upload ----------

export async function uploadPhoto(
  file: File
): Promise<{ url: string }> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(ext)
    ? ext
    : "jpg";
  const filename = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}.${safeExt}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.storage
      .from("invitation-photos")
      .upload(filename, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });
    if (error) throw new Error(error.message);
    const { data } = sb.storage
      .from("invitation-photos")
      .getPublicUrl(filename);
    return { url: data.publicUrl };
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return { url: `/uploads/${filename}` };
}
