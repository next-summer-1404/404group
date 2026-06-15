"use client";
import { postHouses } from "@/services/api/Dash/postHouses";
import { PostHousesType } from "@/types/panel/PostHousesType";
import React, { useState } from "react";

interface BasicInfoFormProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

{
  /*check*/
}
const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ setActiveStep }) => {
  const [formData, setFormData] = useState<PostHousesType>({
    id: 0,
    last_updated: new Date().toISOString(),
    num_comments: 0,
    title: "",
    address: "",
    rate: 0,
    price: 0,
    tags: [],
    capacity: 0,
    location: { lat: 0, lng: 0 },
    categories: { name: "" },
    bathrooms: 0,
    parking: 0,
    rooms: 0,
    yard_type: "",
    transaction_type: "",
    caption: "",
    sellerId: 1,
    sellerName: "",
    photos: null,
    discounted_price: null,
    discount_id: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await postHouses(formData);
    console.log("Response:", res);
    setActiveStep(2);
  };

  return (
    <div
      className="
    bg-white dark:bg-gray-900 
    shadow-2xl rounded-2xl 
    p-4 sm:p-6 
    transition-colors duration-300
    w-full
  "
    >
      <form className="space-y-6 w-full" onSubmit={handleSubmit}>
        {/* ردیف اول */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col w-full">
            <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 sm:mb-2">
              عنوان ملک
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              placeholder="آپارتمان لوکس 102 در ساری"
              className="
            border border-gray-300 dark:border-gray-700
            rounded-lg px-3 py-2 sm:px-4 sm:py-2
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-200
            placeholder-gray-400 dark:placeholder-gray-500
            w-full outline-none transition
          "
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 sm:mb-2">
              ظرفیت
            </label>
            <input
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              type="number"
              placeholder="مثلاً ۶ نفر"
              className="
            border border-gray-300 dark:border-gray-700
            rounded-lg px-3 py-2 sm:px-4 sm:py-2
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-200
            w-full placeholder-gray-400 dark:placeholder-gray-500
            outline-none transition
          "
            />
          </div>
        </div>

        {/* ردیف دوم */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col w-full">
            <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 sm:mb-2">
              نوع معامله
            </label>
            <select
              className="
            border border-gray-300 dark:border-gray-700
            rounded-lg px-3 py-2 sm:px-4 sm:py-2
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-200
            outline-none transition
            w-full
          "
              name="transaction_type"
              value={formData.transaction_type}
              onChange={handleChange}
            >
              <option value="">انتخاب کنید</option>
              <option value="اجاره">اجاره</option>
              <option value="رهن">رهن</option>
              <option value="فروش">فروش</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 sm:mb-2">
              قیمت
            </label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              placeholder="مثلاً ۵,۸۰۰,۰۰۰,۰۰۰"
              className="
            border border-gray-300 dark:border-gray-700
            rounded-lg px-3 py-2 sm:px-4 sm:py-2
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-200
            w-full placeholder-gray-400 dark:placeholder-gray-500
            outline-none transition
          "
            />
          </div>
        </div>

        {/* ردیف سوم */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col w-full">
            <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 sm:mb-2">
              نوع ملک
            </label>
            <select
              className="
            border border-gray-300 dark:border-gray-700
            rounded-lg px-3 py-2 sm:px-4 sm:py-2
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-200
            outline-none transition
            w-full
          "
              name="categories.name"
              value={formData.categories.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  categories: { name: e.target.value },
                }))
              }
            >
              <option value="اداری">اداری</option>
              <option value="تجاری">تجاری</option>
              <option value="مسکونی">مسکونی</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 sm:mb-2">
              زیر نوع ملک
            </label>
            <select
              className="
            border border-gray-300 dark:border-gray-700
            rounded-lg px-3 py-2 sm:px-4 sm:py-2
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-200
            outline-none transition
            w-full
          "
              name="yard_type"
              value={formData.yard_type}
              onChange={handleChange}
            >
              <option value="">آپارتمانی</option>
              <option value="ویلایی">ویلایی</option>
            </select>
          </div>
        </div>

        {/* توضیحات */}
        <div className="flex flex-col w-full">
          <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 sm:mb-2">
            توضیحات ملک
          </label>
          <textarea
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            rows={3}
            placeholder="توضیحات مربوط به ملک..."
            className="
          border border-gray-300 dark:border-gray-700
          rounded-lg px-3 py-2 sm:px-4 sm:py-2
          bg-white dark:bg-gray-800
          text-gray-700 dark:text-gray-200
          placeholder-gray-400 dark:placeholder-gray-500
          outline-none transition w-full
        "
          />
        </div>

        {/* دکمه ارسال */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="
          bg-green-400 dark:bg-green-500 
          text-gray-900 
          px-5 py-2 sm:px-6 sm:py-2 
          rounded-lg font-medium 
          hover:bg-green-500 dark:hover:bg-green-400
          transition-all
        "
          >
            مرحله بعد ←
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfoForm;
