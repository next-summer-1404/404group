"use client";
import React, { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    propertyType: string;
    location: string;
    minPrice: string;
    maxPrice: string;
  }) => void;
}

const FavFilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [filters, setFilters] = useState({
    propertyType: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#393939] text-[#AAA] rounded-2xl w-[400px] sm:w-[480px] p-6 shadow-lg relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">فیلترها</h2>
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-red-400 hover:text-red-500 border border-red-400 px-3 py-1 rounded-full text-sm"
          >
            بستن <span className="text-lg">×</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex flex-col gap-1">
            <label className="text-[#AAA]">نوع ملک:</label>
            <select
              value={filters.propertyType}
              onChange={(e) =>
                setFilters({ ...filters, propertyType: e.target.value })
              }
              className="bg-[#393939] border border-[#555] rounded-xl p-2 text-[#AAA]  outline-none"
            >
              <option value="">انتخاب نوع</option>
              <option value="آپارتمان">آپارتمان</option>
              <option value="ویلا">ویلا</option>
              <option value="زمین">زمین</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#AAA]">محدوده یا محل:</label>
            <input
              type="text"
              placeholder="استان، شهر، محله..."
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
              className="bg-transparent border border-[#555] rounded-xl p-2 text-[#AAA] placeholder-[#AAA]  outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#AAA]">حداقل قیمت:</label>
            <input
              type="number"
              placeholder="تومان"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
              className="bg-transparent border border-[#555] rounded-xl p-2 text-[#AAA] placeholder-[#AAA]  outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#AAA]">حداکثر قیمت:</label>
            <input
              type="number"
              placeholder="تومان"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              className="bg-transparent border border-[#555] rounded-xl p-2 text-[#AAA] placeholder-[#AAA]  outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleApply}
            className="bg-[#8CFF45] text-[#393939] font-semibold rounded-2xl px-10 py-2 hover:bg-[#aaff6b] active:scale-95 transition-all duration-150"
          >
            اعمال فیلتر
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavFilterModal;
