"use client";

import React, { useState } from "react";
import PropertyTable from "./PropertyTable";
import AddProperty from "../AddProperty/AddProperty";

const PropertyManagement = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => setShowForm(true);

  return (
    <div className="p-3 bg-white dark:bg-gray-700 rounded-2xl text-right">
      {!showForm ? (
        <>
          <div className="h-20 flex items-center justify-between">
            <p className="w-1/2 font-[500] text-xl text-[#AAA]">
              لیست املاک من
            </p>

            <div className="flex justify-between items-center w-1/2 gap-5">
              <input
                type="text"
                placeholder="جستجو"
                className="outline-none rounded-2xl text-[#AAA] w-full border border-[#555] placeholder-[#777] p-2 transition-all duration-200"
              />

              <button className="bg-[#8CFF45] text-[#393939] font-semibold rounded-2xl px-8 py-2 hover:bg-[#aaff6b] active:scale-95 transition-all duration-150">
                فیلتر
              </button>
            </div>
          </div>

          <div className="border-t border-dashed border-[#555] mt-2" />
          <PropertyTable onAddClick={handleAddClick} />
        </>
      ) : (
        <AddProperty />
      )}
    </div>
  );
};

export default PropertyManagement;
