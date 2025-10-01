import React from "react";
import AuthSideBanner from "../../../../../components/authContainer/AuthSideBanner";
import { Button } from "@heroui/button";

import { register } from "../../../../../lib/actions/auth";
import RedirectButton from "../../../../../components/authContainer/RedirectButton";

function registerStepThree() {
  return (
    <div className="flex flex-col lg:flex-row justify-between ">
      <div className="w-[100%] ">
        <div className="max-w-md mx-auto p-6  mt-[104px]">
          <div className="flex flex-row-reverse justify-between">
            {" "}
            <RedirectButton Link="/register/step2" title="بازگشت" />
            <h1 className="text-2xl font-bold mb-4 text-right">
              ثبت نام در آلفا
            </h1>
          </div>

          <p className="mb-8 text-gray-600 text-right">
            مشخصات خواسته شده را پر کنید
          </p>

          <form action={register} className="flex flex-col gap-4">
            <label htmlFor="email" className="text-right font-semibold">
              شماره همراه
            </label>
            <input
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              placeholder="  شماره همراه خود را وارد کنید"
              className="text-right w-[390px] h-[48px] bg-[#F9F9F9] rounded-[31px] p-6 outline-none border-none "
            />{" "}
            <label htmlFor="email" className="text-right font-semibold">
              رمز عبور
            </label>
            <input
              id="password"
              type="text"
              name="password"
              placeholder="  رمز عبور خود را وارد کنید"
              className="text-right w-[390px] h-[48px] bg-[#F9F9F9] rounded-[31px] p-6 outline-none border-none"
            />{" "}
            <label htmlFor="email" className="text-right font-semibold">
              تکرار رمز عبور
            </label>
            <input
              id="repeatPass"
              type="text"
              name="repeatPass"
              placeholder=" تکرار رمز عبور خود را وارد کنید"
              className="text-right w-[390px] h-[48px] bg-[#F9F9F9] rounded-[31px] p-6 outline-none border-none"
            />
            <Button
              type="submit"
              className="bg-[#7575FE] hover:bg-[#6d6dfc] text-white rounded-[31px] h-[48px] w-[390px] mt-[8px]"
            >
              ثبت نام
            </Button>
          </form>
        </div>
      </div>
      <AuthSideBanner />
    </div>
  );
}

export default registerStepThree;
