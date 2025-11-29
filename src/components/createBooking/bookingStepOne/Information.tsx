"use client";
import { Button } from "@heroui/button";
import Image from "next/image";
import React from "react";
import imageStepOne from "@/assets/createBooking/imageStepOne.jpg";
import calender from "@/assets/createBooking/calender.svg";
import loc from "@/assets/createBooking/loc.svg";
import hotelBlue from "@/assets/createBooking/hotelBlue.svg";
import { useReserve } from "../../../context/ReserveContext";
import { formatNumberToPersian } from "../../../utils/hooks/formatNumberToPersian";
import { log } from "console";

function Information() {
  const { price, discountPrice, checkIn, checkOut, address, title, photo } =
    useReserve();

  return (
    // <div className="h-[190px] bg-[white] rounded-[24px] border border-[#DDDDDD] flex justify-between p-[16px]">
    //   <div className=" w-[50%] flex flex-row gap-[16px]">
    //     <div className=" w-[250px] h-[156px] overflow-hidden rounded-[16px] relative">
    //       {" "}
    //       <Image
    //         src={photo || imageStepOne}
    //         alt="image"
    //         width={250}
    //         height={158}
    //         className="object-cover rounded-[16px] -top-20 relative "
    //       />
    //     </div>
    //     <div className=" w-[445px] flex flex-col gap-[16px] ">
    //       <h1>{title || "نام نامشخص"}</h1>
    //       <div className="flex flex-row flex-nowrap gap-[4px]">
    //         <div className="flex justify-center items-center">
    //           <Image
    //             src={calender}
    //             alt="calender"
    //             width={16}
    //             height={16}
    //             className="object-cover  "
    //           />
    //         </div>
    //         <p className="text-[#777777] text-[16px] font-[400]">
    //           تاریخ ورود :
    //         </p>
    //         <p className="text-[#1E2022] text-[16px] font-[400] mr-[4px]">
    //           {checkIn ? checkIn.format("YYYY/MM/DD") : "تاریخ مشخص نیست"}
    //         </p>
    //       </div>
    //       <div className="flex flex-row flex-nowrap gap-[4px]">
    //         <div className="flex justify-center items-center">
    //           <Image
    //             src={calender}
    //             alt="calender"
    //             width={16}
    //             height={16}
    //             className="object-cover  "
    //           />
    //         </div>
    //         <p className="text-[#777777] text-[16px] font-[400]">
    //           تاریخ خروج :
    //         </p>
    //         <p className="text-[#1E2022] text-[16px] font-[400] mr-[4px]">
    //           {checkOut ? checkOut.format("YYYY/MM/DD") : "تاریخ مشخص نیست"}
    //         </p>
    //       </div>{" "}
    //       <div className="flex flex-row flex-nowrap gap-[4px]">
    //         <div className="flex justify-center items-center">
    //           <Image
    //             src={loc}
    //             alt="loc"
    //             width={16}
    //             height={16}
    //             className="object-cover  "
    //           />
    //         </div>
    //         <p className="text-[#777777] text-[16px] font-[400]">آدرس :</p>
    //         <p className="text-[#1E2022] text-[16px] font-[400] mr-[4px]">
    //           {address || "مکان نامشخص"}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    //   <div
    //     className=" w-[163px] flex flex-col gap-[8px]"
    //     style={{ direction: "ltr" }}
    //   >
    //     {discountPrice ? (
    //       <div className=" flex flex-row flex-nowrap gap-[8px]">
    //         <div className="bg-[#FF5555] rounded-[16px] w-[41px] h-[32px] text-[white] flex justify-center items-center">
    //           50%
    //         </div>{" "}
    //         <div className="text-[#777777] font-[700] text-[14px] flex flex-row flex-nowrap relative gap-[8px]">
    //           <span className="mt-1 font-[400]"> تومان</span>
    //           <div className="text-[20px]">
    //             <del>{formatNumberToPersian(discountPrice)}</del>
    //           </div>
    //         </div>{" "}
    //       </div>
    //     ) : (
    //       <div></div>
    //     )}
    //     <div className="text-[#1E2022] font-[700] text-[16px] flex flex-row flex-nowrap relative gap-[8px]">
    //       <span className="mt-1 font-[400]"> تومان</span>{" "}
    //       <div className="text-[24px]">{formatNumberToPersian(price)}</div>{" "}
    //     </div>
    //     <Button className="border border-[#0D3B66] w-[124px] h-[48px] rounded-[16px] p-[12px] bg-[white] mt-[20px]">
    //       <p className="text-[#0D3B66] font-[400] text-[16px] ">تغییر هتل</p>{" "}
    //       <div>
    //         <Image src={hotelBlue} alt="hotelBlue" width={24} height={24} />
    //       </div>
    //     </Button>
    //   </div>
    // </div>
    <div
      className="
    rounded-[24px]
    border border-gray-300 dark:border-gray-700
    bg-white dark:bg-gray-800
    p-4 sm:p-6 md:p-8
    flex flex-col md:flex-row justify-between gap-6
    transition-colors duration-300
  "
    >
      {/* LEFT SECTION */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-3/4">
        {/* IMAGE */}
        <div className="w-full md:w-[250px] h-[200px] overflow-hidden rounded-[16px] relative">
          <Image
            src={photo || imageStepOne}
            alt="image"
            fill
            className="object-cover rounded-[16px]"
          />
        </div>

        {/* TEXTS */}
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-gray-900 dark:text-gray-100 text-[18px] font-semibold">
            {title || "نام نامشخص"}
          </h1>

          {/* ورود */}
          <div className="flex items-center gap-1 text-sm">
            <Image src={calender} alt="calender" width={16} height={16} />
            <p className="text-gray-500 dark:text-gray-400">تاریخ ورود :</p>
            <p className="text-gray-800 dark:text-gray-200 mr-1">
              {checkIn ? checkIn.format("YYYY/MM/DD") : "تاریخ مشخص نیست"}
            </p>
          </div>

          {/* خروج */}
          <div className="flex items-center gap-1 text-sm">
            <Image src={calender} alt="calender" width={16} height={16} />
            <p className="text-gray-500 dark:text-gray-400">تاریخ خروج :</p>
            <p className="text-gray-800 dark:text-gray-200 mr-1">
              {checkOut ? checkOut.format("YYYY/MM/DD") : "تاریخ مشخص نیست"}
            </p>
          </div>

          {/* آدرس */}
          <div className="flex items-center gap-1 text-sm">
            <Image src={loc} alt="loc" width={16} height={16} />
            <p className="text-gray-500 dark:text-gray-400">آدرس :</p>
            <p className="text-gray-800 dark:text-gray-200 mr-1">
              {address || "مکان نامشخص"}
            </p>
          </div>
        </div>
      </div>

      {/* PRICE + BUTTON */}
      <div
        className="flex flex-col gap-2 w-full md:w-[163px]"
        style={{ direction: "ltr" }}
      >
        {discountPrice && (
          <div className="flex items-center gap-2">
            <div className="bg-red-500 rounded-[16px] w-[41px] h-[32px] text-white flex justify-center items-center text-sm">
              50%
            </div>
            <div className="text-gray-500 dark:text-gray-400 font-[700] text-[14px] flex gap-1">
              <span className="mt-[2px] font-[400]">تومان</span>
              <del className="text-[20px]">
                {formatNumberToPersian(discountPrice)}
              </del>
            </div>
          </div>
        )}

        {/* PRICE */}
        <div className="text-gray-900 dark:text-gray-100 font-[700] text-[16px] flex gap-1">
          <span className="mt-[2px] font-[400]">تومان</span>
          <div className="text-[24px]">{formatNumberToPersian(price)}</div>
        </div>

        {/* BUTTON */}
        <Button
          className="
        border border-[#0D3B66]
        w-full md:w-[124px]
        h-[48px] 
        rounded-[16px] 
        p-[12px]
        bg-white dark:bg-gray-700
        dark:text-gray-100
        mt-[12px]
        hover:bg-gray-100 dark:hover:bg-gray-600
        transition-colors duration-300
        flex items-center justify-center gap-2
      "
        >
          <p className="text-[#0D3B66] dark:text-indigo-300 font-[400] text-[16px]">
            تغییر هتل
          </p>
          <Image src={hotelBlue} alt="hotelBlue" width={24} height={24} />
        </Button>
      </div>
    </div>
  );
}

export default Information;
