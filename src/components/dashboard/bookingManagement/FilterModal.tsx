"use client";
import React from "react";
import {
  XMarkIcon,
  ChevronDownIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
};

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-200 dark:bg-gray-700 text-white rounded-2xl w-[480px] py-6 px-7 relative animate-fadeIn shadow-lg">
        {/* 🔸 هدر */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            فیلترها
          </h2>
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-[#FF4556] border border-[#FF4556] px-4 py-1.5 rounded-2xl hover:bg-[#FF4556] hover:text-white transition"
          >
            <XMarkIcon className="w-5 h-5" /> بستن
          </button>
        </div>

        {/* 🔹 فیلدهای تاریخ */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* تاریخ رفت */}
          <div className="relative">
            <label className="text-sm text-black dark:text-white block mb-1">
              تاریخ رفت:
            </label>
            <div className="relative">
              <select className="w-full rounded-xl border border-[#555] text-sm text-gray-500 py-2 pr-3 pl-8 appearance-none outline-none focus:ring-1 focus:ring-[#8CFF45]">
                <option className="bg-[#2a2a2a] text-[#AAA]">۱۴۰۳‑۰۵‑۰۲</option>
                <option className="bg-[#2a2a2a] text-[#AAA]">۱۴۰۳‑۰۵‑۰۳</option>
                <option className="bg-[#2a2a2a] text-[#AAA]">۱۴۰۳‑۰۵‑۰۴</option>
              </select>
              <ChevronDownIcon className="w-5 h-5 text-[#AAA] absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              <CalendarDaysIcon className="w-5 h-5 text-[#AAA] absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* تاریخ برگشت */}
          <div className="relative">
            <label className="text-sm text-black dark:text-white block mb-1">
              تاریخ برگشت:
            </label>
            <div className="relative">
              <select className="w-full rounded-xl border border-[#555] text-sm text-gray-500 py-2 pr-3 pl-8 appearance-none outline-none focus:ring-1 focus:ring-[#8CFF45]">
                <option className="bg-[#2a2a2a] text-[#AAA]">۱۴۰۳‑۰۵‑۰۲</option>
                <option className="bg-[#2a2a2a] text-[#AAA]">۱۴۰۳‑۰۵‑۰۳</option>
                <option className="bg-[#2a2a2a] text-[#AAA]">۱۴۰۳‑۰۵‑۰۴</option>
              </select>
              <ChevronDownIcon className="w-5 h-5 text-[#AAA] absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              <CalendarDaysIcon className="w-5 h-5 text-[#AAA] absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm text-black dark:text-white block mb-1">
            وضعیت رزرو:
          </label>
          <div className="relative">
            <select className="w-full rounded-xl border border-[#555] text-sm text-gray-500 py-2 pr-3 pl-9 appearance-none outline-none focus:ring-1 focus:ring-[#8CFF45]">
              <option className="bg-[#2a2a2a] text-[#AAA]">تایید شده</option>
              <option className="bg-[#2a2a2a] text-[#AAA]">تایید نشده</option>
            </select>
            <ChevronDownIcon className="w-5 h-5 text-[#AAA] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onApply}
            className="bg-[#8CFF45] text-[#393939] font-semibold rounded-2xl px-8 py-2 hover:bg-[#A6FF76] transition-all duration-200"
          >
            اعمال فیلتر
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
