"use client";
// import FainanceTable from "@/components/dashboard/financialManagement/FainanceTable";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

const TopPayment = () => {
  return (
    <div className="p-3 text-right h-auto rounded-2xl bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="h-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <p className="md:w-1/2 font-[500] text-xl text-black dark:text-white">
          لیست تراکنش‌های مشتریان
        </p>

        {/* فیلترها */}
        <div className="flex flex-col md:flex-row justify-between items-center md:w-1/2 w-full gap-4">
          {/* نوع تراکنش */}
          <div className="flex flex-col items-start text-right w-full relative">
            <label className="text-gray-600 dark:text-gray-300 text-sm mb-1">
              نوع تراکنش:
            </label>
            <div className="relative w-full">
              <select
                className="
              w-full rounded-2xl
              bg-gray-200 dark:bg-gray-800 
              text-gray-600 dark:text-gray-200
              border border-gray-300 dark:border-gray-700
              text-sm pl-8 pr-3 py-2
              outline-none appearance-none
              transition-all duration-200
            "
              >
                <option>رزرو</option>
                <option>شارژ کیف پول</option>
              </select>

              <ChevronDownIcon
                className="
              w-5 h-5 
              text-gray-500 dark:text-gray-300 
              absolute left-3 top-1/2 -translate-y-1/2 
              pointer-events-none
            "
              />
            </div>
          </div>

          {/* وضعیت پرداخت */}
          <div className="flex flex-col items-start text-right w-full relative">
            <label className="text-gray-600 dark:text-gray-300 text-sm mb-1">
              وضعیت پرداخت:
            </label>
            <div className="relative w-full">
              <select
                className="
              w-full rounded-2xl
              bg-gray-200 dark:bg-gray-800 
              text-gray-600 dark:text-gray-200
              border border-gray-300 dark:border-gray-700
              text-sm pl-8 pr-3 py-2
              outline-none appearance-none
              transition-all duration-200
            "
              >
                <option>تایید شده</option>
                <option>تایید نشده</option>
              </select>

              <ChevronDownIcon
                className="
              w-5 h-5 
              text-gray-500 dark:text-gray-300 
              absolute left-3 top-1/2 -translate-y-1/2 
              pointer-events-none
            "
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-400 dark:border-gray-700 mt-4" />

      {/* <FainanceTable /> */}
    </div>
  );
};

export default TopPayment;
