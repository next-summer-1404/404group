"use server";

import { redirect } from "next/navigation";
import { PostEmailForRegister } from "../../services/api/auth/register/stepOne/PostEmailForRegister";
import { cookies } from "next/headers";
import { PostVerifyCode } from "../../services/api/auth/register/stepTow/PostVerifyCode";

export async function register(formData: FormData) {
  const phoneNumber = formData.get("phoneNumber") as string;
  const password = formData.get("password") as string;
  const repeatPass = formData.get("repeatPass") as string;
  console.log(phoneNumber, password);
  // ولیدیشن با Yup

  // بعد از ثبت، می‌توانید ریدایرکت کنید یا درخواست API بفرستید
  //   redirect("/register/step4");
}

export async function sendCode(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("ایمیل معتبر نیست");
  }

  const res = await PostEmailForRegister(email);
  console.log(res);
  if (res) {
    const cookieStore = await cookies();
    const tempUserId = res.tempUserId;
    // بدون await
    cookieStore.set("tempUserId", String(tempUserId), {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24, // یک روز
    });
  }

  redirect("/register/step2");
}
export async function verifyOtp(formData: FormData): Promise<void> {
  const otp = formData.get("otp") as string;
  const cookieStore = await cookies();
  if (!otp || otp.length !== 6) {
    throw new Error("کد OTP معتبر نیست");
  }

  console.log("کد OTP دریافت شده (انگلیسی):", otp);
  const tempUserId = cookieStore.get("tempUserId")?.value;
  if (!tempUserId) throw new Error("tempUserId پیدا نشد!");
  const res = await PostVerifyCode(tempUserId, otp);
  console.log(res);

  // بعد از ثبت، ریدایرکت می‌کنیم
  redirect("/register/step3");
}
