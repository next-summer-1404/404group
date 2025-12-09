// components/Slider/PrevArrow.tsx
import Image from "next/image";
import React from "react";
import prevArrowBlack from "@/assets/landing/prevArrowBlack.svg";

interface PrevArrowProps {
  onClick?: () => void;
}

const PrevArrow: React.FC<PrevArrowProps> = ({ onClick }) => {
  return (
    <div
      className=" size-[56px] p-4 absolute -left-7 top-[50%] -translate-y-1/2 cursor-pointer z-10  bg-[#F9F9F9]  rounded-full hover:bg-[#d2d2d2] transition"
      onClick={onClick}
    >
      <Image src={prevArrowBlack} alt=">" width={24} height={24} />
    </div>
  );
};

export default PrevArrow;
