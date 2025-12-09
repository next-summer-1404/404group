"use client";
import React, { useEffect, useState } from "react";
import nextArrowBlack from "@/assets/landing/nextArrowBlack.svg";
import nextArrowWhite from "@/assets/landing/nextArrowWhite.svg";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useIsDark } from "../../../../utils/hooks/useIsDark";

interface NextArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<NextArrowProps> = ({ onClick }) => {
  const isDark = useIsDark();
  console.log(isDark);
  return (
    <div
      className="w-[56px] h-[56px] p-4 absolute right-2 top-[50%] -translate-y-1/2 cursor-pointer z-10 bg-[#F9F9F9] rounded-full hover:bg-[#d2d2d2] transition dark:bg-indigo-300"
      onClick={onClick}
    >
      <Image src={nextArrowBlack} alt=">" width={24} height={24} />
    </div>
  );
};

export default NextArrow;
