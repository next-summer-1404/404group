"use client";
import React, { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Arrow from "../../../assets/dash/Group 34.png";
import { getSummeryStatic } from "@/services/api/Dash/getSummeryStatic";
import { DashboardSummary } from "@/types/panel/DashboardSummary";
// import { getSummeryStatic } from "@/utils/service/api/getSummeryStatic";
// import { DashboardSummary } from "@/types/DashboardSummary";

const HeroDashboard = () => {
  const [data, setData] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSummeryStatic();
      setData(response);
    };
    fetchData();
  }, []);

  const cards = [
    { id: 1, title: "بازدید های امروز", value: data?.bookings.bookingCount },
    {
      id: 2,
      title: "رزرو های در انتظار",
      value: data?.bookings.conformedBookings,
    },
    { id: 3, title: "رزرو های فعال", value: data?.bookings.canceledBookings },
    { id: 4, title: "کل املاک ها", value: data?.bookings.pendingBookings },
  ];

  return (
    <div className="flex flex-wrap md:flex-nowrap mx-2 gap-4 w-full mb-5">
      {cards.map((item) => (
        <div
          key={item.id}
          className="
        w-full md:w-1/4
        h-auto 
        ml-2
        bg-white dark:bg-gray-700
        rounded-2xl 
        flex flex-col justify-between 
        text-right 
        shadow-sm
        transition-colors duration-300
      "
        >
          <div className="flex justify-baseline items-start relative ">
            <PaperClipIcon
              className="
            w-10 h-12 p-2 
            text-gray-800 dark:text-gray-100
            bg-gray-200 dark:bg-gray-600
            absolute top-0 right-4 
            rounded-b-2xl
            transition-colors duration-300
          "
            />
            <div className="flex items-center gap-1 ">
              <span
                className="
            text-[18px] font-medium 
            text-gray-500 dark:text-gray-300
            absolute top-4 right-16
          "
              >
                {item.value}
              </span>
            </div>
          </div>

          {/* عنوان */}
          <div className="text-[16px] font-medium text-black mt-14 p-2">
            {item.title}
          </div>

          <div className="border-t border-dashed border-gray-300  mb-[2px]" />

          <div className="flex justify-between items-center p-2">
            <button className="text-[16px] text-[#AAA] font-medium">
              مشاهده
            </button>
            <div className="flex items-center gap-1 text-gray-500">
              <Image
                src={Arrow}
                width={50}
                height={16}
                alt=""
                className="rotate-0 text-[#AAAA] "
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroDashboard;
