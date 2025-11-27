"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, SelectItem, Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

import {
  useBuildSearchParams,
  useParseSearchParams,
} from "../../../utils/hooks/SearchParamsSet";

interface FilterForm {
  email: string;
}

function FilterOfUserTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const parsed = useParseSearchParams(searchParams);

  // ✔ فرم فقط ایمیل را کنترل می‌کند
  const { control, handleSubmit } = useForm<FilterForm>({
    defaultValues: {
      email: parsed.search ?? "",
    },
  });

  // ✔ نقش و تاریخ — Controlled توسط React NOT react-hook-form
  const [role, setRole] = useState<string>(parsed.sort ?? "");
  const [membershipDate, setMembershipDate] = useState<Date | null>(
    parsed.location ? new Date(parsed.location) : null
  );

  // ✔ فقط هنگام Submit → Search Params را بروز کن
  const onSubmit = (data: FilterForm) => {
    const params = useBuildSearchParams({
      search: data.email || undefined,
      sort: role || undefined,
      location: membershipDate ? membershipDate.toISOString() : undefined,
    });

    router.replace(`?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-row flex-wrap gap-4 bg-white p-4 rounded-xl mt-4"
    >
      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            label="ایمیل"
            placeholder="جستجوی ایمیل..."
            variant="bordered"
            className="w-[400px]"
            {...field}
          />
        )}
      />

      {/* Role — حالا Uncontrolled */}
      <Select
        label="نقش"
        placeholder="انتخاب نقش"
        selectedKeys={role ? [role] : []}
        onSelectionChange={(keys) => setRole(Array.from(keys)[0] as string)}
        className="w-[400px]"
      >
        <SelectItem key="admin">ادمین</SelectItem>
        <SelectItem key="buyer">خریدار</SelectItem>
        <SelectItem key="seller">فروشنده</SelectItem>
      </Select>

      {/* DatePicker — دیگر متصل به field نیست */}
      <div className="flex flex-col w-[200px]">
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          value={membershipDate}
          onChange={(date: any) =>
            setMembershipDate(date ? date.toDate() : null)
          }
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

      <Button
        type="submit"
        className="bg-[#7575FE] text-white rounded-[14px] p-6.5"
      >
        اعمال فیلتر
      </Button>
    </form>
  );
}

export default FilterOfUserTable;
