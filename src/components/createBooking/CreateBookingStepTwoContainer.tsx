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
    <div className="rounded-[24px] bg-[#F5F5F5]  px-[16px] py-[32px] flex flex-col gap-[32px]">
      <TravelInfo />
      <SideCost />
      <TravelNotife />{" "}
      <div className="h-[44px] flex flex-row gap-2 ">
        <span className="text-[24px] text-[#1E2022] font-[700] ">
          قیمت کل :
        </span>
        <span className="text-[32px] text-[#7575FE] font-[700]  flex items-center">
          {formatNumberToPersian(12200000)}
        </span>{" "}
        <span className="text-[20px] text-[#7575FE] font-[400] flex items-center ">
          تومان
        </span>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            router.push("/createBooking/step1");
          }}
          className="w-[123px] h-[59px] bg-[transparent] border border-[#777777] text-[#777777] rounded-[16px] text-[20px]"
        >
          مرحله قبل
        </Button>
        <Button
          onClick={() => {
            router.push("/createBooking/step4");
          }}
          className="w-[153px] h-[59px] bg-[#7575FE] text-[white] rounded-[16px] text-[20px]"
        >
          پرداخت آنلاین
        </Button>
      </div>
    </div>
  );
}

export default CreateBookingStepTwoContainer;
