"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Select, SelectItem, Button } from "@heroui/react";
import { EditUserByAdminProps } from "./EditUserByAdmin";
import { useMutation } from "@tanstack/react-query";
import { putRoles } from "../../../services/api/Admin/User/putRoles/putRoles";
import toast from "react-hot-toast";

function EditRoleUser({ user, refetch, onClose }: EditUserByAdminProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      role: user?.role || "buyer",
    },
  });
  const putRolesMutation = useMutation({
    mutationFn: (data: string) => putRoles(user!.id, data),
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
    console.log("Role Selected:", data.role);
    putRolesMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-sm pb-4"
    >
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Select
            label="نقش کاربر"
            placeholder="انتخاب نقش"
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
          >
            <SelectItem key="admin">ادمین</SelectItem>
            <SelectItem key="buyer">خریدار</SelectItem>
            <SelectItem key="seller">فروشنده</SelectItem>
          </Select>
        )}
      />

      <Button
        isLoading={isLoading}
        type="submit"
        className="bg-[#7575FE] text-white rounded-full "
      >
        ویرایش
      </Button>
    </form>
  );
}

export default EditRoleUser;
