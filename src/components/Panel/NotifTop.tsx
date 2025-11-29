"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import NotifictionModal from "./NotifModal";

const TopNotifiction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="
    p-3 text-right h-auto rounded-2xl 
    bg-white dark:bg-gray-900
    transition-colors duration-300
  "
    >
      <div
        className="
      h-auto 
      flex flex-col md:flex-row 
      items-start md:items-center 
      justify-between 
      gap-4 md:gap-0
    "
      >
        <p className="font-medium text-xl text-black dark:text-white">
          لیست اعلان‌های شما
        </p>

        <div
          className="
        flex flex-col md:flex-row 
        items-start md:items-center 
        gap-4 md:gap-6
        w-full md:w-auto
      "
        >
          {/* نوع اعلان */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">
              نوع اعلان:
            </label>

            <div className="relative w-full md:w-[180px]">
              <select
                className="
              w-full rounded-2xl
              bg-gray-200 dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              text-gray-600 dark:text-gray-200
              text-sm pl-8 pr-3 py-2
              outline-none appearance-none
              transition-all duration-200
            "
              >
                <option>همه</option>
                <option>خوانده شده</option>
                <option>خوانده نشده</option>
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

          {/* دکمه */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="
          bg-green-400 dark:bg-green-500 
          hover:bg-green-500 dark:hover:bg-green-400
          active:scale-95
          text-gray-900 dark:text-gray-900
          rounded-2xl px-6 py-2
          text-sm font-semibold
          transition-all
          w-full md:w-auto
        "
          >
            علامت‌گذاری به عنوان خوانده شده
          </button>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-400 dark:border-gray-700 mt-4" />

      <NotifictionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default TopNotifiction;
