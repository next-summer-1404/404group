"use client";
import { useRouter } from "next/navigation";
import React from "react";
interface IPropsRedirectButton {
  Link: string;
  title: string;
}
function RedirectButton({ Link, title }: IPropsRedirectButton) {
  const router = useRouter();
  return (
    <button
      className=" bg-[#F0F0F0] w-[110px] sm:w-[135px] h-[40px] rounded-[100px]  text-center text-sm "
      onClick={() => router.push(Link)}
      aria-label="بازگشت به صفحه اصلی"
    >
      {title}
      {" > "}
    </button>
  );
}

export default RedirectButton;
