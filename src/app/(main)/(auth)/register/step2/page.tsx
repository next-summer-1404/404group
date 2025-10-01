import React from "react";
import AuthSideBanner from "../../../../../components/authContainer/AuthSideBanner";
import { Button } from "@heroui/button";
import TimerButton from "../../../../../components/authContainer/TimerButton";
import OTPInput from "../../../../../components/authContainer/inputOtp";
import { verifyOtp } from "../../../../../lib/actions/auth";
import RedirectButton from "../../../../../components/authContainer/RedirectButton";

function registerStepTow() {
  return (
    <div className="flex flex-col lg:flex-row justify-between ">
      <div className="w-[100%] ">
        <div className="max-w-md mx-auto p-6  mt-[104px]">
          <div className="flex flex-row-reverse justify-between">
            {" "}
            <RedirectButton Link="/register/step1" title="بازگشت" />
            <h1 className="text-2xl font-bold mb-4 text-right">
              ثبت نام در آلفا
            </h1>
          </div>

          <p className="mb-8 text-gray-600 text-right">
            کد تایید ارسال شده به Example@gmail.com را وارد کنید. تغییر ایمیل
          </p>

          <form action={verifyOtp} className="flex flex-col gap-4">
            <label htmlFor="email" className="text-right font-semibold">
              کد تایید
            </label>
            <OTPInput />
            <TimerButton />
            <Button
              type="submit"
              className="bg-[#7575FE] hover:bg-[#6d6dfc] text-white rounded-[31px] h-[48px] w-[390px] mt-[8px]"
            >
              ارسال
            </Button>
          </form>
        </div>
      </div>
      <AuthSideBanner />
    </div>
  );
}

export default registerStepTow;
