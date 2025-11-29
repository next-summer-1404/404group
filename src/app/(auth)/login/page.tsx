"use client";
import React from "react";
import { Card } from "@heroui/card";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/react";

import googleIcone from "@/assets/auth/googleIcone.png";
import appleIcone from "@/assets/auth/appleIcnoe.png";
import { useRouter } from "next/navigation";
import AuthSideBanner from "../../../components/authContainer/AuthSideBanner";
import RedirectButton from "../../../components/authContainer/RedirectButton";
import Link from "next/link";
import LoginForm from "../../../components/authContainer/LoginForm";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

function Login() {
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full">
      {/* فرم سمت راست (در موبایل بالا) */}
      <div className="w-full lg:w-1/2">
        <div className="max-w-md mx-auto p-6 mt-10 lg:mt-[104px]">
          {/* هدر و دکمه‌ها */}
          <div className="flex flex-row-reverse justify-between items-center mb-6">
            <ThemeToggle />
            <RedirectButton Link="/" title="صفحه اصلی" />

            <h1 className="text-2xl font-bold text-right hidden lg:block">
              خوش برگشتی!
            </h1>
          </div>

          {/* عنوان در موبایل */}
          <h1 className="text-xl font-bold text-right lg:hidden mb-3">
            خوش برگشتی!
          </h1>

          {/* توضیحات */}
          <p className="mb-8 text-gray-600 dark:text-gray-300 text-right leading-7">
            برای ورود به حساب کاربری آلفا میتوانید با اکانت گوگل یا اپل خود یا
            با ایمیل و رمز عبور خود اقدام کنید
          </p>

          {/* دکمه های گوگل و اپل */}
          <div className="flex flex-col sm:flex-row lg:flex-row justify-center gap-4 mb-8">
            {/* دکمه گوگل */}
            <button
              className="flex items-center justify-center gap-3
          bg-no-repeat bg-right py-3 px-5 w-full sm:w-1/2 lg:w-[187px] 
          border border-[#F0F0F0] dark:border-gray-700
          rounded-[31px] transition"
            >
              <div
                className="size-6"
                style={{ backgroundImage: `url(${googleIcone.src})` }}
              />
              <span className="text-sm dark:text-gray-200">ورود با گوگل</span>
            </button>

            {/* دکمه اپل */}
            <button
              className="flex items-center justify-center gap-3
          bg-no-repeat bg-right py-3 px-5 w-full sm:w-1/2 lg:w-[187px]
          border border-[#F0F0F0] dark:border-gray-700
          rounded-[31px] transition"
            >
              <div
                className="size-6"
                style={{ backgroundImage: `url(${appleIcone.src})` }}
              />
              <span className="text-sm dark:text-gray-200">ورود با اپل</span>
            </button>
          </div>

          {/* یا جداکننده */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full border-b border-[#F0F0F0] dark:border-gray-700"></div>
            <span className="absolute bg-white dark:bg-gray-900 px-3 text-gray-400">
              یا
            </span>
          </div>

          {/* فرم لاگین */}
          <LoginForm />

          {/* لینک ثبت نام */}
          <div className="mt-6 text-center text-sm">
            حساب کاربری ندارید؟
            <Link
              href="/register/step1"
              className="text-blue-600 dark:text-blue-400 hover:underline mr-1"
            >
              ثبت نام در آلفا
            </Link>
          </div>
        </div>
      </div>

      {/* بنر سمت چپ (در موبایل پایین) */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
        <AuthSideBanner />
      </div>
    </div>
  );
}

export default Login;
