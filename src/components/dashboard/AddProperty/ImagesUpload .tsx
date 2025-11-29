"use client";
import React, { useState } from "react";
import { PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";

interface ImagesUploadProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const ImagesUpload: React.FC<ImagesUploadProps> = ({ setActiveStep }) => {
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const handleUpload = (index: number, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images];
        newImages[index] = e.target?.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="
    text-[#AAA] 
    shadow-2xl 
    rounded-2xl 
    px-6 md:px-8 
    py-8 md:py-10 
    space-y-10 
    bg-white dark:bg-gray-900 
    transition-colors
  "
    >
      {/* عنوان */}
      <div className="text-right">
        <p className="text-xs text-black dark:text-gray-300 mb-1">آدرس ملک</p>

        <p className="text-sm text-[#555] dark:text-gray-400 leading-loose">
          <span className="text-black dark:text-white font-semibold">
            یک تصویر بهتر از هزار کلمه.
          </span>{" "}
          با قرار دادن عکس شانس دیده شدن ملکتان را ۵ برابر کنید.
        </p>
      </div>

      {/* آپلود عکس */}
      <div className="flex flex-wrap justify-center gap-6">
        {images.map((img, i) => {
          const isAddBox = i === 3;

          return (
            <label
              key={i}
              className={`
            w-28 h-28 md:w-36 md:h-36 
            rounded-lg 
            flex flex-col items-center justify-center 
            cursor-pointer 
            transition-all 
            ${
              isAddBox
                ? "border-2 border-dashed border-[#8CFF45]"
                : "border-2 border-dashed border-[#AAA] dark:border-gray-600"
            }
            bg-white dark:bg-gray-800
          `}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUpload(i, e.target.files?.[0] || null)}
              />

              {img ? (
                <img
                  src={img}
                  alt={`img-${i}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : isAddBox ? (
                <>
                  <div className="border border-[#8CFF45] rounded-full p-1.5 mb-1">
                    <PlusIcon className="w-5 h-5 text-[#8CFF45]" />
                  </div>
                  <span className="text-[#8CFF45] text-sm">افزودن عکس</span>
                </>
              ) : (
                <PhotoIcon className="w-8 h-8 text-[#AAA] dark:text-gray-500" />
              )}
            </label>
          );
        })}
      </div>

      {/* دکمه‌ها */}
      <div className="flex justify-end gap-5 pt-10">
        {/* مرحله قبل */}
        <button
          onClick={() => setActiveStep((prev) => prev - 1)}
          className="
        border border-[#AAA] dark:border-gray-600 
        text-[#AAA] dark:text-gray-300 
        px-6 py-2 
        rounded-lg 
        flex items-center gap-2 
        transition-all
        hover:bg-gray-100 dark:hover:bg-gray-700
      "
        >
          <span className="text-lg">›</span>
          <span>مرحله قبل</span>
        </button>

        {/* مرحله بعد */}
        <button
          onClick={() => setActiveStep((prev) => prev + 1)}
          className="
        bg-[#8CFF45] 
        text-[#393939] 
        font-semibold 
        px-6 py-2 
        rounded-lg 
        flex items-center gap-2 
        hover:bg-[#76e634] 
        transition-all
      "
        >
          <span>مرحله بعد</span>
          <span className="text-lg">‹</span>
        </button>
      </div>
    </div>
  );
};

export default ImagesUpload;
