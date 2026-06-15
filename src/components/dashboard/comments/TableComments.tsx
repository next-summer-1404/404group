"use client";

import { getComments } from "@/services/api/Dash/getComments";
import { IComments, ICommentsData } from "@/types/panel/ICommentCardProps";
import React, { useEffect, useState } from "react";

const TableComments: React.FC = () => {
  const [data, setData] = useState<ICommentsData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: IComments = await getComments();
        setData(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
        console.error("خطا در دریافت نظرات:", err);
      }
    };
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div
      className="
    shadow-2xl mt-8 
    bg-white dark:bg-gray-900
    text-gray-700 dark:text-gray-300
    rounded-xl p-6 h-auto overflow-hidden
    transition-colors duration-300
  "
    >
      {/* عنوان */}
      <div className="text-right text-gray-600 dark:text-gray-300 text-base font-semibold mb-4">
        مدیریت نظرات کاربران
      </div>

      {/* خط جداکننده */}
      <div className="border-t border-dashed border-gray-400 dark:border-gray-700 mb-4" />

      {/* لیست نظرات */}
      <div className="flex flex-col gap-4">
        {displayedData.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            هیچ نظری موجود نیست
          </div>
        ) : (
          displayedData.map((comment) => (
            <div
              key={comment.id}
              className="
            rounded-lg 
            bg-gray-100 dark:bg-gray-800
            border border-gray-300 dark:border-gray-700 
            p-4 
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition 
            text-right
          "
            >
              {/* عنوان */}
              <div className="mb-2 text-[#8CFF45] font-semibold break-words whitespace-normal">
                {comment.title || "—"}
              </div>

              {/* توضیحات */}
              <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap break-words leading-relaxed">
                {comment.caption || "—"}
              </p>

              {/* پایین کارت */}
              <div className="flex flex-wrap justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="bg-gray-200 dark:bg-gray-700 text-[#8CFF45] px-3 py-1 rounded-full font-semibold">
                  {comment.rating ? `${comment.rating}/5` : "—"}
                </span>

                <span className="text-gray-600 dark:text-gray-400">
                  {comment.created_at
                    ? new Date(comment.created_at).toLocaleDateString("fa-IR")
                    : "—"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* صفحه‌بندی */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`
            px-3 py-1 rounded-md border 
            border-gray-300 dark:border-gray-700 
            transition text-sm
            ${
              currentPage === page
                ? "bg-[#8CFF45] text-[#0E0E0E] font-bold"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }
          `}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableComments;
