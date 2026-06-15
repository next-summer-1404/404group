"use client";
import React, { useState } from "react";
import FavoriteTable from "./FavoritTabel";
import FavFilterModal from "./FavoritFilter";

const TopFavorite = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="p-3 text-right">
      <div className="h-20 flex items-center justify-between">
        <p className="w-1/2 font-[500] text-xl text-black dark:text-white transition-colors">
          علاقه‌مندی‌ها
        </p>

        <div className="flex justify-between items-center w-1/2 gap-5">
          <input
            type="text"
            placeholder="جستجو"
            className="
          outline-none 
          rounded-2xl 
          w-full 
          p-2 
          border 
          border-gray-400 dark:border-gray-600
          text-gray-700 dark:text-gray-200
          placeholder-gray-500 dark:placeholder-gray-400
          bg-white dark:bg-gray-800
          transition-colors duration-300
        "
          />

          <button
            onClick={() => setIsFilterOpen(true)}
            className="
          bg-green-400 dark:bg-green-500 
          text-gray-900 
          font-semibold 
          rounded-2xl 
          px-8 py-2 
          hover:bg-green-500 dark:hover:bg-green-400 
          active:scale-95 
          transition-all duration-150
        "
          >
            فیلتر
          </button>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-400 dark:border-gray-700 mt-2" />

      <FavoriteTable />

      <FavFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default TopFavorite;
