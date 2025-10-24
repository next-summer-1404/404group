"use client";

import { Button } from "@heroui/button";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";

// 📦 برای تقویم شمسی و زبان فارسی
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import toast from "react-hot-toast";
import { useReserve } from "../../context/ReserveContext";
import { useRouter } from "next/navigation";

function ReserveNowBox({ property }: any) {
  const { checkIn, setCheckIn, checkOut, setCheckOut, guests, setGuests } =
    useReserve();

  const router = useRouter();

  const handleReserve = () => {
    if (!checkIn || !checkOut || !guests) {
      toast.error("لطفاً همه فیلدها را پر کنید ");
      return;
    }

    console.log("📅 تاریخ ورود:", checkIn?.format?.());
    console.log("📅 تاریخ خروج:", checkOut?.format?.());
    console.log("👥 تعداد نفرات:", guests);
    router.push("/createBooking/step1");
  };

  return (
    <div className="bg-white shadow-md p-5 rounded-2xl">
      <h3 className="font-bold text-lg text-[#7575FE] mb-4">
        همین حالا رزرو کنید
      </h3>

      <div className="flex flex-row flex-wrap justify-between gap-[25px]">
        {/* تاریخ ورود */}
        <div className="flex flex-col  w-[45%]">
          <label className="text-sm text-gray-600 mb-1">تاریخ ورود</label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={checkIn}
            onChange={(date) => {
              setCheckIn(date);
              // اگر تاریخ خروج قبل از تاریخ ورود باشد، آن را خالی کن
              if (checkOut && date && checkOut < date) {
                setCheckOut(null);
              }
            }}
            calendarPosition="bottom-right"
            placeholder="انتخاب تاریخ ورود"
            inputClass="custom-input"
            style={{
              width: "100%",
              height: "48px",
              borderRadius: "31px",
              padding: "8px",
              background: "#F9F9F9",
            }}
          />
        </div>

        {/* تاریخ خروج */}
        <div className="flex flex-col  w-[45%]">
          <label className="text-sm text-gray-600 mb-1">تاریخ خروج</label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={checkOut}
            onChange={setCheckOut}
            minDate={checkIn || undefined} // ✅ محدود کردن حداقل تاریخ خروج به تاریخ ورود
            disabled={!checkIn} // اگر تاریخ ورود هنوز انتخاب نشده، غیرفعال باشه
            calendarPosition="bottom-right"
            placeholder="انتخاب تاریخ خروج"
            inputClass="custom-input"
            style={{
              width: "100%",
              height: "48px",
              borderRadius: "31px",
              padding: "8px",
              background: "#F9F9F9",
            }}
          />
        </div>

        {/* تعداد نفرات */}
        <div className="flex flex-col  w-[45%]">
          <label className="text-sm text-gray-600 mb-1">تعداد نفرات</label>
          <input
            min={1}
            type="number"
            placeholder="مثلاً ۲ نفر"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-[100%] h-[44px] mt-1 p-4   bg-[#F9F9F9] rounded-[31px] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* قیمت */}
        <div className="flex items-end text-sm text-gray-600 pb-2  w-[45%]">
          قیمت هر شب از{" "}
          <span className="font-bold text-primary mr-1">
            {property?.price?.toLocaleString("fa-IR") || 0} تومان
          </span>
        </div>
      </div>

      {/* دکمه رزرو */}
      <div className="mt-5 ">
        <Button
          onClick={handleReserve}
          className="w-full bg-[#7575FE] rounded-[32px] text-white"
        >
          همین الان رزرو کن
        </Button>
      </div>
    </div>
  );
}

export default ReserveNowBox;
