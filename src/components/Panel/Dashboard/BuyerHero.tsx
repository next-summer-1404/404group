import React, { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Arrow from "../../../assets/dash/Group 34.png";
import { DashboardSummary } from "@/types/panel/DashboardSummary";
import { getSummeryStatic } from "@/services/api/Dash/getSummeryStatic";

const BuyerHero = () => {
  const [data, setData] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSummeryStatic();
      setData(response);
    };
    fetchData();
  }, []);
  const cards = [
    { id: 1, title: "کل رزرو ها ", value: data?.bookings.bookingCount },
    { id: 2, title: "رزرو های فعال ", value: data?.bookings.conformedBookings },
    {
      id: 3,
      title: "رزرو های پرداخت نشده ",
      value: data?.bookings.canceledBookings,
    },
    { id: 4, title: "علاقه مندی ها ", value: data?.bookings.pendingBookings },
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
          {/* Header */}
          <div className="flex items-start relative p-4">
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

          {/* عنوان */}
          <div className="text-[16px] font-medium text-gray-800 dark:text-gray-100 mt-14 px-3">
            {item.title}
          </div>

          {/* خط جداکننده */}
          <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-2" />

          {/* Footer */}
          <div className="flex justify-between items-center px-3 pb-3">
            <button className="text-[16px] font-medium text-gray-500 dark:text-gray-300">
              مشاهده
            </button>
            <Image
              src={Arrow}
              width={50}
              height={16}
              alt=""
              className="rotate-0 opacity-80 dark:opacity-70"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyerHero;
