import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import http from "@/services/api/interceptor/interceptor";
interface ResposeRefreshToken {
  accessToken: string;
}
export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  // دیکود کردن توکن
  const decoded: any = jwt.decode(accessToken);
  const now = Math.floor(Date.now() / 1000);

  // اگر توکن معتبر بود
  if (decoded && decoded.exp && decoded.exp > now) {
    console.log("Token is valid");
    return NextResponse.json({ decoded });
  }

  // اگر منقضی شده
  console.log("Token expired, refreshing...");

  try {
    // درخواست رفرش به بک‌اند
    const res: ResposeRefreshToken = await http.post("/api/auth/refresh", {
      token: refreshToken,
    });

    if (!res.accessToken) {
      return NextResponse.json(
        { message: "Refresh token failed" },
        { status: 401 }
      );
    }

    const newAccessToken = res.accessToken;

    // ست کردن کوکی‌ها
    const response = NextResponse.json({ decoded: newAccessToken });

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 ساعت
    });

    return response;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
