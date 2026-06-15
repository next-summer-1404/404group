"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Input, Select, SelectItem, Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

import { useParseSearchParams } from "../../../utils/hooks/SearchParamsSet";
import { useSetParams } from "../../../utils/hooks/useSetParams";
import { useDebounce } from "../../../utils/hooks/useDebounce";

function FilterOfUserTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const parsed = useParseSearchParams(searchParams);
  const { setParams, getParams } = useSetParams();
  const [role, setRole] = useState<string>(getParams("sort", ""));
  
  const [email, setEmail] = useState(getParams("search", ""));
  const debounceTime = useDebounce(email, 1000);
  useEffect(() => {
    setParams("search", debounceTime);
  }, [debounceTime]);

  const [membershipDate, setMembershipDate] = useState<Date | null>(
    parsed.location ? new Date(parsed.location) : null
  );

  return (
    <div className="w-full flex flex-row flex-wrap gap-4 bg-white p-4 rounded-xl mt-4">
      {/* Email */}

      <Input
        label="ایمیل"
        placeholder="جستجوی ایمیل..."
        variant="bordered"
        className="w-[400px]"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
      />

      {/* Role — حالا Uncontrolled */}
      <Select
        label="نقش"
        placeholder="انتخاب نقش"
        selectedKeys={role ? [role] : []}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] as string | undefined;

          setRole(value ?? "");
          setParams("sort", value ?? null);
        }}
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
    </div>
  );
}

export default FilterOfUserTable;
