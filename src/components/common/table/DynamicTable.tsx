"use client";
import React, { useState, useEffect } from "react";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
// import BookingDetailsModal from "@/components/dashboard/bookingManagement/BookingDetailsModal";

export type Column = {
  key: string;
  label: string;
};

export type Row = {
  key: string | number;
  [key: string]: any;
};

export type DynamicTableProps = {
  title?: string;
  columns: Column[];
  rows: Row[];
  withActions?: boolean;
  addButtonText?: string;
  onAddClick?: () => void;
};

const statusColor: Record<"فعال" | "در انتظار" | "غیرفعال", string> = {
  فعال: "bg-[#8CFF45] text-[#0E0E0E]",
  "در انتظار": "bg-[#FFC107] text-[#0E0E0E]",
  غیرفعال: "bg-[#FF4556] text-white",
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  title,
  columns,
  rows,
  withActions = false,
  addButtonText,
  onAddClick,
}) => {
  const [menuOpen, setMenuOpen] = useState<number | string | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const menu = document.querySelector(".table-action-menu");
      if (menu && !menu.contains(e.target as Node)) {
        setMenuOpen(null);
      }
    };
    if (menuOpen !== null) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  return (
    <>
      <div
        className="
    bg-white dark:bg-gray-800 
    shadow-2xl 
    mt-8 
    text-gray-900 dark:text-gray-100 
    rounded-xl p-5 
    h-auto min-w-0 overflow-hidden
    transition-colors duration-300
  "
      >
        {/* عنوان */}
        {title && (
          <>
            <div className="text-right text-gray-600 dark:text-gray-300 text-base font-semibold mb-4">
              {title}
            </div>
            <div className="border-t border-dashed border-gray-400 dark:border-gray-700 mb-4" />
          </>
        )}

        {/* جدول */}
        <div className="overflow-x-auto overflow-y-hidden rounded-xl max-w-full">
          <table
            className="w-full table-auto border-collapse text-sm text-right"
            dir="rtl"
          >
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-b border-dashed border-gray-400 dark:border-gray-600">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="py-3 px-4 font-normal text-right align-top whitespace-normal break-words max-w-[150px]"
                  >
                    {col.label}
                  </th>
                ))}

                {withActions && (
                  <th className="text-center py-3 whitespace-normal break-words max-w-[100px]">
                    عملیات
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {rows.map((item) => (
                <tr
                  key={item.key}
                  className="
              border-b border-dashed 
              border-gray-300 dark:border-gray-700 
              hover:bg-gray-100 dark:hover:bg-gray-800 
              transition-colors duration-300
            "
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`py-3 px-4 align-top ${
                        ["caption", "comment", "description"].includes(col.key)
                          ? "whitespace-pre-wrap break-words max-w-[400px]"
                          : "whitespace-nowrap"
                      }`}
                    >
                      {typeof item[col.key] === "string" ||
                      typeof item[col.key] === "number" ? (
                        col.key === "status" &&
                        (item.status === "فعال" ||
                          item.status === "در انتظار" ||
                          item.status === "غیرفعال") ? (
                          <span
                            className={`
                        flex items-center gap-1 text-xs px-3 py-1 rounded-full font-semibold w-fit
                        ${statusColor[item.status as keyof typeof statusColor]}
                      `}
                          >
                            {item.status}
                            {item.status === "فعال" && (
                              <CheckCircleIcon className="w-3 h-3" />
                            )}
                          </span>
                        ) : (
                          item[col.key]
                        )
                      ) : (
                        item[col.key]
                      )}
                    </td>
                  ))}

                  {/* اکشن‌ها */}
                  {withActions && (
                    <td className="relative text-center">
                      <button
                        className="
                    p-1 rounded-full 
                    hover:bg-gray-300 dark:hover:bg-gray-700 
                    transition
                  "
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpen(menuOpen === item.key ? null : item.key);
                        }}
                      >
                        <EllipsisVerticalIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                      </button>

                      {menuOpen === item.key && (
                        <div
                          dir="rtl"
                          className="
                      table-action-menu absolute right-20 bottom-[-12px] mt-2 z-[999]
                      bg-gray-100 dark:bg-gray-800 
                      border border-gray-300 dark:border-gray-600
                      rounded-xl shadow-lg p-2 w-[130px] text-xs
                      transition-colors duration-300
                    "
                        >
                          <button className="flex items-center gap-2 text-green-500 dark:text-green-400 hover:bg-gray-200 dark:hover:bg-gray-700 w-full px-2 py-1 rounded-md transition">
                            فعال‌سازی
                          </button>

                          <button className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 w-full px-2 py-1 rounded-md transition">
                            <PencilSquareIcon className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                            ویرایش
                          </button>

                          <button className="flex items-center gap-2 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 w-full px-2 py-1 rounded-md transition">
                            <TrashIcon className="w-4 h-4" />
                            حذف
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRow(item);
                              setShowModal(true);
                              setMenuOpen(null);
                            }}
                            className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 w-full px-2 py-1 rounded-md transition"
                          >
                            <EyeIcon className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                            مشاهده
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* دکمه اضافه کردن */}
        {addButtonText && (
          <div className="flex justify-start items-center mt-4">
            <button
              onClick={onAddClick}
              className="
          bg-green-400 dark:bg-green-500 
          text-gray-900 dark:text-gray-900
          rounded-2xl px-6 py-2 
          font-semibold 
          hover:bg-green-300 dark:hover:bg-green-400
          transition
        "
            >
              {addButtonText}
            </button>
          </div>
        )}
      </div>

      {/* 🔹 مدال جزئیات رزرو */}
      {/* <BookingDetailsModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedRow(null);
        }}
        data={selectedRow}
      /> */}
    </>
  );
};

export default DynamicTable;
