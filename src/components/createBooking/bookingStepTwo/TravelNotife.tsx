import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import React from "react";
import check from "@/assets/createBooking/check.svg";
import Image from "next/image";
import { formatNumberToPersian } from "../../../utils/hooks/formatNumberToPersian";
function TravelNotife() {
  return (
    <div
      className="
    bg-white dark:bg-gray-800 
    rounded-[24px] 
    px-4 py-4 sm:px-6 sm:py-6
    flex flex-col gap-6 sm:gap-8
    transition-colors duration-300
  "
    >
      <h1 className="text-[20px] sm:text-[24px] font-[700] text-gray-900 dark:text-gray-100">
        کد تخفیف
      </h1>

      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
        {/* بخش ورودی کد تخفیف */}
        <div className="flex flex-col gap-2 sm:gap-4 w-full sm:w-auto">
          <label className="text-gray-700 dark:text-gray-300 text-[14px] sm:text-[16px]">
            کد تخفیف
          </label>

          <div className="rounded-full overflow-hidden w-full sm:w-[300px]">
            <Input
              placeholder="کد تخفیف را وارد کنید"
              className="
            rounded-full
            bg-gray-100 dark:bg-gray-700
            text-gray-800 dark:text-gray-100
            placeholder:text-gray-400 dark:placeholder:text-gray-300
            transition-colors duration-300
            w-full
          "
            />
          </div>
        </div>

        {/* دکمه اعمال کد تخفیف */}
        <div className="flex justify-end sm:items-end">
          <Button
            className="
          w-full sm:w-auto
          flex flex-row gap-2 
          border border-[#7575FE] dark:border-indigo-400 
          bg-white dark:bg-gray-700 
          hover:bg-gray-100 dark:hover:bg-gray-600
          text-[#7575FE] dark:text-indigo-400
          transition-colors duration-300
          rounded-[16px] px-4 py-2
          text-[14px] sm:text-[16px]
        "
          >
            <Image src={check} alt="icon" width={20} height={20} />
            <p>اعمال کد تخفیف</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TravelNotife;
