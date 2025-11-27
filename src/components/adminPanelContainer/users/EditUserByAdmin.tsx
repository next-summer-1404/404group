"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Checkbox } from "@heroui/react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IUser } from "../../../types/adminPanel/adminPanelTypes";
import { useMutation } from "@tanstack/react-query";
import { putUsers } from "../../../services/api/Admin/User/PutUsers/PutUsers";
import toast from "react-hot-toast";

export interface EditUserByAdminProps {
  user?: IUser;
  refetch?: () => void;
  onClose?: () => void;
}
export interface IEditUserForm {
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailVerified: boolean;
  membershipDate: Date | null;
  profilePicture: string;
}

export default function EditUserByAdmin({
  user,
  refetch,
  onClose,
}: EditUserByAdminProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: user?.email || "",
      fullName: user?.fullName || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
      emailVerified: user?.emailVerified || false,
      membershipDate: user?.membershipDate
        ? new Date(user.membershipDate)
        : null,
      profilePicture: user?.profilePicture || "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const putUserMutation = useMutation({
    mutationFn: (data: IEditUserForm) => putUsers(user!.id, data),
    onSuccess: () => {
      refetch?.();
      onClose?.();
      setIsLoading(false);
      toast.success("عملیات با موفقیت انجام شد ");
    },
    onError: (error) => {
      toast.success("مشکلی پیش آمده است ");
    },
  });
  const onSubmit = (data: any) => {
    setIsLoading(true);
    console.log("Form Data:", data);
    putUserMutation.mutate(data);
  };

  if (!user) return <div>کاربری انتخاب نشده</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-lg"
    >
      {/* ایمیل */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="ایمیل" label="ایمیل" />
        )}
      />

      {/* نام کامل */}
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="نام کامل" label="نام کامل" />
        )}
      />

      {/* نام */}
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="نام" label="نام" />
        )}
      />

      {/* نام خانوادگی */}
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="نام خانوادگی" label="نام خانوادگی" />
        )}
      />

      {/* شماره موبایل */}
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="شماره موبایل" label="شماره موبایل" />
        )}
      />

      {/* وضعیت ایمیل */}
      <Controller
        name="emailVerified"
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
            <span>ایمیل تأیید شده</span>
          </div>
        )}
      />

      {/* تاریخ عضویت */}
      <Controller
        name="membershipDate"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col w-full">
            <label className="text-sm font-[600] text-gray-600 mb-1">
              تاریخ عضویت
            </label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={field.value ? new Date(field.value) : null}
              onChange={(date: any) => field.onChange(date.toDate())}
              calendarPosition="bottom-right"
              inputClass="custom-input"
              style={{
                width: "100%",
                height: "48px",
                borderRadius: "31px",
                padding: "8px",
                background: "#F9F9F9",
              }}
            />
          </div>
        )}
      />

      {/* عکس پروفایل */}
      <Controller
        name="profilePicture"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="لینک عکس پروفایل" label="پروفایل" />
        )}
      />

      <Button
        type="submit"
        color="primary"
        isLoading={isLoading}
        // variant="bordered"
        className=" text-white rounded-full mt-4"
      >
        ویرایش
      </Button>
    </form>
  );
}
