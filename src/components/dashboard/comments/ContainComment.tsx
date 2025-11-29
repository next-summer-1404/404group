"use client";
import React from "react";
import TableComments from "./TableComments";

const ContainComment = () => {
  return (
    <div
      className="
    px-3 pb-3
    bg-white dark:bg-gray-900
    text-right
    h-auto
    rounded-2xl
    transition-colors duration-300
  "
    >
      {/* Header */}
      <div className="min-h-20 flex items-center justify-between">
        <p className="w-full md:w-1/2 font-[500] text-xl text-black dark:text-white">
          لیست نظرات
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-[#555] dark:border-gray-700 mt-2" />

      {/* Table */}
      <TableComments />
    </div>
  );
};

export default ContainComment;
