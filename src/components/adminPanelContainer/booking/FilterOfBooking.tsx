"use client";

import React, { useState } from "react";
import { Button, Select, SelectItem, Input } from "@heroui/react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getAllUser } from "../../../services/api/Admin/User/getAllUser/getAllUser";

import {
  useBuildSearchParams,
  useParseSearchParams,
} from "../../../utils/hooks/SearchParamsSet";
import { IHouseResponse } from "../../../types/adminPanel/housesAdmin";
import { Funnel, XCircle } from "lucide-react";
import { getAllHousesForAdmin } from "../../../services/api/Admin/houses/getAllHouse";
import { useSetParams } from "../../../utils/hooks/useSetParams";

function FilterOfBooking() {
  // ---------------------
  // دریافت لیست کاربران
  // ---------------------
  const { data: getAllUsers, isLoading: loadingUsers } = useQuery({
    queryKey: ["getAllUserForBooking"],
    queryFn: () => getAllUser({ page: 1, limit: 200 }),
    select: (res) => ({
      users: res.data,
      totalCount: res.totalCount,
    }),
  });

  // ---------------------
  // دریافت لیست خانه‌ها
  // ---------------------
  const { data: getAllHousesBook, isLoading: loadingHouses } = useQuery({
    queryKey: ["getAllHousesForBooking"],
    queryFn: () => getAllHousesForAdmin({ page: 1, limit: 200 }),
    select: (res: IHouseResponse) => ({
      houses: res.data,
      totalCount: res.totalCount,
    }),
  });
  const { setParams, getParams } = useSetParams();

  const [sortDate, setSortDate] = useState<Date | null>(
    getParams("sort") ? new Date(getParams("sort")) : null
  );

  const [status, setStatus] = useState<string>(getParams("status") ?? "");

  const [userId, setUserId] = useState<string>(getParams("user_id") ?? "");

  const [houseId, setHouseId] = useState<string>(getParams("house_id") ?? "");

  return (
    <div className="w-full flex flex-row flex-wrap gap-4 bg-white p-4 rounded-xl mt-4">
      {/* Sort By Date */}
      <div className="flex flex-col">
        {/* <label className="text-sm mb-1">مرتب‌سازی بر اساس تاریخ</label> */}
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          value={sortDate}
          onChange={(date: any) => setSortDate(date ? date.toDate() : null)}
          inputClass="custom-input"
          style={{
            width: "200px",
            height: "55px",
            borderRadius: "14px",
            padding: "8px",
            background: "#F4F4F5",
          }}
        />
      </div>

      {/* Status */}
      <Select
        label="وضعیت رزرو"
        placeholder="انتخاب وضعیت"
        selectedKeys={status ? [status] : []}
        onSelectionChange={(keys) => {
          const statusValue = Array.from(keys)[0] as string | undefined;
          setStatus(statusValue ?? "");
          setParams("status", statusValue ?? null);
        }}
        className="w-[250px]"
      >
        <SelectItem key="pending">در انتظار</SelectItem>
        <SelectItem key="confirmed">تأیید شده</SelectItem>
        <SelectItem key="canceled">لغو شده</SelectItem>
      </Select>

      {/* User Select */}
      <Select
        label="انتخاب کاربر"
        placeholder={
          loadingUsers ? "درحال دریافت کاربران..." : "کاربر را انتخاب کنید"
        }
        isLoading={loadingUsers}
        selectedKeys={userId ? [userId] : []}
        onSelectionChange={(keys) => {
          const userIdValue = keys.currentKey as string;
          setUserId(userIdValue);
          setParams("user_id", userIdValue);
        }}
        className="w-[300px]"
      >
        {(getAllUsers?.users ?? []).map((user) => (
          <SelectItem key={user.id}>{user.fullName}</SelectItem>
        ))}
      </Select>

      {/* House Select */}
      <Select
        label="انتخاب ویلا / خانه"
        placeholder={
          loadingHouses ? "درحال دریافت ویلاها..." : "خانه را انتخاب کنید"
        }
        isLoading={loadingHouses}
        selectedKeys={houseId ? [houseId] : []}
        onSelectionChange={(keys) => {
          const houseIdValue = keys.currentKey as string;
          setHouseId(houseIdValue);
          setParams("house_id", houseIdValue);
        }}
        className="w-[300px]"
      >
        {(getAllHousesBook?.houses ?? []).map((house: any) => (
          <SelectItem key={house.id}>{house.title}</SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default FilterOfBooking;
