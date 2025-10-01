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

function RegisterFormStepTow() {
  const tempUserId = Cookies.get("tempUserId");
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
  const [verifyCode, setVerifyCode] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCode) {
      return toast.error("لطفا کد تایید را وارد کنید !");
    } else if (verifyCode.length !== 6) {
      return toast.error("لطفا کد تایید را کامل وارد کنید !");
    }
    if (tempUserId) {
      setIsLoading(true);
      PostVerify.mutate(verifyCode);
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
