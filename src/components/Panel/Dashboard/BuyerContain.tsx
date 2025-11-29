"use client";

import React, { useEffect, useState } from "react";
import { BookmarkIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Arrow from "../../../assets/dash/Group 34.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UsersTypes } from "@/types/panel/UsersTypes";
import Cookies from "js-cookie";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getUsers } from "@/services/api/Dash/getUsers";

ChartJS.register(ArcElement, Tooltip, Legend);

const BuyerContain = () => {
  const [percentage, setPercentage] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UsersTypes | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [addedCount, setAddedCount] = useState<number>(35);
  const [notAddedCount, setNotAddedCount] = useState<number>(65);

  useEffect(() => {
    const id = Cookies.get("userId");
    setUserId(id ?? null);
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchUserInfo = async () => {
      try {
        const res = await getUsers(userId);
        setUserInfo(res);
        const completion = res?.additionalPercentage ?? 0;
        setPercentage(completion);
      } catch (err) {
        console.error("خطا در دریافت وضعیت پروفایل:", err);
      }
    };
    fetchUserInfo();
  }, [userId]);

  const chartData = {
    labels: ["افزوده‌شده به علاقه‌مندی‌ها", "افزوده‌نشده"],
    datasets: [
      {
        data: [addedCount, notAddedCount],
        backgroundColor: ["#8CFF45", "#FF4D4D"],
        borderColor: "#222",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#DDD",
          font: {
            family: "IRANSans",
            size: 13,
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 w-full h-auto">
      {/* کارت چپ - نمودار علاقه‌مندی */}
      <div
        className="
      flex-1 
      bg-white dark:bg-gray-700 
      rounded-2xl shadow-md
      transition-colors duration-300
    "
      >
        <div className="h-14 flex items-center px-3 gap-2 pt-2">
          <BookmarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          <p className="text-gray-900 dark:text-gray-100 text-[15px]">
            نمودار علاقه‌مندی‌های شما
          </p>
        </div>

        <div className="border-t border-dashed border-gray-300 dark:border-gray-600 mb-2" />

        <div className="flex justify-center items-center p-5 h-[300px]">
          <div className="w-[220px] h-[220px] md:w-[250px] md:h-[250px]">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* کارت راست - وضعیت پروفایل */}
      <div
        className="
      flex-1 
      bg-white dark:bg-gray-700
      rounded-2xl px-3 pt-2 pb-4
      transition-colors duration-300
    "
      >
        <div className="flex items-center justify-between h-10 mb-2">
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <p className="text-gray-900 dark:text-gray-100 text-[15px]">
              وضعیت پروفایل شما
            </p>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <p className="text-gray-500 dark:text-gray-300 text-[15px]">
              ویرایش
            </p>
            <Image
              src={Arrow}
              width={50}
              height={16}
              alt=""
              className="opacity-70 dark:opacity-60"
            />
          </div>
        </div>

        <div className="border-t border-dashed border-gray-300 dark:border-gray-600 mb-4" />

        <div className="flex flex-col md:flex-row gap-4">
          {/* متن سمت چپ */}
          <div className="md:w-2/3 p-5 rounded-xl">
            <p className="text-3xl text-gray-500 dark:text-gray-300 font-bold">
              {percentage}%
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300 leading-8 mt-2">
              برای اینکه بازدید خوبی داشته باشید، پروفایل شما باید حداقل ۷۰٪
              تکمیل شده باشد.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-[12px] pt-10">
              آخرین تغییرات در چند دقیقه پیش
            </p>
          </div>

          {/* دایره درصد */}
          <div className="md:w-1/3 flex items-center justify-center p-4">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                textColor: "#AFAFAF",
                pathColor: "#8CFF45",
                trailColor: "#555",
                textSize: "24px",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerContain;
