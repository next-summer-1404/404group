import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  // دیکود کردن بدون verify
  const decoded = jwt.decode(accessToken);

  console.log("Decoded Token:", decoded);

  return NextResponse.json({ decoded });
}
