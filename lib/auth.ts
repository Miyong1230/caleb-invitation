// Single-password admin auth with an HMAC-signed session cookie.

import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "invite_admin";
const SESSION_HOURS = 24 * 7;

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "levi-admin";
}

export function usingDefaultPassword(): boolean {
  return !process.env.ADMIN_PASSWORD;
}

function secret(): string {
  return crypto
    .createHash("sha256")
    .update("invite-session:" + adminPassword())
    .digest("hex");
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_HOURS * 3600 * 1000;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return false;
  }
  return Number(payload) > Date.now();
}

export function checkPassword(password: string): boolean {
  const expected = adminPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value);
}

export const SESSION_COOKIE = COOKIE_NAME;
export const SESSION_MAX_AGE = SESSION_HOURS * 3600;
