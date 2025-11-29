"use client";
import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { getNotifications } from "@/services/api/Dash/getNotifications";
import {
  NotificationItem,
  NotificationTypes,
} from "@/types/panel/NotificationTypes";
// import { getNotifications } from "@/utils/service/api/getNotifications";
// import { NotificationItem, NotificationTypes  } from "@/types/NotificationTypes";

const MainSellerNotification = () => {
  const [data, setData] = useState<NotificationItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response: NotificationTypes = await getNotifications();
      setData(response.data ?? []);
    };
    fetchData();
  }, []);

  const unread = data.filter((n) => !n.isRead);
  const read = data.filter((n) => n.isRead);

  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageData = data.slice(startIndex, endIndex);

  return (
    <div
      className="
    shadow-2xl 
    bg-white dark:bg-gray-900
    text-gray-700 dark:text-gray-200
    rounded-xl p-3 mt-5
    transition-colors duration-300
  "
    >
      {/* Header */}
      <div
        className="
      bg-gray-300 dark:bg-gray-700 
      text-black dark:text-white
      rounded-xl 
      p-2 
      grid grid-cols-2
      text-md
    "
      >
        <p>اعلان</p>
        <p>تاریخ</p>
      </div>

      {/* Unread Section */}
      <div className="mt-3">
        <div className="text-sm text-[#8CFF45] border-b border-dashed border-gray-400 dark:border-gray-700 pb-1 mb-2 text-right">
          خوانده نشده
        </div>

        {unread.length === 0 ? (
          <p className="text-center text-xs text-black dark:text-gray-300 py-2">
            هیچ اعلان خوانده‌نشده‌ای وجود ندارد.
          </p>
        ) : (
          unread.map((n) => (
            <div
              key={n.id}
              className="
            grid grid-cols-2 
            items-center 
            py-3 px-2 
            border-b 
            border-gray-300 dark:border-gray-700
          "
            >
              <div className="text-right">
                <p className="text-sm">{n.message}</p>
              </div>

              <div
                className="
              flex items-center justify-between 
              text-left text-xs 
              text-gray-500 dark:text-gray-400
            "
              >
                <span>
                  {new Date(n.createdAt).toLocaleTimeString("fa-IR")} ـ{" "}
                  {new Date(n.createdAt).toLocaleDateString("fa-IR")}
                </span>

                <button
                  type="button"
                  className="
                inline-flex items-center gap-1 
                bg-green-400 dark:bg-green-500 
                text-gray-900 
                text-xs font-semibold 
                px-3 py-1 
                rounded-full
                hover:bg-green-500 dark:hover:bg-green-400
                transition
              "
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  علامت‌گذاری به‌عنوان خوانده شده
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Read Section */}
      <div className="mt-4">
        <div
          className="
        text-sm 
        text-green-400 
        border-b border-dashed 
        border-gray-400 dark:border-gray-700 
        pb-1 mb-2 text-right
      "
        >
          خوانده شده
        </div>

        {read.length === 0 ? (
          <p className="text-center text-xs text-black dark:text-gray-300 py-2">
            هیچ اعلان خوانده‌شده‌ای وجود ندارد.
          </p>
        ) : (
          read.map((n) => (
            <div
              key={n.id}
              className="
            grid grid-cols-1 md:grid-cols-2 
            items-center gap-3 
            py-3 px-2 
            border-b 
            border-gray-300 dark:border-gray-700
          "
            >
              <div className="text-right">
                <p className="text-sm">{n.message}</p>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(n.createdAt).toLocaleTimeString("fa-IR")} ـ{" "}
                {new Date(n.createdAt).toLocaleDateString("fa-IR")}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setCurrentPage(n)}
            className={`
          px-3 py-1 
          rounded text-xs font-semibold
          ${
            n === currentPage
              ? "bg-[#8CFF45] text-[#393939]"
              : "text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }
        `}
          >
            {n}
          </button>
        ))}
        {totalPages > 5 && (
          <span className="text-gray-500 dark:text-gray-300 text-xs">...</span>
        )}
      </div>
    </div>
  );
};

export default MainSellerNotification;
