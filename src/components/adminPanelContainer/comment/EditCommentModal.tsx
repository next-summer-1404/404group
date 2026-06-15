import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Textarea, Button } from "@heroui/react";
import { ICommentItem } from "../../../types/adminPanel/commentAdminTypes";
import {
  IPutCommentByAdmin,
  putCommentByAdmin,
} from "../../../services/api/Admin/comment/putComment/putCommentByAdmin";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface IEditCommentModalProps {
  commentSelected?: ICommentItem;
  refetch?: () => void;
  onClose?: () => void;
}

function EditCommentModal({
  commentSelected,
  refetch,
  onClose,
}: IEditCommentModalProps) {
  if (!commentSelected) {
    return <div>کامنتی انتخاب نشده است</div>;
  }
  const [isLoding, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: commentSelected?.title ?? "",
      caption: commentSelected?.caption ?? "",
      rating: Number(commentSelected?.rating) || 0,
    },
  });

  const rating = watch("rating");
  const putCommentMutation = useMutation({
    mutationFn: (data: IPutCommentByAdmin) =>
      putCommentByAdmin(commentSelected.id, data),

    onSuccess: () => {
      setIsLoading(false);
      refetch?.();
      onClose?.();
      toast.success("عملیات با موفقیت انجام شد ");
    },

    onError: (error) => {
      toast.error("مشکلی پیش آمده است ");
    },
  });
  const onSubmit = (data: any) => {
    setIsLoading(true);
    putCommentMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
      <Input
        label="عنوان نظر"
        placeholder="عنوان را وارد کنید"
        {...register("title")}
      />

      <Textarea
        label="متن نظر"
        placeholder="متن نظر را وارد کنید"
        {...register("caption")}
        minRows={4}
      />

      {/* ⭐ ستاره‌ها */}
      <div>
        <p className="text-sm mb-1 font-medium">امتیاز</p>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                type="button"
                key={index}
                onClick={() => setValue("rating", starValue)}
                className={`text-3xl ${
                  starValue <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button
          type="submit"
          color="primary"
          isLoading={isLoding}
          className=" text-white rounded-full mt-4 w-full"
        >
          ثبت تغییرات
        </Button>
      </div>
    </form>
  );
}

export default EditCommentModal;
