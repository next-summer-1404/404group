import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Textarea, Button, Select, SelectItem } from "@heroui/react";
import { PaymentItem } from "../../../types/adminPanel/paymentAdminTypes";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IPustPayment, putPayment } from "../../../services/api/Admin/payment/putPayment/putPayment";



interface IEditPaymentModalProps {
  paymentSelected?: PaymentItem;
  refetch?: () => void;
  onClose?: () => void;
}

function EditPaymentModal({
  paymentSelected,
  refetch,
  onClose,
}: IEditPaymentModalProps) {
  if (!paymentSelected) {
    return <div>پرداختی انتخاب نشده است</div>;
  }

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      amount: paymentSelected?.amount || 0,
      description: paymentSelected?.description || "",
      status: paymentSelected?.status || "pending",
    },
  });

  // ⬅ تابع API خودت را اینجا جایگزین کن
  const mutation = useMutation({
    mutationFn: async (data: IPustPayment) =>
      putPayment(paymentSelected.id, data),

    onSuccess: () => {
      setIsLoading(false);
      toast.success("پرداخت با موفقیت ویرایش شد");
      refetch?.();
      onClose?.();
    },

    onError: () => {
      setIsLoading(false);
      toast.error("مشکلی پیش آمده است");
    },
  });

  const onSubmit = (data: any) => {
    setIsLoading(true);
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
      <Input
        type="number"
        label="مبلغ"
        placeholder="مبلغ را وارد کنید"
        {...register("amount", { valueAsNumber: true })}
      />

      <Textarea
        label="توضیحات"
        placeholder="توضیحات پرداخت را وارد کنید"
        {...register("description")}
        minRows={4}
      />

      <div>
        <p className="text-sm font-medium mb-1">وضعیت پرداخت</p>

        <Select
          placeholder="وضعیت را انتخاب کنید"
          defaultSelectedKeys={[paymentSelected?.status]}
          onChange={(e) => setValue("status", e.target.value)}
        >
          <SelectItem key="completed">پرداخت شده</SelectItem>
          <SelectItem key="pending">در انتظار پرداخت</SelectItem>
        </Select>
      </div>

      {/* دکمه ثبت */}
      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          color="primary"
          isLoading={isLoading}
          className="text-white rounded-full w-full"
        >
          ثبت تغییرات
        </Button>
      </div>
    </form>
  );
}

export default EditPaymentModal;
