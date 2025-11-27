"use client";

import React, { useState } from "react";
import { Select, SelectItem, Button } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { postContinueStatus } from "../../../services/api/Admin/booking/registerStatus/continueStatus";
import { postCancleStatus } from "../../../services/api/Admin/booking/registerStatus/cancelStatus";
export interface RegisterStatusProps {
  bookingId?: number;
  refetch?: () => void;
  onClose?: () => void;
}

function RegisterStatus({ bookingId, refetch, onClose }: RegisterStatusProps) {
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const continueMutation = useMutation({
    mutationFn: (data: number) => postContinueStatus(data),
    onSuccess: () => {
      refetch?.();
      onClose?.();
      setIsLoading(false);
      toast.success("عملیات با موفقیت انجام شد ");
    },

    onError: (error) => {
      toast.error("مشکلی پیش آمده است ");
    },
  });
  const cancleMutation = useMutation({
    mutationFn: (data: any) => postCancleStatus(data.id),
    onSuccess: () => {
      refetch?.();
      onClose?.();
      setIsLoading(false);
      toast.success("عملیات با موفقیت انجام شد ");
    },

    onError: (error) => {
      toast.error("مشکلی پیش آمده است ");
    },
  });
  const handleSubmit = () => {
    setIsLoading(true);
    // console.log("مقدار انتخاب شده:", status);
    if (status === "approved" && bookingId) {
      continueMutation.mutate(bookingId);
    } else if (status === "rejected" && bookingId) {
      cancleMutation.mutate(bookingId);
    }
  };
  return (
    <div className="flex flex-col gap-4 pb-4 ">
      <Select
        label="وضعیت ثبت‌نام"
        placeholder="انتخاب وضعیت"
        selectedKeys={status ? [status] : []}
        onSelectionChange={(keys) => setStatus(Array.from(keys)[0] as string)}
      >
        <SelectItem key="approved">تایید</SelectItem>
        <SelectItem key="rejected">رد</SelectItem>
      </Select>

      <Button
        isLoading={isLoading}
        onPress={handleSubmit}
        color="primary"
        className=" text-white rounded-full p-2 w-full"
      >
        ثبت وضعیت
      </Button>
    </div>
  );
}

export default RegisterStatus;
