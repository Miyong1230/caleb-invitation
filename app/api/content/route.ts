import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { mergeContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  try {
    const body = await req.json();
    const content = mergeContent(body);
    await saveContent(content);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not save." },
      { status: 500 }
    );
  }
}
