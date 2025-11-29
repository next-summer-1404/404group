"use client";

import { putPassword } from "@/services/api/Dash/putPassword";
import { ChangePasswordRequest } from "@/types/panel/ChangePassword";
import { useState } from "react";

export default function SecurityInfo() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const body: ChangePasswordRequest = {
      currentPassword,
      newPassword,
    };

    try {
      const res = await putPassword(body);
      setSuccess(true);
      setMessage(res.message || "رمز عبور با موفقیت تغییر کرد");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      setSuccess(false);
      setMessage(
        error?.response?.data?.message ||
          "خطا در تغییر رمز. لطفاً دوباره بررسی کنید."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setMessage("");
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
      {/* ستون راست */}
      <div
        className="
      w-full md:w-1/3 
      p-8 md:p-10 
      rounded-s-xl 
      text-right
    "
      >
        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
          امنیت
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-7 mt-2">
          میتوانید در این بخش رمز خود را تغییر دهید
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
          text-gray-900 
          text-sm px-5 py-2 
          rounded-2xl
          font-semibold
          transition
        "
          >
            {loading ? "در حال اعمال..." : "اعمال تغییرات"}
          </button>
        </div>
      </div>

      {/* ستون چپ */}
      <div
        className="
      w-full md:w-2/3 
      flex flex-col justify-center 
      p-8 md:p-10 
      gap-5 
      rounded-e-xl
    "
      >
        {/* رمز قبلی */}
        <div className="flex flex-col">
          <label
            htmlFor="currentPassword"
            className="text-gray-700 dark:text-gray-300 text-sm mb-1"
          >
            رمز عبور قبلی:
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            placeholder="********"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
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

        {/* رمز جدید */}
        <div className="flex flex-col">
          <label
            htmlFor="newPassword"
            className="text-gray-700 dark:text-gray-300 text-sm mb-1"
          >
            رمز عبور جدید:
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
      </div>
    </form>
  );
}
