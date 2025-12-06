import { Select, SelectItem, Slider } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllUser } from "../../../services/api/Admin/User/getAllUser/getAllUser";
import { getAllHousesForAdmin } from "../../../services/api/Admin/houses/getAllHouse";
import { IHouseResponse } from "../../../types/adminPanel/housesAdmin";
import { useSetParams } from "../../../utils/hooks/useSetParams";
import { Delete, DeleteIcon, X } from "lucide-react";

function FilterCommentManagment() {
  const { getParams, setParams } = useSetParams();
  const [userId, setUserId] = useState<string>(getParams("user_id", ""));
  const [houseId, setHouseId] = useState<string>(getParams("house_id", ""));
  const [star, setStar] = useState<string>(getParams("star", ""));
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
  return (
    <div className="flex flex-row flex-wrap gap-4">
      <div className="w-[400px] py-4">
        {" "}
        <Select
          label="جستجو کاربران"
          isLoading={loadingUsers}
          selectedKeys={userId ? [userId] : []}
          placeholder={
            loadingUsers
              ? "در حال جستجو کاربران"
              : "یه کاربر را انتخاب کنید . . ."
          }
          onSelectionChange={(keys) => {
            const userIdValue = keys.currentKey as string;
            setParams("user_id", userIdValue);
            setUserId(userIdValue);
          }}
        >
          {(getAllUsers?.users ?? []).map((users) => (
            <SelectItem key={users.id}>{users.fullName}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="w-[400px] py-4">
        <Select
          label="جستجو خونه"
          placeholder={
            loadingHouses ? "در حال جستجو خانه" : "یک خانه را انتخاب کنید . . ."
          }
          selectedKeys={houseId ? [houseId] : []}
          onSelectionChange={(keys) => {
            const houseIdValue = keys.currentKey as string;
            setParams("house_id", houseIdValue);
            setHouseId(houseIdValue);
          }}
        >
          {(getAllHousesBook?.houses ?? []).map((houses) => (
            <SelectItem key={houses.id}>{houses.title}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="w-[400px] py-4">
        {" "}
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="flex items-center gap-4">
            <Slider
              className="max-w-md"
              color="foreground"
              value={Number(star)} // کنترل شده
              label="میزان امتیاز"
              maxValue={5}
              minValue={0}
              showSteps={true}
              size="lg"
              step={1}
              onChange={(starValue: number | number[]) => {
                const val = Array.isArray(starValue) ? starValue[0] : starValue;
                setStar(String(val));
                setParams("star", val);
              }}
            />

            {/* دکمه حذف مقدار */}
            {star && (
              <button
                onClick={() => {
                  setStar("");
                  setParams("star", undefined); // حذف از پارامز
                }}
                className=" pt-6 rounded-md  text-black hover:scale-120 transition"
              >
                <X />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterCommentManagment;
