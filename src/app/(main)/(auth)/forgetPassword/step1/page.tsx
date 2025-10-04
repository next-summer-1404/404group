import React from "react";
import AuthSideBanner from "../../../../../components/authContainer/AuthSideBanner";

import googleIcone from "@/assets/auth/googleIcone.png";
import appleIcone from "@/assets/auth/appleIcnoe.png";
import RedirectButton from "../../../../../components/authContainer/RedirectButton";
import Link from "next/link";
import RegisterFormStepOne from "../../../../../components/authContainer/RegisterFormStepOne";

function forgetPassStepOne() {
  return (
    <div className="flex flex-col lg:flex-row justify-between ">
      <div className="w-[100%] ">
        <div className="max-w-md mx-auto p-6  mt-[104px]">
          <div className="flex flex-row-reverse justify-between">
            {" "}
            <RedirectButton Link="/" title="صفحه اصلی" />
            <h1 className="text-2xl font-bold mb-4 text-right">
              بازیابی رمز عبور
            </h1>
          </div>

          <p className="mb-8 text-gray-600 text-right">
            برای بازیابی رمز عبور در آلفا با ارسال کد تایید به ایمیل خود اقدام
            کنید
          </p>

          <RegisterFormStepOne inForgetPass={true} />

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

export default forgetPassStepOne;
