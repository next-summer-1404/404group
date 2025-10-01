"use client";
import React, { useState } from "react";
import AuthSideBanner from "../../../../../components/authContainer/AuthSideBanner";
import { Button } from "@heroui/button";
import RedirectButton from "../../../../../components/authContainer/RedirectButton";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PostInformation } from "../../../../../services/api/auth/register/stepThree/PostInformation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

type FormInformation = {
  PhoneNumber: string;
  PhoneNumberRepeat: string;
  password: string;
};

function RegisterStepThree() {
  const router = useRouter();
  const userId = Cookies.get("userId");

  if (!userId) {
    toast.error("کاربر موقت پیدا نشد! دوباره تلاش کنید.");
    router.push("/register/step2");
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInformation>();

  const [isLoading, setIsLoading] = useState(false);

  const postMutation = useMutation({
    mutationFn: (data: FormInformation) =>
      PostInformation(userId!, data.password, data.PhoneNumber),
    onMutate: () => setIsLoading(true),
    onSuccess: (response) => {
      setIsLoading(false);
      toast.success("عملیات با موفقیت انجام شد");
      console.log(response);

      router.push("/");
    },
    onError: () => {
      setIsLoading(false);
      toast.error("خطا در ارسال اطلاعات، دوباره تلاش کنید!");
    },
  });

  const onSubmit = (data: FormInformation) => {
    if (data.password !== data.PhoneNumberRepeat) {
      return toast.error("رمز عبور و تکرار آن یکسان نیست!");
    }
    console.log(data);
    if (userId) {
      postMutation.mutate(data);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between ">
      <div className="w-[100%]">
        <div className="max-w-md mx-auto p-6 mt-[104px]">
          <div className="flex flex-row-reverse justify-between">
            <RedirectButton Link="/register/step2" title="بازگشت" />
            <h1 className="text-2xl font-bold mb-4 text-right">
              ثبت نام در آلفا
            </h1>
          </div>

          <p className="mb-8 text-gray-600 text-right">
            مشخصات خواسته شده را پر کنید
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* شماره همراه */}
            <label htmlFor="PhoneNumber" className="text-right font-semibold">
              شماره همراه
            </label>
            <input
              id="PhoneNumber"
              type="text"
              placeholder="شماره همراه خود را وارد کنید"
              className={`text-right w-[390px] h-[48px] bg-[#F9F9F9] rounded-[31px] p-4 outline-none border ${
                errors.PhoneNumber ? "border-red-500" : "border-none"
              }`}
              {...register("PhoneNumber", {
                required: "شماره همراه الزامی است",
                pattern: {
                  value: /^09\d{9}$/,
                  message: "شماره همراه معتبر وارد کنید",
                },
              })}
            />
            {errors.PhoneNumber && (
              <p className="text-red-500 text-sm text-right">
                {errors.PhoneNumber.message}
              </p>
            )}

            {/* رمز عبور */}
            <label htmlFor="password" className="text-right font-semibold">
              رمز عبور
            </label>
            <input
              id="password"
              type="password"
              placeholder="رمز عبور خود را وارد کنید"
              className={`text-right w-[390px] h-[48px] bg-[#F9F9F9] rounded-[31px] p-4 outline-none border ${
                errors.password ? "border-red-500" : "border-none"
              }`}
              {...register("password", { required: "رمز عبور الزامی است" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm text-right">
                {errors.password.message}
              </p>
            )}

            {/* تکرار رمز عبور */}
            <label
              htmlFor="PhoneNumberRepeat"
              className="text-right font-semibold"
            >
              تکرار رمز عبور
            </label>
            <input
              id="PhoneNumberRepeat"
              type="password"
              placeholder="تکرار رمز عبور خود را وارد کنید"
              className={`text-right w-[390px] h-[48px] bg-[#F9F9F9] rounded-[31px] p-4 outline-none border ${
                errors.PhoneNumberRepeat ? "border-red-500" : "border-none"
              }`}
              {...register("PhoneNumberRepeat", {
                required: "تکرار رمز عبور الزامی است",
              })}
            />
            {errors.PhoneNumberRepeat && (
              <p className="text-red-500 text-sm text-right">
                {errors.PhoneNumberRepeat.message}
              </p>
            )}

            <Button
              isLoading={isLoading}
              type="submit"
              disabled={isLoading}
              className="bg-[#7575FE] hover:bg-[#6d6dfc] text-white rounded-[31px] h-[48px] w-[390px] mt-[8px]"
            >
              {isLoading ? "در حال ارسال..." : "ثبت نام"}
            </Button>
          </form>
        </div>
      </div>
      <AuthSideBanner />
    </div>
  );
}

export default RegisterStepThree;
