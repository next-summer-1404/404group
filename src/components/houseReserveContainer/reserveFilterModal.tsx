"use client";
import { Button } from "@heroui/button";
import Image from "next/image";
import React, { useState } from "react";
import trash from "@/assets/houseReserve/trash.svg";

export default function SlideDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* دکمه باز کردن */}
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="bg-[#7575FE] rounded-full  z-9 w-[93px] h-[48px]  text-white"
      >
        فیلتر ها{" "}
      </Button>
      {/* پس‌زمینه تار وقتی پنل باز است */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* دایو کشویی از سمت راست */}
      <div
        className={`pt-[24px] pr-[56px] pl-[36px] rounded-tl-[32px] rounded-bl-[32px] fixed top-65 right-0 h-[649px] w-[540px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className=" font-[700] text-[#1E1E1E] text-[20px]">فیلترها</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-800 flex flex-row flex-nowrap gap-0"
            >
              <div className=" size-[24px] p-0.5">
                <Image src={trash} alt="trash" width={20} height={20} />
              </div>
              <h1 className="text-[#FF5555] font-[600] text-[14px]">
                حذف همه{" "}
              </h1>
            </button>
          </div>

          <div className="mt-6">
            <p>اینجا محتوای فیلترها یا هر چیزی که بخوای میاد.</p>
            <p className="mt-4">
              می‌تونی فرم، دکمه، ورودی و هر چیزی اضافه کنی.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
