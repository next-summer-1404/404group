"use client";

import React from "react";

interface AddressFormProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const AddressForm: React.FC<AddressFormProps> = ({ setActiveStep }) => {
  return (
    <div
      className="
  shadow-2xl 
  text-black dark:text-gray-200 
  rounded-2xl 
  p-6 
  flex flex-col 
  bg-white dark:bg-gray-900 
  transition-colors
"
    >
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* بخش فرم آدرس */}
        <div className="flex flex-col justify-start mb-4 w-full lg:w-2/5 text-right">
          <p className="text-black dark:text-white text-sm font-medium mb-2">
            نشانی ملک:
          </p>

          <input
            type="text"
            placeholder="ساری، دنیای آرزو، پژوهشگاه سپهرگان"
            className="
          border border-[#888] dark:border-gray-600 
          outline-none p-3 rounded-xl 
          text-[#555] dark:text-gray-200
          bg-white dark:bg-gray-800
          placeholder:text-[#AAA] dark:placeholder:text-gray-400
          transition-all
          w-full
        "
          />

          <p className="text-[20px] text-gray-500 dark:text-gray-400 mt-6 leading-12">
            با انتخاب موقعیت مکانی ملک خود از روی نقشه، <br />
            به راحتی
            <span className="text-black dark:text-white font-medium">
              {" "}
              موقعیت ملک{" "}
            </span>
            را تعیین کنید.
          </p>
        </div>

        {/* نقشه */}
        <div
          className="
      relative 
      w-full lg:w-3/5 
      h-[250px] lg:h-[340px] 
      bg-gray-200 dark:bg-gray-700 
      rounded-lg 
      flex items-center justify-center
      transition-colors
    "
        >
          <p className="text-[#666] dark:text-gray-300 text-sm">map</p>
        </div>
      </div>

      {/* دکمه‌ها */}
      <div className="flex justify-end gap-5 items-center mt-8">
        <button
          onClick={() => setActiveStep((prev) => prev - 1)}
          className="
        flex items-center gap-1
        border border-[#8CFF45] text-[#8CFF45]
        px-6 py-2 rounded-lg font-medium
        hover:bg-[#8CFF45]/10 
        transition-all
      "
        >
          <span className="text-[16px]">مرحله قبل</span>
        </button>

        <button
          onClick={() => setActiveStep((prev) => prev + 1)}
          className="
        flex items-center bg-[#8CFF45] text-[#393939]
        px-6 py-2 rounded-lg font-medium 
        hover:bg-[#76e634] 
        transition-all
      "
        >
          <span className="text-[16px]">مرحله بعد</span>
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
