"use client"; // حتما باید بالای فایل باشهimport React from "react";
import HouseReserveMap from "../../../components/houseReserveContainer/houseReserveMap";

function HouseReserve() {
  return (
    <div className="relative w-full h-[900px]">
      {/* نقشه */}
      <HouseReserveMap />

      {/* باکس روی نقشه */}
      <div className="absolute top-0 right-0 z-[1000] w-[540px] h-screen bg-white bg-opacity-70 rounded-2xl text-white p-6">
        <div className="text-black">
          خانه {">"} رزرو هتل {">"} رزرو هتل رشت
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default HouseReserve;
