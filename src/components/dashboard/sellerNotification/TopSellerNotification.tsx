"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import SellerNotificationModal from "./SellerNotificationModal";

const TopSellerNotification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="
    p-3 
    text-right 
    h-auto 
    rounded-2xl
    bg-white dark:bg-gray-900
    transition-colors duration-300
  "
    >
      {/* Header */}
      <div className="min-h-20 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-medium text-xl text-black dark:text-white">
          لیست اعلان‌های شما
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Select box */}
          <div className="flex items-center gap-2">
            <label className="text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">
              نوع اعلان:
            </label>
            <div className="relative">
              <select
                className="
              w-[180px] 
              rounded-2xl
              bg-gray-200 dark:bg-gray-800
              text-gray-600 dark:text-gray-200
              text-sm 
              pl-8 pr-3 py-2
              outline-none 
              appearance-none
              border border-gray-300 dark:border-gray-700
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
              text-[#888] dark:text-gray-400 
              absolute left-3 top-1/2 -translate-y-1/2 
              pointer-events-none
            "
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="
          bg-[#8CFF45] 
          text-[#393939]
          rounded-2xl 
          px-6 py-2
          text-sm font-semibold
          hover:bg-[#aaff6b] 
          active:scale-95
          transition-all
        "
          >
            علامت‌گذاری به عنوان خوانده شده
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-400 dark:border-gray-700 mt-2" />

      {/* Modal */}
      <SellerNotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default TopSellerNotification;
