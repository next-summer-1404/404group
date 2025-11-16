"use client";

import { Button } from "@heroui/button";
import React from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useReserve } from "../../context/ReserveContext";
import { useRouter } from "next/navigation";
import { formatNumberToPersian } from "../../utils/hooks/formatNumberToPersian";

// 📦 دینامیک ایمپورت برای جلوگیری از خطای hydration
const DatePicker = dynamic(() => import("react-multi-date-picker"), {
  ssr: false,
});

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Property } from "../../types/HouseReserve/HouseReserveType";

function ReserveNowBox({ property }: { property: Property }) {
  const {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
    setPrice,
    setDiscountPrice,
    setAddress,
    setTitle,
    setPhoto,
    setId,
  } = useReserve();

  const router = useRouter();

  const handleReserve = () => {
    if (!checkIn || !checkOut || !guests) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }
    console.log(property);

    setPrice(Number(property?.price));
    setDiscountPrice(Number(property?.discounted_price));
    setAddress(property?.address);
    setTitle(property?.title);
    setPhoto(property?.photos?.[0]);
    setId(property?.id);
    router.push("/createBooking/step1");
  };

  return (
    <div className="bg-white shadow-md p-5 rounded-2xl">
      <h3 className="font-bold text-lg text-[#7575FE] mb-4">
        همین حالا رزرو کنید
      </h3>

      <div className="flex flex-row flex-wrap justify-between gap-[25px]">
        {/* تاریخ ورود */}
        <div className="flex flex-col w-[45%]">
          <label className="text-sm font-[600] text-gray-600 mb-1">
            تاریخ ورود
          </label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={checkIn}
            onChange={(date: any) => {
              const selectedDate =
                Array.isArray(date) && date.length > 0 ? date[0] : date ?? null;
              setCheckIn(selectedDate as any); // ✅ اینجا تایپ را تبدیل می‌کنیم
              if (checkOut && selectedDate && checkOut < selectedDate) {
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
        <div className="flex flex-col w-[45%]">
          <label className="text-sm font-[600] text-gray-600 mb-1">
            تاریخ خروج
          </label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={checkOut}
            onChange={setCheckOut}
            minDate={checkIn || undefined}
            disabled={!checkIn}
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
        <div className="flex flex-col w-[45%]">
          <label className="text-sm font-[600] text-gray-600 mb-1">
            تعداد نفرات
          </label>
          <input
            min={1}
            type="number"
            placeholder="مثلاً ۲ نفر"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full h-[44px] mt-1 p-4 bg-[#F9F9F9] rounded-[31px] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* قیمت */}
        <div className="flex flex-col gap-4 w-[45%]">
          <label className="text-sm font-[600] text-[#7575FE] mb-1">
            مجموع قیمت
          </label>
          <div className="flex justify-between">
            <div className="text-[#A6A6A6] text-[20px] font-[700] relative">
              {formatNumberToPersian(Number(property?.discounted_price))}
              <div className="absolute border border-[#FF5555] w-full -rotate-12 top-1/2" />
            </div>
            <div className="text-[#1E1E1E] text-[20px] font-[700]">
              {formatNumberToPersian(property?.price)}
            </div>
          </div>
        </div>
      </div>

      {/* دکمه رزرو */}
      <div className="mt-5">
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
