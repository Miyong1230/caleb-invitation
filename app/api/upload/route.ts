import { NextRequest, NextResponse } from "next/server";
import { uploadPhoto, storageMode } from "@/lib/store";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Vercel serverless request bodies cap at ~4.5 MB; stay under it.
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files can be uploaded." },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image is larger than 4 MB. Please resize it first." },
        { status: 400 }
      );
    }
    const { url } = await uploadPhoto(file);
    return NextResponse.json({ url, mode: storageMode() });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed." },
      { status: 500 }
    );
  }
}
