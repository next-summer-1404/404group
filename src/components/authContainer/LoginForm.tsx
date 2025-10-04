"use client";
import { Button } from "@heroui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Login } from "../../services/api/auth/login/Login";
import Cookies from "js-cookie";
import Link from "next/link";
interface LoginFormValues {
  email: string;
  password: string;
}

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const PostLogin = useMutation({
    mutationFn: (data: LoginFormValues) =>
      fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: (response) => {
      setIsLoading(false);
      if (response.success) {
        toast.success("خوش آمدید !");

        // ذخیره در کلاینت
        Cookies.set("accessToken", response.accessToken, {
          expires: 1,
          path: "/",
          secure: true,
          sameSite: "strict",
        });

        Cookies.set("refreshToken", response.refreshToken, {
          expires: 1,
          path: "/",
          secure: true,
          sameSite: "strict",
        });

        router.push("/");
      }
    },
    onError: (error: any) => {
      setIsLoading(false);
      toast.error(error.message || "خطایی رخ داده است");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    if (data) {
      setIsLoading(true);
      PostLogin.mutate({ email: data.email, password: data.password });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
      <div className="flex justify-between  pl-5">
        <label htmlFor="password" className="text-right font-semibold">
          رمز عبور
        </label>
        <span>
          <Link
            className="text-blue-600 hover:underline mr-1 font-light"
            href={"/forgetPassword/step1"}
          >
            فراموشی رمز عبور{" "}
          </Link>
        </span>
      </div>

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

      <Button
        isLoading={isLoading}
        disabled={isLoading}
        type="submit"
        className="bg-[#7575FE] hover:bg-[#6d6dfc] text-white rounded-[31px] h-[48px] w-[390px] mt-[8px]"
      >
        ورود به حساب
      </Button>
    </form>
  );
}

export default LoginForm;
