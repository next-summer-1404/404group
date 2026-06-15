"use client";
import React, { useState } from "react";
import BookingTable from "./BookingTable";
import FilterModal from "./FilterModal";

const BookingManagement = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div
      className="
    p-3 
    bg-white dark:bg-gray-900 
    rounded-2xl 
    text-right 
    transition-colors
  "
    >
      {/* Header */}
      <div className="min-h-20 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-[500] text-xl text-black dark:text-gray-100 w-full md:w-1/2">
          لیست رزروهای مشتریان
        </p>

        {/* Search + Filter */}
        <div className="flex items-center w-full md:w-1/2 gap-3">
          <input
            type="text"
            placeholder="جستجو"
            className="
          outline-none 
          rounded-2xl 
          w-full 
          text-[#555] dark:text-gray-200 
          bg-white dark:bg-gray-800
          border border-[#555] dark:border-gray-600 
          placeholder-[#777] dark:placeholder-gray-400
          p-2 
          transition-all duration-200
        "
          />

          <button
            onClick={() => setIsFilterOpen(true)}
            className="
          bg-[#8CFF45] 
          text-[#393939] 
          font-semibold 
          rounded-2xl 
          px-8 py-2 
          hover:bg-[#aaff6b] 
          active:scale-95 
          transition-all duration-150
        "
          >
            فیلتر
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-[#555] dark:border-gray-600 mt-2" />

      {/* Table */}
      <BookingTable />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default BookingManagement;
