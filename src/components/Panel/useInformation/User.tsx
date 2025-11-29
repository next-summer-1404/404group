"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { UpdateUserRequest } from "@/types/panel/UpdateUserType";
import { putUpdateUser } from "@/services/api/Dash/putUpdateUser";

export default function UserForm() {
  const [formData, setFormData] = useState<UpdateUserRequest>({
    email: "",
    fullName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = Cookies.get("userId");
    if (id) setUserId(id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!userId) throw new Error("شناسه کاربر یافت نشد ");
    const res = await putUpdateUser(userId, formData);
    setSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      email: "",
      fullName: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    });
    setMessage("");
    setSuccess(null);
  };

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="
    h-auto 
    flex flex-col md:flex-row 
    bg-white dark:bg-gray-900
    border-b border-gray-300 dark:border-gray-700
    transition-colors duration-300
  "
    >
      {/* ستون سمت راست (عنوان + دکمه‌ها) */}
      <div
        className="
      w-full md:w-1/3
      p-8 md:p-10 
      rounded-s-xl
      text-right
    "
      >
        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
          اطلاعات فردی
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-7 mt-2">
          میتوانید اطلاعات شخصی خود را تغییر دهید
        </p>

        {message && (
          <p
            className={`text-sm mt-4 text-center ${
              success ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex items-center gap-8 justify-center mt-6">
          <button
            type="reset"
            disabled={loading}
            className="
          text-gray-500 dark:text-gray-400 
          hover:text-gray-700 dark:hover:text-gray-200
          transition
        "
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
          bg-green-400 dark:bg-green-500 
          hover:bg-green-500 dark:hover:bg-green-400
          text-gray-900 dark:text-gray-900
          text-sm px-5 py-2 
          rounded-2xl
          font-semibold
          transition
        "
          >
            {loading ? "در حال ذخیره..." : "اعمال تغییرات"}
          </button>
        </div>
      </div>

      {/* ستون سمت چپ (فیلدها) */}
      <div
        className="
      w-full md:w-2/3 
      flex flex-col justify-center 
      p-8 md:p-10 
      gap-5 
      rounded-e-xl
    "
      >
        {/* نام */}
        <div className="flex flex-col">
          <label
            htmlFor="firstName"
            className="text-gray-700 dark:text-gray-300 text-sm mb-1"
          >
            نام:
          </label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            type="text"
            placeholder="نام"
            className="
          bg-transparent 
          border border-gray-400 dark:border-gray-600
          rounded-xl px-4 py-2
          text-gray-700 dark:text-gray-200
          placeholder-gray-400 dark:placeholder-gray-500
          outline-none text-right
          transition-colors duration-300
        "
          />
        </div>

        {/* نام خانوادگی */}
        <div className="flex flex-col">
          <label
            htmlFor="lastName"
            className="text-gray-700 dark:text-gray-300 text-sm mb-1"
          >
            نام خانوادگی:
          </label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            placeholder="نام خانوادگی"
            className="
          bg-transparent 
          border border-gray-400 dark:border-gray-600
          rounded-xl px-4 py-2
          text-gray-700 dark:text-gray-200
          placeholder-gray-400 dark:placeholder-gray-500
          outline-none text-right
          transition
        "
          />
        </div>

        {/* ایمیل */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-gray-700 dark:text-gray-300 text-sm mb-1"
          >
            ایمیل:
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="example@gmail.com"
            className="
          bg-transparent 
          border border-gray-400 dark:border-gray-600
          rounded-xl px-4 py-2
          text-gray-700 dark:text-gray-200
          placeholder-gray-400 dark:placeholder-gray-500
          outline-none text-right
        "
          />
        </div>

        {/* موبایل */}
        <div className="flex flex-col">
          <label
            htmlFor="phoneNumber"
            className="text-gray-700 dark:text-gray-300 text-sm mb-1"
          >
            شماره موبایل:
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            type="text"
            placeholder="09123456789"
            className="
          bg-transparent 
          border border-gray-400 dark:border-gray-600
          rounded-xl px-4 py-2
          text-gray-700 dark:text-gray-200
          placeholder-gray-400 dark:placeholder-gray-500
          outline-none text-right
        "
          />
        </div>
      </div>
    </form>
  );
}
