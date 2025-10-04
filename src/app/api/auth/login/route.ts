import { NextResponse } from "next/server";
import http from "@/services/api/interceptor/interceptor";
import { ILogin } from "@/services/api/auth/login/Login";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res: ILogin = await http.post(`/api/auth/login`, { email, password });

    const { accessToken, refreshToken } = res;

    // ایجاد response
    const response = NextResponse.json({
      success: true,
      accessToken,
      refreshToken,
    });

    // ذخیره کوکی‌ها سمت سرور
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 ساعت
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 روز
    });

    // ✅ مهم: return response
    return response;
  } catch (err: any) {
    console.error("Login API error:", err.response?.data || err.message);

    return NextResponse.json(
      { message: err.response?.data?.message || "Server error" },
      { status: err.response?.status || 500 }
    );
  }
}
