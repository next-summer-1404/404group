"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

interface FacilitiesFormProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const FacilitiesForm: React.FC<FacilitiesFormProps> = ({ setActiveStep }) => {
  return (
    <div className=" text-[#AAA] rounded-2xl p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm text-black dark:text-white mb-2">
            تعداد حمام:
          </label>
          <input
            type="number"
            placeholder="مثلاً ۲"
            className=" border border-[#AAA] rounded-lg p-3 text-[#AAA] placeholder:text-[#AAA]  outline-none transition-all"
          />
        </div>

        {/* اتاق */}
        <div className="flex flex-col">
          <label className="text-sm dark:text-white text-black mb-2">
            تعداد اتاق:
          </label>
          <input
            type="number"
            placeholder="مثلاً ۳"
            className=" border border-[#AAA] rounded-lg p-3 text-[#AAA] placeholder:text-[#AAA]  outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm dark:text-white text-black mb-2">
            تعداد پارکینگ:
          </label>
          <input
            type="number"
            placeholder="مثلاً ۱"
            className="border border-[#AAA] rounded-lg p-3 text-white placeholder:text-[#AAA]  outline-none transition-all"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-black dark:text-white  mb-2">
            نوع حفاظ:
          </label>
          <select className="appearance-none border border-[#AAA] rounded-lg p-3 text-[#AAA] outline-none  transition-all">
            <option className="bg-[#2C2C2C] text-white">بالکن دار</option>
            <option className="bg-[#2C2C2C] text-white">بدون حفاظ</option>
          </select>
          <ChevronDownIcon className="w-5 h-5 text-[#AAA] absolute left-34 bottom-28 transform -translate-y-1/2 pointer-events-none" />

          <style jsx global>{`
            select option {
              background-color: #2c2c2c !important;
              color: #ffffff;
            }
          `}</style>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-black dark:text-white mb-2">
          برچسب‌ها:
        </label>

        <div className=" border border-[#AAA] rounded-lg min-h-[60px] p-3 flex flex-wrap items-center gap-2">
          {["مدرن", "آپارتمان", "آسانسور دار"].map((tag) => (
            <span
              key={tag}
              className="bg-[#8CFF45] text-[#393939] px-4 py-1.5 rounded-lg font-medium inline-flex items-center gap-2"
            >
              {tag}
              <button className=" text-[#393939] rounded-full w-5 h-5 flex items-center justify-center hover:cursor-pointer">
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-5 pt-6">
        <button
          onClick={() => setActiveStep((prev) => prev - 1)}
          className="border border-[#8CFF45] text-[#8CFF45] px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#1b1b1b] transition-all"
        >
          <span>مرحله قبل</span> <span className="text-lg">→</span>
        </button>

        <button
          onClick={() => setActiveStep((prev) => prev + 1)}
          className="bg-[#8CFF45] text-[#393939] font-semibold px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#9eff5c] transition-all"
        >
          <span>مرحله بعد</span> <span className="text-lg">←</span>
        </button>
      </div>
    </div>
  );
};

export default FacilitiesForm;
