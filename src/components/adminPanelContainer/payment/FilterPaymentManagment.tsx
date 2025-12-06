import { Select, SelectItem, Slider } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllUser } from "../../../services/api/Admin/User/getAllUser/getAllUser";
import { useSetParams } from "../../../utils/hooks/useSetParams";

function FilterPaymentManagment() {
  const { getParams, setParams } = useSetParams();
  const [userId, setUserId] = useState(getParams("user_id", ""));
  const [status, setStatus] = useState(getParams("status", ""));
  const [amount, setAmount] = useState(getParams("amount", ""));
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

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-between ">
      <div className="flex flex-row flex-wrap gap-4">
        {" "}
        <div className="w-[400px] py-4">
          <Select
            label="جستجو کاربران "
            placeholder={
              loadingUsers
                ? "در حال جستجو کاربران . . ."
                : " یک کاربر را انتخاب کنید . . ."
            }
            isLoading={loadingUsers}
            selectedKeys={userId ? [userId] : []}
            onSelectionChange={(keys) => {
              const userIdValue = keys.currentKey as string;
              setUserId(userIdValue);
              setParams("user_id", userIdValue);
            }}
          >
            {(getAllUsers?.users ?? []).map((users) => (
              <SelectItem key={users?.id}>{users?.fullName}</SelectItem>
            ))}
          </Select>
        </div>{" "}
        <div className="w-[200px] py-4">
          <Select
            label="جستجو وضعیت  "
            placeholder={"وضعیت را انتخاب کنید . . ."}
            selectedKeys={status ? [status] : []}
            onSelectionChange={(keys) => {
              const statusValue = keys.currentKey as string;
              setStatus(statusValue);
              setParams("status", statusValue);
            }}
          >
            <SelectItem key={"pending"}>{"در انتظار"}</SelectItem>
            <SelectItem key={"completed"}>{"تکمیل شده"}</SelectItem>
          </Select>
        </div>
      </div>

      <div className="w-[470px] py-4 ">
        {" "}
        <Slider
          label="مبلغ پرداختی"
          aria-label="Temperature"
          className="max-w-md"
          color="foreground"
          value={Number(amount)}
          defaultValue={0.6}
          maxValue={100000000}
          minValue={0}
          showOutline={true}
          size="lg"
          step={100}
          onChange={(value: number | number[]) => {
            const amountValue = Array.isArray(value) ? value[0] : value;
            setAmount(String(amountValue));
            setParams("amount", amountValue);
          }}
        />
      </div>
    </div>
  );
}

export default FilterPaymentManagment;
