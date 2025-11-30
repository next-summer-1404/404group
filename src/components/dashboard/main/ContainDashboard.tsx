"use client";
import React, { useEffect, useState } from "react";
import { UserIcon, WindowIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Cookies from "js-cookie";
import Arrow from "../../../assets/dash/Group 34.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UsersTypes } from "@/types/panel/UsersTypes";
import { DashboardSummary } from "@/types/panel/DashboardSummary";
import { getUsers } from "@/services/api/Dash/getUsers";
import { getSummeryStatic } from "@/services/api/Dash/getSummeryStatic";

const ContainDashboard = () => {
  const [percentage, setPercentage] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UsersTypes | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    const id = Cookies.get("userId");
    setUserId(id ?? null);
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchUserInfo = async () => {
      try {
        const res = await getUsers(userId);
        console.log(res);
        setUserInfo(res);
        setPercentage(res?.additionalPercentage ?? 0);
      } catch (err) {
        console.error("خطا در دریافت وضعیت پروفایل:", err);
      }
    };
    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSummeryStatic();
        setSummary(res);
      } catch (error) {
        console.error("خطا در دریافت آمار داشبورد:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full h-auto">
      {/* بخش آمار کاربران */}
      <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-md transition-colors duration-300">
        <div className="h-14 flex items-center px-3 gap-2 pt-2">
          <WindowIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <p className="text-black dark:text-white text-[15px]">آمار کاربران</p>
        </div>

        <div className="border-t border-dashed border-gray-300 dark:border-gray-700" />

        <div className="flex flex-col gap-3 px-5 py-4 text-right">
          {summary ? (
            <>
              {/* کل کاربران */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500" />
                  <p className="text-gray-500 dark:text-gray-300 text-[15px]">
                    تعداد کل کاربران
                  </p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-green-400 dark:bg-green-500 text-gray-900 text-[15px] font-semibold">
                  {summary.users.userCount.toLocaleString("fa-IR")}
                </div>
              </div>

              {/* فروشندگان */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500" />
                  <p className="text-gray-500 dark:text-gray-300 text-[15px]">
                    فروشندگان
                  </p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white text-[15px] font-semibold">
                  {summary.users.sellers.toLocaleString("fa-IR")}
                </div>
              </div>

              {/* خریداران */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500" />
                  <p className="text-gray-500 dark:text-gray-300 text-[15px]">
                    خریداران
                  </p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-green-400 dark:bg-green-500 text-gray-900 text-[15px] font-semibold">
                  {summary.users.buyers.toLocaleString("fa-IR")}
                </div>
              </div>

              {/* ادمین‌ها */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500" />
                  <p className="text-gray-500 dark:text-gray-300 text-[15px]">
                    ادمین‌ها
                  </p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white text-[15px] font-semibold">
                  {summary.users.admins.toLocaleString("fa-IR")}
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-400 dark:text-gray-500 text-sm text-center">
              در حال بارگذاری...
            </p>
          )}
        </div>
      </div>

      {/* وضعیت پروفایل */}
      <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl px-3 pt-2 pb-4 shadow-md transition-colors duration-300">
        <div className="flex items-center justify-between h-10 mb-2">
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <p className="text-black dark:text-white text-[15px]">
              وضعیت پروفایل شما
            </p>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <p className="text-gray-400 dark:text-gray-300 text-[15px]">
              ویرایش
            </p>
            <Image src={Arrow} width={50} height={16} alt="" />
          </div>
        </div>

        <div className="border-t border-dashed border-gray-300 dark:border-gray-700 mb-4" />

        <div className="flex flex-col md:flex-row gap-4">
          {/* متن */}
          <div className="w-full md:w-2/3 p-5 rounded-xl">
            <p className="text-3xl text-gray-700 dark:text-gray-200 font-bold">
              {percentage}%
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-8 mt-2">
              برای اینکه بازدید خوبی داشته باشید، پروفایل شما باید حداقل ۷۰٪
              تکمیل شده باشد.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-[12px] pt-10">
              آخرین تغییرات در چند دقیقه پیش
            </p>
          </div>

          {/* نمودار */}
          <div className="w-full md:w-1/3 rounded-xl flex items-center justify-center p-4">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                textColor: "#e5e7eb",
                pathColor: "#22c55e",
                trailColor: "#374151",
                textSize: "24px",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainDashboard;
