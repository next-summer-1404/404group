import React from "react";
import AuthSideBanner from "../../../../../components/authContainer/AuthSideBanner";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/react";

import googleIcone from "@/assets/auth/googleIcone.png";
import appleIcone from "@/assets/auth/appleIcnoe.png";
import RedirectButton from "../../../../../components/authContainer/RedirectButton";
import Link from "next/link";
import RegisterFormStepOne from "../../../../../components/authContainer/RegisterFormStepOne";

function registerStepOne() {
  // const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row justify-between ">
      <div className="w-[100%] ">
        <div className="max-w-md mx-auto p-6  mt-[104px]">
          <div className="flex flex-row-reverse justify-between">
            {" "}
            <RedirectButton Link="/" title="صفحه اصلی" />
            <h1 className="text-2xl font-bold mb-4 text-right">
              ثبت نام در آلفا
            </h1>
          </div>

          <p className="mb-8 text-gray-600 text-right">
            برای ثبت نام در آلفا میتوانید با اکانت گوگل یا اپل خود و یا با ارسال
            کد تایید به ایمیل خود اقدام کنید
          </p>

          <div className="flex flex-col lg:flex-row justify-center gap-4 mb-8">
            <button
              className="flex items-center gap-2 bg-no-repeat bg-right  py-[12px] px-[37px] lg:p-0  lg:w-[187px] lg:h-[48px]   border rounded-[31px] border-[#F0F0F0]"
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

          <RegisterFormStepOne />

          <div className="mt-6 text-center text-sm">
            حساب کاربری دارید؟
            <Link href="/login" className="text-blue-600 hover:underline mr-1">
              ورود به حساب
            </Link>
          </div>
        </div>
      </div>
      <AuthSideBanner />
    </div>
  );
}

export default registerStepOne;
