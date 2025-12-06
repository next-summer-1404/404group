"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Card,
  Skeleton,
} from "@heroui/react";

import { Trash2, MoreVertical, Edit2, Edit } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCommentByAdmin } from "../../../services/api/Admin/comment/getAllComment";
import { useRouter, useSearchParams } from "next/navigation";

import LoadingDots from "../../Loading/loadingOne";
import { ICommentItem } from "../../../types/adminPanel/commentAdminTypes";
import { deleteCommentByAdmin } from "../../../services/api/Admin/comment/deleteCommentByAdmin/deleteCommentByAdmin";
import toast from "react-hot-toast";
import EditCommentModal from "./EditCommentModal";
import FilterCommentManagment from "./FilterCommentManagment";
import { useSetParams } from "../../../utils/hooks/useSetParams";
import { useToPersianDate } from "../../../utils/hooks/useToPersianDate";
import TabelSkeleton from "../../Loading/TabelSkeleton";

function CommentPageContainer() {
  const [commentSelected, setCommentSelected] = useState<ICommentItem>();
  const {
    isOpen: isEditComment,
    onOpen: onEditComment,
    onOpenChange: onEditCommentChange,
  } = useDisclosure();

  const { setParams, getParams } = useSetParams();

  const currentPage = Number(getParams("page", "1"));
  const houseId = getParams("house_id", "");
  const userId = getParams("user_id", "");
  const star = getParams("star", "");

  const { data, isLoading, refetch } = useQuery<any>({
    queryKey: ["getAllComments", currentPage, houseId, userId, star],
    queryFn: () =>
      getAllCommentByAdmin({
        page: currentPage,
        limit: 5,
        user_id: userId,
        house_id: houseId,
        rating: star,
      }),
    select: (response) => ({
      comments: response.data,
      totalCount: response.totalCount,
    }),
  });
  const deleteCoommentMutation = useMutation({
    mutationFn: (data: number) => deleteCommentByAdmin(data),
    onSuccess: () => {
      refetch?.();
      toast.success("عملیات با موفقیت انجام شد ");
    },

    onError: (error) => {
      toast.error("مشکلی پیش آمده است ");
    },
  });
  const totalPages = data ? Math.ceil(data.totalCount / 5) : 0;

  // if (isLoading) {
  //   return (
  //     <div className="w-full flex justify-center py-10">
  //       <LoadingDots />
  //     </div>
  //   );
  // }

  return (
    <div className="w-full mt-6">
      {/* ---------- دستکتاپ (Table) ---------- */}
      <div className="hidden md:block overflow-x-auto">
        <FilterCommentManagment />
        {isLoading ? (
          <TabelSkeleton rows={5} cols={9} />
        ) : (
          <Table aria-label="Comments Table" removeWrapper>
            <TableHeader>
              <TableColumn>شناسه</TableColumn>
              <TableColumn>خانه</TableColumn>
              <TableColumn>کاربر</TableColumn>
              <TableColumn>عنوان</TableColumn>
              <TableColumn>متن</TableColumn>
              <TableColumn>امتیاز</TableColumn>
              <TableColumn>تاریخ</TableColumn>
              <TableColumn>پاسخ به</TableColumn>
              <TableColumn>عملیات</TableColumn>
            </TableHeader>

            <TableBody emptyContent="کامنتی یافت نشد">
              {(data?.comments ?? []).map((item: ICommentItem) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.house_id}</TableCell>
                  <TableCell>{item.user_id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {item.caption}
                  </TableCell>

                  <TableCell>
                    <Chip
                      color={item.rating ? "success" : "default"}
                      variant="flat"
                      size="sm"
                    >
                      {item.rating ?? "—"}
                    </Chip>
                  </TableCell>

                  <TableCell>{useToPersianDate(item.created_at)}</TableCell>
                  <TableCell>{item.parent_comment_id ?? "—"}</TableCell>

                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button className="bg-transparent p-1">
                          <MoreVertical />
                        </Button>
                      </DropdownTrigger>

                      <DropdownMenu aria-label="Actions">
                        <DropdownItem key="edit">
                          <Button
                            className=" bg-transparent flex items-center gap-2 p-0"
                            onPress={() => {
                              onEditComment();
                              setCommentSelected(item);
                              // deleteCoommentMutation.mutate(Number(item.id));
                            }}
                          >
                            <Edit size={16} /> ویرایش
                          </Button>
                        </DropdownItem>
                        <DropdownItem key="delete">
                          <Button
                            className="text-red-500 bg-transparent flex items-center gap-2 p-0"
                            onClick={() => {
                              deleteCoommentMutation.mutate(Number(item.id));
                            }}
                          >
                            <Trash2 size={16} color="red" /> حذف
                          </Button>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      {/* ---------- موبایل (Card View) ---------- */}
      <div className="md:hidden space-y-4 mt-4">
        {(data?.comments ?? []).map((item: ICommentItem) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-xl p-4 border border-gray-200"
          >
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">شناسه: {item.id}</p>
              <Dropdown>
                <DropdownTrigger>
                  <Button className="bg-transparent p-1">
                    <MoreVertical size={20} />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu>
                  <DropdownItem key="edit">
                    <Button
                      className="text-blue-500 bg-transparent flex items-center gap-2 p-0"
                      onClick={() => {
                        // deleteCoommentMutation.mutate(Number(item.id));
                      }}
                    >
                      <Edit2 size={16} color="red" /> ویرایش
                    </Button>
                  </DropdownItem>
                  <DropdownItem key="delete">
                    <Button
                      className="text-red-500 bg-transparent flex items-center gap-2 p-0"
                      onClick={() => {
                        deleteCoommentMutation.mutate(Number(item.id));
                      }}
                    >
                      <Trash2 size={16} color="red" /> حذف
                    </Button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <p className="mt-1 text-sm">
              <span className="font-semibold">خانه:</span> {item.house_id}
            </p>

            <p className="mt-1 text-sm">
              <span className="font-semibold">کاربر:</span> {item.user_id}
            </p>

            <p className="mt-1 text-sm">
              <span className="font-semibold">عنوان:</span> {item.title}
            </p>

            <p className="mt-1 text-sm line-clamp-3">
              <span className="font-semibold">متن:</span> {item.caption}
            </p>

            <p className="mt-1 text-sm">
              <span className="font-semibold">امتیاز:</span>{" "}
              {item.rating ?? "—"}
            </p>

            <p className="mt-1 text-sm">
              <span className="font-semibold">تاریخ:</span>{" "}
              {useToPersianDate(item.created_at)}
            </p>

            <p className="mt-1 text-sm">
              <span className="font-semibold">پاسخ به:</span>{" "}
              {item.parent_comment_id ?? "—"}
            </p>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            total={totalPages}
            initialPage={currentPage}
            onChange={(page: number) => setParams("page", page)}
            showControls
            variant="bordered"
            color="secondary"
            radius="full"
            style={{ direction: "ltr" }}
          />
        </div>
      )}{" "}
      <Modal isOpen={isEditComment} onOpenChange={onEditCommentChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>ویرایش نظر</ModalHeader>
              <ModalBody>
                <EditCommentModal
                  commentSelected={commentSelected}
                  refetch={refetch}
                  onClose={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CommentPageContainer;
