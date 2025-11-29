"use client";
import React, { useEffect, useState } from "react";
import DynamicTable, { Column, Row } from "../../common/table/DynamicTable";
// import { getCustomersBooking } from "@/utils/service/api/getCustomersBooking";
import Cookies from "js-cookie";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { getCustomersBooking } from "@/services/api/Dash/getCustomersBooking";
import {
  BookingCustomersResponse,
  BookingItem,
} from "@/types/panel/BookingCustomersResponse ";

const BookingTable = () => {
  const [data, setData] = useState<BookingItem[]>([]);

  const getData = async () => {
    const userId = Cookies.get("userId");
    if (!userId) {
      setData([]);
      return;
    }
    const response: BookingCustomersResponse = await getCustomersBooking(
      String(userId)
    );
    setData(response.bookings || []);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns: Column[] = [
    { key: "propertyName", label: "نام ملک" },
    { key: "guestInfo", label: "اطلاعات مسافر" },
    { key: "reserveDate", label: "تاریخ رزرو" },
    { key: "amount", label: "مبلغ" },
    { key: "reserveStatus", label: "وضعیت رزرو" },
  ];

  const rows: Row[] = data.map((booking, index) => ({
    key: index + 1,
    propertyName: booking?.house?.title || "—",
    guestInfo: booking?.traveler_details
      ? booking.traveler_details
          .map(
            (t) =>
              `${t.firstName || ""} ${t.lastName || ""} (${t.gender || ""})`
          )
          .join("، ")
      : "—",
    reserveDate:
      booking?.reservedDates && booking.reservedDates.length > 0
        ? new Date(booking.reservedDates[0].value).toLocaleDateString("fa-IR")
        : "—",
    amount: booking?.house?.price
      ? `${Number(booking.house.price).toLocaleString("fa-IR")} تومان`
      : "—",
    reserveStatus: (
      <div
        className={`flex items-center gap-1 font-semibold ${
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
    <div className="text-[#AAA]">
      <DynamicTable columns={columns} rows={rows} withActions={true} />
    </div>
  );
};

export default BookingTable;
