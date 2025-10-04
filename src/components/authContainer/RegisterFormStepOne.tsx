"use client";
import { Button } from "@heroui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PostEmailForRegister } from "../../services/api/auth/register/stepOne/PostEmailForRegister";
import { Toast } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { PostForgetPassStepOne } from "../../services/api/auth/forgetPassword/stepOne/PostForgetPassStepOne";
import { BlockList } from "net";
type FormValues = {
  email: string;
};
interface IPropsRegisterFormStepOne {
  inForgetPass?: Boolean;
}
function RegisterFormStepOne({ inForgetPass }: IPropsRegisterFormStepOne) {
  // const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const PostEmail = useMutation({
    mutationFn: (data: string) => PostEmailForRegister(data),
    onSuccess: (response, variables) => {
      const email = variables;
      setIsLoading(false);
      toast.success(`کد تایید به ایمیل ${email} ارسال شد`);
      Cookies.set("tempUserId", response?.tempUserId, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("email", email, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      router.push("/register/step2");
    },
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message || "خطایی رخ داده است");
    },
  });
  const PostForgetPass = useMutation({
    mutationFn: (data: string) => PostForgetPassStepOne(data),
    onSuccess: (response, variables) => {
      const email = variables;
      setIsLoading(false);
      toast.success(`کد تایید به ایمیل ${email} ارسال شد`);
      Cookies.set("email", email, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      router.push("/forgetPassword/step2");
    },
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message || "خطایی رخ داده است");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    // console.log(data.email);
    const email = data.email.trim();

    if (!email) {
      console.log("email is required");
      return;
    }
    if (!isLoading && email) {
      setIsLoading(true);
      if (inForgetPass) {
        PostForgetPass.mutate(email);
      } else {
        PostEmail.mutate(email);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <label htmlFor="email" className="text-right font-semibold">
        ایمیل
      </label>
      <input
        id="email"
        type="email"
        placeholder="ایمیل خود را وارد کنید"
        className={`text-right w-[390px] h-[48px] bg-[#F9F9F9] rounded-[31px] p-4 outline-none border ${
          errors.email ? "border-red-500" : "border-none"
        }`}
        {...register("email", {
          required: "ایمیل الزامی است",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "ایمیل معتبر وارد کنید",
          },
        })}
      />
      {errors.email && (
        <p className="text-red-500 text-sm text-right">
          {errors.email.message}
        </p>
      )}

      <Button
        isLoading={isLoading}
        disabled={isLoading}
        type="submit"
        className="bg-[#7575FE] hover:bg-[#6d6dfc] text-white rounded-[31px] h-[48px] w-[390px] mt-[8px]"
      >
        ارسال کد تایید
      </Button>
    </form>
  );
}

export default RegisterFormStepOne;
