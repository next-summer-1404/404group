"use client";
import React, { useEffect, useState } from "react";
import AuthSideBanner from "../../../../../components/authContainer/AuthSideBanner";

import RedirectButton from "../../../../../components/authContainer/RedirectButton";
import RegisterFormStepTow from "../../../../../components/authContainer/RegisterFormStepTow";
import Cookies from "js-cookie";
import Link from "next/link";
function registerStepTow() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const savedEmail = Cookies.get("email") || null;
    setEmail(savedEmail);
  }, []);

  if (!email) return null;

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
          <div className=" flex flex-col mb-8">
            {" "}
            {email && (
              <p className=" text-gray-600 text-right">
                {`کد تایید ارسال شده به ${email}وارد کنید.`}
              </p>
            )}
            <Link
              href={"/register/step1"}
              className="text-blue-600 hover:underline mr-1 "
            >
              تغییر ایمیل
            </Link>
          </div>

          <RegisterFormStepTow />
        </div>
      </div>
      <AuthSideBanner />
    </div>
  );
}

export default registerStepTow;
