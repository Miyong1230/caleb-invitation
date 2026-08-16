import { NextResponse } from "next/server";
import { storageMode } from "@/lib/store";
import { isAdmin, usingDefaultPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    signedIn: await isAdmin(),
    mode: storageMode(),
    defaultPassword: usingDefaultPassword(),
  });
}
