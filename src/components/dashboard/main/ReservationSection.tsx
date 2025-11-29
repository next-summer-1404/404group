"use client";
import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import DynamicTable from "../../common/table/DynamicTable";
import Cookies from "js-cookie";
import {
  BookingCustomersResponse,
  BookingItem,
} from "@/types/panel/BookingCustomersResponse ";
import { getCustomersBooking } from "@/services/api/Dash/getCustomersBooking";

{
  /*???*/
}
const columns = [
  { key: "name", label: "نام اقامتگاه" },
  { key: "date", label: "تاریخ رزرو" },
  { key: "price", label: "قیمت" },
  { key: "status", label: "وضعیت" },
];

const ReservationSection: React.FC = () => {
  const [data, setData] = useState<BookingItem[]>([]);

  const getData = async () => {
    const userId = Cookies.get("userId");
    // console.log(userId,'lllll')
    if (!userId) {
      setData([]);
      return;
    }
    const response: BookingCustomersResponse = await getCustomersBooking(
      String(userId)
    );
    setData(response.bookings || []);
    //  console.log(response,'rrrrrrrr')
  };

  useEffect(() => {
    getData();
  }, []);

  const rows = data.map((booking, index) => ({
    key: index + 1,
    name: booking?.house?.title || "—",
    date:
      booking?.reservedDates && booking.reservedDates.length > 0
        ? new Date(booking.reservedDates[0].value).toLocaleDateString("fa-IR") +
          " / " +
          new Date(booking.reservedDates[0].value).toLocaleTimeString("fa-IR")
        : "—",
    price: booking?.house?.price
      ? `${Number(booking.house.price).toLocaleString("fa-IR")} تومان`
      : "—",
    status: (
      <div
        className={`flex items-center justify-start gap-1 font-semibold ${
          booking?.status === "pending" ? "text-yellow-400" : "text-[#8CFF45]"
        }`}
      >
        <CheckCircleIcon className="w-4 h-4" />
        <span>
          {booking?.status === "pending" ? "در انتظار تأیید" : "تأیید شده"}
        </span>
      </div>
    ),
  }));

  return (
    <DynamicTable title="رزروهای اخیر مشتریان" columns={columns} rows={rows} />
  );
};

export default ReservationSection;
