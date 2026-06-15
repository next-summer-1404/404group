"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import FainanceTable from "./FainanceTable";

const ContainFainance = () => {
  return (
    <div className="p-3 text-right h-auto  mt-10 rounded-2xl ">
      <div className="h-20 flex items-center justify-between">
        <p className="w-1/2 font-[500] text-xl text-[#AAA]">
          لیست تراکنش‌های مشتریان
        </p>

        {/* فیلترها */}
        <div className="flex justify-between items-center w-1/2 gap-5">
          <div className="flex flex-col items-start text-right w-1/2 relative">
            <label className="text-[#AAAAAA] text-sm mb-1">نوع تراکنش:</label>
            <div className="relative w-full">
              <select
                className="
                  w-full rounded-2xl border border-[#555555]
                  bg-[#2b2b2b] text-[#CCCCCC]
                  text-sm pl-8 pr-3 py-2
                  outline-none appearance-none
                  transition-all duration-200
                "
              >
                <option>رزرو</option>
                <option>شارژ کیف پول</option>
              </select>
              <ChevronDownIcon
                className="w-5 h-5 text-[#888] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-start text-right w-1/2 relative">
            <label className="text-[#AAAAAA] text-sm mb-1">وضعیت پرداخت:</label>
            <div className="relative w-full">
              <select
                className="
                  w-full rounded-2xl border border-[#555555]
                  bg-[#2b2b2b] text-[#CCCCCC]
                  text-sm pl-8 pr-3 py-2
                  outline-none appearance-none
                  transition-all duration-200
                "
              >
                <option>تایید شده</option>
                <option>تایید نشده</option>
              </select>
              <ChevronDownIcon
                className="w-5 h-5 text-[#888] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-[#555] mt-2" />
      <FainanceTable/>

    </div>
  );
};

export default ContainFainance;
