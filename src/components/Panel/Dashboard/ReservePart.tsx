"use client";
import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import DynamicTable from "../../common/table/DynamicTable";
import { BookingItem, BookingTypes } from "@/types/panel/Booking";
import { getBooking } from "@/services/api/Dash/getBooking";

const columns = [
  { key: "name", label: "نام اقامتگاه" },
  { key: "date", label: "تاریخ رزرو" },
  { key: "price", label: "قیمت" },
  { key: "status", label: "وضعیت" },
];

const ReservePart: React.FC = () => {
  const [data, setData] = useState<BookingItem[]>([]);

  const getData = async () => {
    const response = await getBooking();
    console.log(response, "fffffffff");
    setData(response.data || []);
  };

  useEffect(() => {
    console.log("rrrrrr");
    getData();
  }, []);

  const rows = data.map((booking, index) => ({
    key: index + 1,
    name: booking.house?.title || "—",
    date:
      booking.reservedDates && booking.reservedDates.length > 0
        ? `${new Date(booking.reservedDates[0].value).toLocaleDateString(
            "fa-IR"
          )} / ${new Date(booking.reservedDates[0].value).toLocaleTimeString(
            "fa-IR"
          )}`
        : "—",
    price: booking.house?.price
      ? `${Number(booking.house.price).toLocaleString("fa-IR")} تومان`
      : "—",
    status: (
      <div
        className={`flex items-center gap-1 font-semibold ${
          booking.status === "pending" ? "text-yellow-400" : "text-[#8CFF45]"
        }`}
      >
        <CheckCircleIcon className="w-4 h-4" />
        <span>
          {booking.status === "pending" ? "در انتظار تأیید" : "تأیید شده"}
        </span>
      </div>
    ),
  }));

  return (
    <DynamicTable title="رزروهای اخیر مشتریان" columns={columns} rows={rows} />
  );
};

export default ReservePart;
