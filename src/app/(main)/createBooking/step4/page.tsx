"use client";
import React from "react";
import Stepper from "../../../../components/createBooking/Stepper";
import Image from "next/image";
import imageComplate from "@/assets/createBooking/imageComplate.png";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

function CreateBookingStepFour() {
  const router = useRouter();
  return (
    <div>
      <Stepper stepNumber={5} />
      <div className="w-[652px] h-[623px]  flex flex-col gap-[32px] mx-auto mt-[61px]">
        <div className="flex justify-center">
          <Image src={imageComplate} alt="image" width={500} height={500} />
        </div>
        <div className="flex justify-between">
          <Button
            onClick={() => {
              router.push("/");
            }}
            className="w-[228px] h-[59px] bg-[transparent] border border-[#777777] text-[#777777] rounded-[16px] text-[20px]"
          >
            بازگشت به صفحه اصلی
          </Button>
          <Button
            onClick={() => {
              router.push("/");
            }}
            className="w-[144px] h-[59px] bg-[#7575FE] text-[white] rounded-[16px] text-[20px]"
          >
            بلیط های من
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateBookingStepFour;
