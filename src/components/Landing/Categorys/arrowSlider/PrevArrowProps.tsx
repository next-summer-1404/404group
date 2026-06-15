// components/Slider/PrevArrow.tsx
import Image from "next/image";
import React from "react";
import prevArrowBlack from "@/assets/landing/prevArrowBlack.svg";
import prevArrowWhite from "@/assets/landing/prevArrowWhite.svg";
import { useIsDark } from "../../../../utils/hooks/useIsDark";
import { useTheme } from "next-themes";

interface PrevArrowProps {
  onClick?: () => void;
}

const PrevArrow: React.FC<PrevArrowProps> = ({ onClick }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className="z-10 size-[56px] p-4 absolute -left-7 top-[50%] -translate-y-1/2 cursor-pointer   bg-[#F9F9F9]  rounded-full dark:bg-indigo-300 hover:bg-[#d2d2d2] transition"
      onClick={onClick}
    >
      {resolvedTheme === "dark" ? (
        <Image src={prevArrowWhite} alt=">" width={24} height={24} />
      ) : (
        <Image src={prevArrowBlack} alt=">" width={24} height={24} />
      )}
    </div>
  );
};

export default PrevArrow;
