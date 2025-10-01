"use client";
import React from "react";
import { Card } from "@heroui/card";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/react";

import googleIcone from "@/assets/auth/googleIcone.png";
import appleIcone from "@/assets/auth/appleIcnoe.png";
import { useRouter } from "next/navigation";
import AuthSideBanner from "../../../../components/authContainer/AuthSideBanner";
import RedirectButton from "../../../../components/authContainer/RedirectButton";
import Link from "next/link";

function Login() {
  return (
    <div className="flex flex-col lg:flex-row justify-between ">
      <div className="w-[100%] ">
        <div className="max-w-md mx-auto p-6  mt-[104px]">
          <div className="flex flex-row-reverse justify-between">
            {" "}
            <RedirectButton Link="/" title="صفحه اصلی" />
            <h1 className="text-2xl font-bold mb-4 text-right">خوش برگشتی! </h1>
          </div>

          <p className="mb-8 text-gray-600 text-right">
            برای ورود به حساب کاربری آلفا میتوانید با اکانت گوگل یا اپل خود و یا
            با ایمیل و رمزعبور خود اقدام کنید
          </p>

          <div className="flex flex-col lg:flex-row justify-center gap-4 mb-8">
            <button
              className="flex items-center gap-2 bg-no-repeat bg-right  py-[12px] px-[37px] lg:p-0  lg:w-[187px] lg:h-[48px]   border rounded-[31px] border-[#F0F0F0]"
              // onClick={() => handleLogin("google")}
              aria-label="ورود با گوگل"
            >
              <div className="flex gap-3 mx-auto">
                {" "}
                <div
                  style={{ backgroundImage: `url(${googleIcone.src})` }}
                  className="size-6"
                ></div>
                <span> ورود با گوگل</span>
              </div>
            </button>
            <button
              className="flex items-center gap-2 bg-no-repeat bg-right py-[12px] px-[37px] lg:p-0  lg:w-[187px] lg:h-[48px]   border rounded-[31px] border-[#F0F0F0]"
              // onClick={() => handleLogin("apple")}
              aria-label="ورود با گوگل"
            >
              {" "}
              <div className="flex items-center  gap-2 mx-auto">
                {" "}
                <div
                  style={{ backgroundImage: `url(${appleIcone.src})` }}
                  className="size-6 "
                ></div>
                <span> ورود با گوگل</span>
              </div>
            </button>
          </div>

          <div className="text-gray-400 text-center mb-6 border-b border-[#F0F0F0]">
            <span className="bg-white p-1 relative top-2.5 text-[#AAAAAA]">
              یا
            </span>
          </div>

          <form className="flex flex-col gap-4">
            <label htmlFor="email" className="text-right font-semibold">
              ایمیل
            </label>
            <input
              id="email"
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              className="text-right w-[390px] h-[48px] bg-[#F9F9F9] rounded-[31px] p-4 outline-none border-none"
            />{" "}
            <label htmlFor="email" className="text-right font-semibold">
              رمز عبور
            </label>
            <input
              id="email"
              type="email"
              placeholder="رمز عبور خود را وارد کنید"
              className="text-right w-[390px] h-[48px] bg-[#F9F9F9] rounded-[31px] p-4 outline-none border-none"
            />
            <Button
              type="submit"
              className="bg-[#7575FE] hover:bg-[#6d6dfc] text-white rounded-[31px] h-[48px] w-[390px] mt-[8px]"
            >
              ورود به حساب{" "}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            حساب کاربری ندارید؟
            <Link
              href="/register/step1"
              className="text-blue-600 hover:underline mr-1"
            >
              ثبت نام در آلفا{" "}
            </Link>
          </div>
        </div>
      </div>
      <AuthSideBanner />
    </div>
  );
}

export default Login;
