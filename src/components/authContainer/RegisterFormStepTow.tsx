"use client";
import React, { useState } from "react";
import OTPInput from "./inputOtp";
import TimerButton from "./TimerButton";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { PostVerifyCode } from "../../services/api/auth/register/stepTow/PostVerifyCode";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { PostForgetPasswordStepTwo } from "../../services/api/auth/forgetPassword/stepTow/PostForgetPasswordStepTwo";
interface IPropsRegisterFormStepTow {
  inForgetPass?: boolean;
}
function RegisterFormStepTow({ inForgetPass }: IPropsRegisterFormStepTow) {
  const tempUserId = Cookies.get("tempUserId");
  const email = Cookies.get("email");
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const PostVerify = useMutation({
    mutationFn: (data: string) => PostVerifyCode(tempUserId!, data),
    onSuccess: (response) => {
      setIsLoading(false);
      toast.success("عملیات با موفقیت انجام شد");
      Cookies.set("userId", response?.userId, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      router.push("/register/step3");
    },
    onError: (error) => {
      setIsLoading(false);

      toast.error("کد وارد شده صحیح نمی باشد !");
    },
  });
  const PostForgetPassStepTwo = useMutation({
    mutationFn: (data: string) => PostForgetPasswordStepTwo(email!, data),
    onSuccess: (response, variables) => {
      setIsLoading(false);
      toast.success("عملیات با موفقیت انجام شد");
      Cookies.set("resetCode", variables, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("userId", response?.userId, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      router.push("/forgetPassword/step3");
    },
    onError: (error) => {
      setIsLoading(false);

      toast.error("کد وارد شده صحیح نمی باشد !");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCode) {
      return toast.error("لطفا کد تایید را وارد کنید !");
    } else if (verifyCode.length !== 6) {
      return toast.error("لطفا کد تایید را کامل وارد کنید !");
    }
    if (tempUserId && !inForgetPass) {
      setIsLoading(true);
      PostVerify.mutate(verifyCode);
    }
    if (inForgetPass) {
      PostForgetPassStepTwo.mutate(verifyCode);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="email" className="text-right font-semibold">
        کد تایید
      </label>
      <OTPInput setVerifyCode={setVerifyCode} />
      <TimerButton />
      <Button
        isLoading={isLoading}
        isDisabled={isLoading}
        type="submit"
        className="bg-[#7575FE] hover:bg-[#6d6dfc] text-white rounded-[31px] h-[48px] w-[390px] mt-[8px]"
      >
        ارسال
      </Button>
    </form>
  );
}

export default RegisterFormStepTow;
