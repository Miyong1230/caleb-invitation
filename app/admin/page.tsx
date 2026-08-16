"use client";

// Admin: edit every text, photo, and link; review RSVPs.
// Operate surface — clarity first, the watercolor world stays in the details.

import { useCallback, useEffect, useState } from "react";
import { SiteContent, RsvpEntry, ReminderItem } from "@/lib/content";

/* ---------- tiny path helpers ---------- */

function getPath(obj: unknown, path: (string | number)[]): unknown {
  return path.reduce<unknown>(
    (acc, key) =>
      acc && typeof acc === "object"
        ? (acc as Record<string | number, unknown>)[key]
        : undefined,
    obj
  );
}

function setPath<T>(obj: T, path: (string | number)[], value: unknown): T {
  const clone = structuredClone(obj) as unknown as Record<string | number, unknown>;
  let node: Record<string | number, unknown> = clone;
  for (let i = 0; i < path.length - 1; i++) {
    node = node[path[i]] as Record<string | number, unknown>;
  }
  node[path[path.length - 1]] = value;
  return clone as unknown as T;
}

/* ---------- field primitives ---------- */

const inputCls =
  "w-full rounded-lg border border-[#c3d6ea] bg-white px-3 py-2 text-[15px] text-[#22406e] focus:border-[#33569c] focus:outline-none focus:ring-2 focus:ring-[#33569c]/20 transition-shadow";

function TextField({
  label,
  value,
  onChange,
  textarea = false,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-semibold text-[#33569c]">{label}</span>
      {textarea ? (
        <textarea
          className={`${inputCls} min-h-[76px]`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={inputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hint && <span className="mt-1 block text-xs text-[#7a90ad]">{hint}</span>}
    </label>
  );
}

/** Downscale/recompress big photos in the browser so uploads stay under
 * the hosting limit (~4.5 MB on Vercel). Keeps small files untouched. */
async function shrinkImage(file: File): Promise<File> {
  const skip =
    !file.type.startsWith("image/") ||
    file.type === "image/gif" ||
    file.type === "image/svg+xml";
  if (skip || file.size < 900_000) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const isPng = file.type === "image/png";
    let blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, isPng ? "image/png" : "image/jpeg", 0.85)
    );
    // A PNG photo can stay huge — fall back to JPEG if it's still oversized.
    if (blob && isPng && blob.size > 3_500_000) {
      blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.85)
      );
    }
    if (!blob || blob.size >= file.size) return file;
    const ext = blob.type === "image/png" ? ".png" : ".jpg";
    return new File([blob.slice()], file.name.replace(/\.\w+$/, "") + ext, {
      type: blob.type,
    });
  } catch {
    return file;
  }
}

function PhotoField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const upload = async (original: File) => {
    setUploading(true);
    setErr("");
    try {
      const file = await shrinkImage(original);
      if (file.size > 4_000_000) {
        throw new Error(
          "This image is still over 4 MB after compression — please resize it and try again."
        );
      }
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const text = await res.text();
      let body: { url?: string; error?: string };
      try {
        body = JSON.parse(text);
      } catch {
        throw new Error(
          res.status === 413
            ? "The server rejected the image as too large. Please use a smaller photo."
            : `Upload failed (${res.status}). Please try again.`
        );
      }
      if (!res.ok || !body.url) throw new Error(body.error || "Upload failed.");
      onChange(body.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#dbe7f3] bg-[#f7fafd] p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={value}
        alt={label}
        className="h-16 w-16 shrink-0 rounded-lg border border-[#c3d6ea] bg-white object-cover"
      />
      <div className="min-w-0 flex-1">
        <span className="mb-1 block text-[13px] font-semibold text-[#33569c]">{label}</span>
        <div className="flex flex-wrap items-center gap-2">
          <label className="cursor-pointer rounded-lg bg-[#33569c] px-3 py-1.5 text-[13px] font-semibold text-white transition-transform active:scale-95">
            {uploading ? "Uploading…" : "Upload photo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f);
                e.target.value = "";
              }}
            />
          </label>
          <input
            className={`${inputCls} flex-1 min-w-[160px] text-[13px]`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste an image URL"
          />
        </div>
        {err && <p className="mt-1 text-xs text-[#b03434]">{err}</p>}
      </div>
    </div>
  );
}

/* ---------- login ---------- */

function Login({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Sign-in failed.");
      onDone();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-[#eaf2fa] px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-[#dbe7f3] bg-white p-8 shadow-[0_18px_44px_rgba(51,86,156,0.15)]"
      >
        <h1 className="font-script text-4xl text-[#33569c]">Levi’s Invitation</h1>
        <p className="mt-1 text-sm text-[#5a769c]">
          Sign in to edit the invitation and see RSVPs.
        </p>
        <label className="mt-6 block">
          <span className="mb-1 block text-[13px] font-semibold text-[#33569c]">
            Admin password
          </span>
          <input
            type="password"
            className={inputCls}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </label>
        {err && <p className="mt-2 text-sm text-[#b03434]">{err}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full rounded-lg bg-[#33569c] py-2.5 font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

/* ---------- RSVP table ---------- */

function RsvpTable() {
  const [rows, setRows] = useState<RsvpEntry[] | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/api/rsvp")
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json()).error || "Failed to load.");
        return r.json();
      })
      .then(setRows)
      .catch((e) => setErr(e.message));
  }, []);

  if (err) return <p className="text-sm text-[#b03434]">{err}</p>;
  if (!rows) return <p className="text-sm text-[#5a769c]">Loading RSVPs…</p>;
  if (rows.length === 0)
    return (
      <p className="rounded-xl border border-dashed border-[#c3d6ea] bg-[#f7fafd] p-6 text-center text-sm text-[#5a769c]">
        No RSVPs yet — share the invitation link and responses will appear here.
      </p>
    );

  const attendingCount = rows
    .filter((r) => r.attending === "yes")
    .reduce((sum, r) => sum + (r.guests || 1), 0);

  return (
    <div>
      <p className="mb-3 text-sm text-[#33569c]">
        <strong>{attendingCount}</strong> guest{attendingCount === 1 ? "" : "s"} confirmed
        across <strong>{rows.filter((r) => r.attending === "yes").length}</strong> parties ·{" "}
        {rows.filter((r) => r.attending === "no").length} can’t make it
      </p>
      <div className="overflow-x-auto rounded-xl border border-[#dbe7f3]">
        <table className="w-full min-w-[560px] bg-white text-left text-sm">
          <thead className="bg-[#f0f6fb] text-[#33569c]">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Name</th>
              <th className="px-4 py-2.5 font-semibold">Attending</th>
              <th className="px-4 py-2.5 font-semibold">Guests</th>
              <th className="px-4 py-2.5 font-semibold">Message</th>
              <th className="px-4 py-2.5 font-semibold">When</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-[#eef4f9] text-[#22406e]">
                <td className="px-4 py-2.5">{r.name}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      r.attending === "yes"
                        ? "bg-[#e3f2e6] text-[#2c7a3d]"
                        : "bg-[#fbecec] text-[#a03434]"
                    }`}
                  >
                    {r.attending === "yes" ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-2.5">{r.attending === "yes" ? r.guests : "—"}</td>
                <td className="max-w-[240px] px-4 py-2.5 text-[#5a769c]">{r.message}</td>
                <td className="whitespace-nowrap px-4 py-2.5 text-[#7a90ad]">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- main admin ---------- */

const TABS = [
  "Envelope",
  "Main card",
  "Details",
  "Dress code",
  "Reminders",
  "Gifts",
  "Save the date",
  "RSVPs",
] as const;
type Tab = (typeof TABS)[number];

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [mode, setMode] = useState<"supabase" | "local">("local");
  const [defaultPw, setDefaultPw] = useState(false);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<Tab>("Main card");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const refresh = useCallback(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((s) => {
        setAuthed(s.signedIn);
        setMode(s.mode);
        setDefaultPw(s.defaultPassword);
      });
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const set = (path: (string | number)[], value: unknown) => {
    setContent((c) => (c ? setPath(c, path, value) : c));
    setDirty(true);
  };
  const val = (path: (string | number)[]) =>
    String(getPath(content, path) ?? "");

  const save = async () => {
    if (!content || saving) return;
    setSaving(true);
    setNotice("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Save failed.");
      setDirty(false);
      setNotice("Saved! The invitation is updated.");
      setTimeout(() => setNotice(""), 3500);
    } catch (e) {
      setNotice(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch("/api/login", { method: "DELETE" });
    setAuthed(false);
  };

  if (authed === null || (authed && !content)) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#eaf2fa] text-[#5a769c]">
        Loading…
      </div>
    );
  }
  if (!authed) return <Login onDone={refresh} />;
  const c = content!;

  return (
    <div className="min-h-svh bg-[#eaf2fa] pb-24">
      {/* header */}
      <header className="sticky top-0 z-40 border-b border-[#dbe7f3] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
          <h1 className="font-script text-3xl text-[#33569c]">Levi’s Invitation — Admin</h1>
          <div className="ml-auto flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="rounded-lg border border-[#c3d6ea] px-3 py-1.5 text-sm font-semibold text-[#33569c] transition-colors hover:bg-[#f0f6fb]"
            >
              View site
            </a>
            <button
              onClick={logout}
              className="rounded-lg px-3 py-1.5 text-sm text-[#7a90ad] hover:text-[#33569c]"
            >
              Sign out
            </button>
            <button
              onClick={save}
              disabled={!dirty || saving}
              className="rounded-lg bg-[#33569c] px-4 py-1.5 text-sm font-semibold text-white transition-transform active:scale-95 disabled:opacity-40"
            >
              {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
            </button>
          </div>
        </div>
        {notice && (
          <div className="border-t border-[#dbe7f3] bg-[#eef7ef] px-4 py-2 text-center text-sm text-[#2c7a3d]">
            {notice}
          </div>
        )}
      </header>

      <div className="mx-auto max-w-5xl px-4">
        {(mode === "local" || defaultPw) && (
          <div className="mt-4 rounded-xl border border-[#e8d9a8] bg-[#fdf7e3] px-4 py-3 text-sm text-[#7a642a]">
            {mode === "local" && (
              <p>
                <strong>Local storage mode:</strong> changes save to files on this computer.
                Set the Supabase environment variables before deploying to Vercel (see README).
              </p>
            )}
            {defaultPw && (
              <p>
                <strong>Default password in use:</strong> set <code>ADMIN_PASSWORD</code> in
                your environment to secure this page.
              </p>
            )}
          </div>
        )}

        {/* tabs */}
        <nav className="mt-5 flex flex-wrap gap-1.5">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                tab === t
                  ? "bg-[#33569c] text-white"
                  : "bg-white text-[#33569c] hover:bg-[#f0f6fb]"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className="mt-5 grid gap-4 rounded-2xl border border-[#dbe7f3] bg-white p-5 md:p-7">
          {tab === "Envelope" && (
            <>
              <TextField label="Big script title" value={val(["envelope", "title"])} onChange={(v) => set(["envelope", "title"], v)} />
              <TextField label="Hint under the envelope" value={val(["envelope", "hint"])} onChange={(v) => set(["envelope", "hint"], v)} />
              <TextField label="Wax seal initial" value={val(["envelope", "sealInitial"])} onChange={(v) => set(["envelope", "sealInitial"], v)} hint="One letter looks best." />
            </>
          )}

          {tab === "Main card" && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Top curved line" value={val(["hero", "topLine"])} onChange={(v) => set(["hero", "topLine"], v)} />
                <TextField label="Event type (big script)" value={val(["hero", "eventType"])} onChange={(v) => set(["hero", "eventType"], v)} />
                <TextField label="Middle line" value={val(["hero", "ofLine"])} onChange={(v) => set(["hero", "ofLine"], v)} />
                <TextField label="Child’s name" value={val(["hero", "childName"])} onChange={(v) => set(["hero", "childName"], v)} />
                <TextField label="Day name" value={val(["hero", "dayName"])} onChange={(v) => set(["hero", "dayName"], v)} />
                <TextField label="Day number" value={val(["hero", "dayNumber"])} onChange={(v) => set(["hero", "dayNumber"], v)} />
                <TextField label="Month" value={val(["hero", "monthName"])} onChange={(v) => set(["hero", "monthName"], v)} />
                <TextField label="Time" value={val(["hero", "time"])} onChange={(v) => set(["hero", "time"], v)} />
                <TextField label="Venue name" value={val(["hero", "venueName"])} onChange={(v) => set(["hero", "venueName"], v)} />
                <TextField label="Venue address" value={val(["hero", "venueAddress"])} onChange={(v) => set(["hero", "venueAddress"], v)} />
              </div>
              <TextField label="Bear hint text" value={val(["hero", "hint"])} onChange={(v) => set(["hero", "hint"], v)} />
              <PhotoField label="Big baby photo (bottom-left)" value={val(["hero", "babyPhoto"])} onChange={(v) => set(["hero", "babyPhoto"], v)} />
              {c.hero.polaroids.map((_, i) => (
                <PhotoField key={i} label={`Polaroid ${i + 1}`} value={val(["hero", "polaroids", i])} onChange={(v) => set(["hero", "polaroids", i], v)} />
              ))}
            </>
          )}

          {tab === "Details" && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Section heading" value={val(["details", "heading"])} onChange={(v) => set(["details", "heading"], v)} />
                <TextField label="Date & time title" value={val(["details", "dateTimeTitle"])} onChange={(v) => set(["details", "dateTimeTitle"], v)} />
                <TextField label="Date line" value={val(["details", "dateLine"])} onChange={(v) => set(["details", "dateLine"], v)} hint="Shown on the card — keep it in sync with the countdown date-time below." />
                <TextField label="Time line" value={val(["details", "timeLine"])} onChange={(v) => set(["details", "timeLine"], v)} />
              </div>
              <hr className="border-[#eef4f9]" />
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Ceremony title" value={val(["details", "ceremonyTitle"])} onChange={(v) => set(["details", "ceremonyTitle"], v)} />
                <TextField label="Ceremony venue" value={val(["details", "ceremonyName"])} onChange={(v) => set(["details", "ceremonyName"], v)} hint="Leave empty to hide this whole block on the invitation." />
                <TextField label="Ceremony address" value={val(["details", "ceremonyAddress"])} onChange={(v) => set(["details", "ceremonyAddress"], v)} />
                <TextField label="Ceremony map link" value={val(["details", "ceremonyMapUrl"])} onChange={(v) => set(["details", "ceremonyMapUrl"], v)} />
              </div>
              <PhotoField label="Ceremony photo" value={val(["details", "ceremonyPhoto"])} onChange={(v) => set(["details", "ceremonyPhoto"], v)} />
              <hr className="border-[#eef4f9]" />
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Reception title" value={val(["details", "receptionTitle"])} onChange={(v) => set(["details", "receptionTitle"], v)} />
                <TextField label="Reception venue" value={val(["details", "receptionName"])} onChange={(v) => set(["details", "receptionName"], v)} hint="Leave empty to hide this whole block on the invitation." />
                <TextField label="Reception address" value={val(["details", "receptionAddress"])} onChange={(v) => set(["details", "receptionAddress"], v)} />
                <TextField label="Reception map link" value={val(["details", "receptionMapUrl"])} onChange={(v) => set(["details", "receptionMapUrl"], v)} />
              </div>
              <PhotoField label="Reception photo" value={val(["details", "receptionPhoto"])} onChange={(v) => set(["details", "receptionPhoto"], v)} />
              <hr className="border-[#eef4f9]" />
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Countdown heading" value={val(["details", "countdownTitle"])} onChange={(v) => set(["details", "countdownTitle"], v)} />
                <TextField label="Event date-time (ISO)" value={val(["details", "eventISO"])} onChange={(v) => set(["details", "eventISO"], v)} hint="e.g. 2027-08-15T14:00:00+08:00 — the countdown ticks toward this moment; once it passes, guests see the celebration message instead." />
              </div>
            </>
          )}

          {tab === "Dress code" && (
            <>
              <TextField label="Heading" value={val(["dressCode", "heading"])} onChange={(v) => set(["dressCode", "heading"], v)} />
              <TextField label="Body text" textarea value={val(["dressCode", "body"])} onChange={(v) => set(["dressCode", "body"], v)} />
              <div>
                <span className="mb-2 block text-[13px] font-semibold text-[#33569c]">Palette swatches</span>
                <div className="flex flex-wrap gap-3">
                  {c.dressCode.colors.map((color, i) => (
                    <div key={i} className="flex items-center gap-1.5 rounded-lg border border-[#dbe7f3] bg-[#f7fafd] p-2">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => set(["dressCode", "colors", i], e.target.value)}
                        className="h-9 w-9 cursor-pointer rounded border-0 bg-transparent"
                        aria-label={`Swatch ${i + 1}`}
                      />
                      <input
                        className={`${inputCls} w-28`}
                        value={c.dressCode.colorNames[i] ?? ""}
                        onChange={(e) => set(["dressCode", "colorNames", i], e.target.value)}
                        placeholder="Shade name"
                        aria-label={`Swatch ${i + 1} name`}
                      />
                      <button
                        onClick={() => {
                          set(["dressCode", "colors"], c.dressCode.colors.filter((_, j) => j !== i));
                          set(["dressCode", "colorNames"], c.dressCode.colorNames.filter((_, j) => j !== i));
                        }}
                        className="px-1 text-sm text-[#b03434]"
                        aria-label="Remove swatch"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      set(["dressCode", "colors"], [...c.dressCode.colors, "#a8c4e0"]);
                      set(["dressCode", "colorNames"], [...c.dressCode.colorNames, "New shade"]);
                    }}
                    className="rounded-lg border border-dashed border-[#c3d6ea] px-4 text-sm font-semibold text-[#33569c] hover:bg-[#f0f6fb]"
                  >
                    + Add color
                  </button>
                </div>
              </div>
            </>
          )}

          {tab === "Reminders" && (
            <>
              <TextField label="Heading" value={val(["reminders", "heading"])} onChange={(v) => set(["reminders", "heading"], v)} />
              <TextField label="Intro" textarea value={val(["reminders", "intro"])} onChange={(v) => set(["reminders", "intro"], v)} />
              {c.reminders.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2 rounded-xl border border-[#dbe7f3] bg-[#f7fafd] p-3">
                  <select
                    value={item.icon}
                    onChange={(e) => set(["reminders", "items", i, "icon"], e.target.value)}
                    className="rounded-lg border border-[#c3d6ea] bg-white px-2 py-2 text-sm text-[#22406e]"
                    aria-label="Icon"
                  >
                    <option value="no-kiss">No kissing</option>
                    <option value="sanitize">Sanitize</option>
                    <option value="no-smoke">No smoking</option>
                    <option value="mask">Stay home if sick</option>
                  </select>
                  <input
                    className={inputCls}
                    value={item.text}
                    onChange={(e) => set(["reminders", "items", i, "text"], e.target.value)}
                  />
                  <button
                    onClick={() => set(["reminders", "items"], c.reminders.items.filter((_, j) => j !== i))}
                    className="mt-2 text-sm text-[#b03434]"
                    aria-label="Remove reminder"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => set(["reminders", "items"], [...c.reminders.items, { icon: "mask", text: "" } satisfies ReminderItem])}
                className="w-fit rounded-lg border border-dashed border-[#c3d6ea] px-4 py-2 text-sm font-semibold text-[#33569c] hover:bg-[#f0f6fb]"
              >
                + Add reminder
              </button>
            </>
          )}

          {tab === "Gifts" && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Big letters (child’s name)" value={val(["gifts", "nameLetters"])} onChange={(v) => set(["gifts", "nameLetters"], v)} />
                <TextField label="Heading" value={val(["gifts", "heading"])} onChange={(v) => set(["gifts", "heading"], v)} />
              </div>
              <div className="rounded-xl border border-[#dbe7f3] p-3">
                <span className="mb-1 block text-[13px] font-semibold text-[#33569c]">
                  Letter cut-out photos (one per letter)
                </span>
                <p className="mb-3 text-xs text-[#7a90ad]">
                  Upload pre-cut photo-in-letter images in reading order — they replace the
                  single fill photo below. Remove all of them to go back to the single-photo fill.
                </p>
                {c.gifts.letterImages.map((src, i) => (
                  <div key={i} className="mb-2 flex items-center gap-2">
                    <div className="flex-1">
                      <PhotoField
                        label={`Letter ${i + 1}${c.gifts.nameLetters[i] ? ` — “${c.gifts.nameLetters[i].toUpperCase()}”` : ""}`}
                        value={src}
                        onChange={(v) => set(["gifts", "letterImages", i], v)}
                      />
                    </div>
                    <button
                      onClick={() => set(["gifts", "letterImages"], c.gifts.letterImages.filter((_, j) => j !== i))}
                      className="text-sm text-[#b03434]"
                      aria-label="Remove letter photo"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => set(["gifts", "letterImages"], [...c.gifts.letterImages, ""])}
                  className="rounded-lg border border-dashed border-[#c3d6ea] px-4 py-2 text-sm font-semibold text-[#33569c] hover:bg-[#f0f6fb]"
                >
                  + Add letter photo
                </button>
              </div>
              <PhotoField label="Photo inside the big letters (single-fill fallback)" value={val(["gifts", "letterPhoto"])} onChange={(v) => set(["gifts", "letterPhoto"], v)} />
              <TextField label="Intro" textarea value={val(["gifts", "intro"])} onChange={(v) => set(["gifts", "intro"], v)} />
              {c.gifts.items.map((item, i) => (
                <div key={i} className="grid gap-3 rounded-xl border border-[#dbe7f3] bg-[#f7fafd] p-3">
                  <div className="flex items-center gap-2">
                    <input
                      className={inputCls}
                      value={item.name}
                      onChange={(e) => set(["gifts", "items", i, "name"], e.target.value)}
                      placeholder="Gift idea name"
                    />
                    <button
                      onClick={() => set(["gifts", "items"], c.gifts.items.filter((_, j) => j !== i))}
                      className="text-sm text-[#b03434]"
                      aria-label="Remove gift"
                    >
                      Remove
                    </button>
                  </div>
                  <PhotoField label="Gift photo" value={item.photo} onChange={(v) => set(["gifts", "items", i, "photo"], v)} />
                </div>
              ))}
              <button
                onClick={() => set(["gifts", "items"], [...c.gifts.items, { name: "", photo: "/placeholders/gift-diaper.svg" }])}
                className="w-fit rounded-lg border border-dashed border-[#c3d6ea] px-4 py-2 text-sm font-semibold text-[#33569c] hover:bg-[#f0f6fb]"
              >
                + Add gift idea
              </button>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Monetary gift line" value={val(["gifts", "monetaryTitle"])} onChange={(v) => set(["gifts", "monetaryTitle"], v)} />
              </div>
              <TextField label="Closing note" textarea value={val(["gifts", "outro"])} onChange={(v) => set(["gifts", "outro"], v)} />
            </>
          )}

          {tab === "Save the date" && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Heading" value={val(["rsvp", "heading"])} onChange={(v) => set(["rsvp", "heading"], v)} />
                <TextField label="Hosts line" value={val(["rsvp", "hosts"])} onChange={(v) => set(["rsvp", "hosts"], v)} />
              </div>
              <TextField label="Message" textarea value={val(["rsvp", "message"])} onChange={(v) => set(["rsvp", "message"], v)} />
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="RSVP title" value={val(["rsvp", "rsvpTitle"])} onChange={(v) => set(["rsvp", "rsvpTitle"], v)} />
                <TextField label="RSVP note" value={val(["rsvp", "rsvpNote"])} onChange={(v) => set(["rsvp", "rsvpNote"], v)} />
              </div>
              <span className="text-[13px] font-semibold text-[#33569c]">Photo collage</span>
              {c.rsvp.collage.map((src, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex-1">
                    <PhotoField label={`Collage photo ${i + 1}`} value={src} onChange={(v) => set(["rsvp", "collage", i], v)} />
                  </div>
                  <button
                    onClick={() => set(["rsvp", "collage"], c.rsvp.collage.filter((_, j) => j !== i))}
                    className="text-sm text-[#b03434]"
                    aria-label="Remove photo"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => set(["rsvp", "collage"], [...c.rsvp.collage, "/placeholders/baby-1.svg"])}
                className="w-fit rounded-lg border border-dashed border-[#c3d6ea] px-4 py-2 text-sm font-semibold text-[#33569c] hover:bg-[#f0f6fb]"
              >
                + Add collage photo
              </button>
            </>
          )}

          {tab === "RSVPs" && <RsvpTable />}
        </div>
      </div>
    </div>
  );
}
