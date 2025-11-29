"use client";
import React from "react";
import TravelInfo from "./bookingStepTwo/TravelInfo";
import SideCost from "./bookingStepTwo/SideCost";
import TravelNotife from "./bookingStepTwo/TravelNotife";
import { formatNumberToPersian } from "../../utils/hooks/formatNumberToPersian";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

function CreateBookingStepTwoContainer() {
  const router = useRouter();
  return (
    <div
      className="
    rounded-[24px] 
    bg-gray-100 dark:bg-gray-900 
    px-4 sm:px-6 md:px-8 
    py-6 sm:py-8 
    flex flex-col gap-6 sm:gap-8 
    transition-colors duration-300
  "
    >
      <TravelInfo />
      <SideCost />
      <TravelNotife />

      {/* قیمت کل */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span className="text-[20px] sm:text-[24px] font-[700] text-gray-900 dark:text-gray-100">
          قیمت کل :
        </span>

        <span className="text-[28px] sm:text-[32px] font-[700] text-[#7575FE] dark:text-indigo-400 flex items-center">
          {formatNumberToPersian(12200000)}
        </span>

        <span className="text-[16px] sm:text-[20px] font-[400] text-[#7575FE] dark:text-indigo-400 flex items-center">
          تومان
        </span>
      </div>

      {/* دکمه‌ها */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-4">
        <Button
          onClick={() => router.push("/createBooking/step1")}
          className="
        w-full sm:w-[123px] h-[48px] sm:h-[59px]
        bg-transparent dark:bg-transparent
        border border-gray-500 dark:border-gray-400
        text-gray-700 dark:text-gray-300
        rounded-[16px] text-[16px] sm:text-[20px]
        transition-colors duration-300
      "
        >
          مرحله قبل
        </Button>

        <Button
          onClick={() => router.push("/createBooking/step4")}
          className="
        w-full sm:w-[153px] h-[48px] sm:h-[59px]
        bg-[#7575FE] dark:bg-indigo-500
        text-white dark:text-gray-100
        rounded-[16px] text-[16px] sm:text-[20px]
        transition-colors duration-300
      "
        >
          پرداخت آنلاین
        </Button>
      </div>
    </div>
  );
}

export default CreateBookingStepTwoContainer;
