"use client";
import React, { useEffect, useState } from "react";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { FavoriteTypes, SellerFinanceItem } from "@/types/panel/FavoritType";
import { getFavorite } from "@/services/api/Dash/getFavorite";

const FavoriteTable = () => {
  const columns = [
    { key: "name", label: "نام اقامتگاه" },
    { key: "price", label: "قیمت کل" },
    { key: "address", label: "آدرس" },
  ];

  const [data, setData] = useState<SellerFinanceItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response: FavoriteTypes = await getFavorite();
      // console.log(response,'rrrrrrrrrrr')
      setData(response.data);
    };
    fetchData();
  }, []);

  const rows =
    data?.map((h) => ({
      key: h.id,
      name: h.house.title,
      price: `${Number(h.price).toLocaleString("fa-IR")} تومان`,
      address: h.house.address,
    })) ?? [];

  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-gray-800 text-right rounded-xl p-4 mt-10 text-black shadow-md">
      <div className="overflow-auto rounded-xl">
        <table className="w-full text-sm text-right border-collapse">
          <thead>
            <tr className="bg-gray-300 dark:bg-gray-700 dark:text-white text-black border-b border-dashed border-[#444]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-3 px-4 font-normal whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
              <th className="py-3 text-center"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((item) => (
              <tr
                key={item.key}
                className="border-b border-dashed border-[#444] hover:bg-[#2A2A2A] transition relative"
              >
                <td className="py-3 px-4 whitespace-nowrap">{item.name}</td>
                <td className="py-3 px-4 whitespace-nowrap">{item.price}</td>
                <td className="py-3 px-4 whitespace-nowrap">{item.address}</td>
                <td className="text-center relative">
                  <button
                    className="p-1 rounded-full hover:bg-[#222] transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(menuOpen === item.key ? null : item.key);
                    }}
                  >
                    <EllipsisVerticalIcon className="w-5 h-5 text-[#8CFF45]" />
                  </button>

                  {menuOpen === item.key && (
                    <div
                      className="absolute left-10 bottom-0 z-50 bg-[#393939] border border-[#333]
                                 rounded-xl shadow-lg text-xs py-2 px-2 w-[100px]"
                    >
                      <button className="flex items-center gap-2 w-full text-[#8CFF45] hover:bg-[#222] px-2 py-1 rounded-md">
                        <CalendarDaysIcon className="w-4 h-4" />
                        رزرو
                      </button>
                      <button className="flex items-center gap-2 w-full text-[#FF4556] hover:bg-[#222] px-2 py-1 rounded-md">
                        <TrashIcon className="w-4 h-4" />
                        حذف
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-1 text-xs">
        <button className="px-3 py-1 rounded bg-[#8CFF45] text-[#0E0E0E] font-semibold">
          ۱
        </button>
        {[2, 3, 4].map((n) => (
          <button key={n} className="px-3 py-1 rounded  transition">
            {n}
          </button>
        ))}
        <button className="px-3 py-1 rounded">...</button>
      </div>
    </div>
  );
};

export default FavoriteTable;
