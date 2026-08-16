import { NextRequest, NextResponse } from "next/server";
import { addRsvp, getRsvps } from "@/lib/store";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim().slice(0, 120);
    const attending = body.attending === "no" ? "no" : "yes";
    const guests = Math.min(Math.max(Number(body.guests) || 1, 1), 20);
    const message = String(body.message || "").trim().slice(0, 500);
    if (!name) {
      return NextResponse.json(
        { error: "Please tell us your name." },
        { status: 400 }
      );
    }
    await addRsvp({ name, attending, guests, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not save RSVP." },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const list = await getRsvps();
  return NextResponse.json(list);
}
