"use client";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getAllUser } from "../../../services/api/Admin/User/getAllUser/getAllUser";
import { Input, Select, SelectItem, Slider } from "@heroui/react";
import { useSetParams } from "../../../utils/hooks/useSetParams";
import { IUser } from "../../../types/adminPanel/adminPanelTypes";
import { getAllHousesForAdmin } from "../../../services/api/Admin/houses/getAllHouse";

function FilterForHousesByAdmin() {
  const { setParams, getParams } = useSetParams();
  const [price, setPrice] = useState<number>(Number(getParams("price", "0")));
  const [sellerId, setSellerId] = useState<string>(getParams("sellerId", ""));
  const { data: sellerOpt, isLoading } = useQuery({
    queryKey: ["getUserBySeller"],
    queryFn: () =>
      getAllUser({
        page: 1,
        limit: 400,
        role: "seller",
      }),
    select: (response) => ({
      users: response.data,
      totalCount: response.totalCount,
    }),
  });
  const { data: allHouses, isLoading: getAllHouseLoading } = useQuery({
    queryKey: ["getAllHousesForFilter"],
    queryFn: () =>
      getAllHousesForAdmin({
        page: 1,
        limit: 500,
      }),
    select: (response) => ({
      houses: response.data,
      totalCount: response.totalCount,
    }),
  });
  const [maxPrice, setMaxPrice] = useState("");
  useEffect(() => {
    if (!allHouses?.houses?.length) return;

    const maxHouse = allHouses.houses.reduce((prev, current) =>
      current.price > prev.price ? current : prev
    );

    setMaxPrice(maxHouse.price);

    // فقط یکبار همگام‌سازی انجام بده
    setPrice((prev) => Math.min(prev, Number(maxHouse.price)));
  }, [allHouses]);
  useEffect(() => {
    setParams("price", price);
  }, [price]);
  return (
    <div className="w-full flex flex-row flex-wrap  bg-white py-4 rounded-xl mt-4 gap-8">
      <Select
        label="بر اساس فروشنده"
        placeholder={
          isLoading
            ? "در حال دریافت فروشندگان . . . "
            : "جستجو بر اساس فروشندگان "
        }
        isLoading={isLoading}
        selectedKeys={sellerId ? [sellerId] : []}
        onSelectionChange={(keys) => {
          const sellerIdValue = keys.currentKey as string;
          setSellerId(sellerIdValue);
          setParams("sellerId", sellerIdValue);
        }}
        className="w-[400px]"
      >
        {(sellerOpt?.users ?? []).map((items: IUser) => (
          <SelectItem key={items.id}>{items.fullName}</SelectItem>
        ))}
      </Select>{" "}
      <Slider
        className="max-w-md"
        label="جستجو بر اساس قیمت "
        maxValue={Number(maxPrice)}
        minValue={0}
        value={price}
        step={10}
        style={{ width: "200px" }}
        onChange={(value: number | number[]) => {
          if (Array.isArray(value)) {
            setPrice(value[0]);
          } else {
            setPrice(value);
          }
        }}
        radius="sm"
      />
    </div>
  );
}

export default FilterForHousesByAdmin;
