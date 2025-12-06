"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllPayments } from "../../../services/api/Admin/payment/getAllPayment";
import { useSearchParams, useRouter } from "next/navigation";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/react";

import { MoreVertical, Edit, Trash2 } from "lucide-react";
import LoadingDots from "../../Loading/loadingOne";
import { PaymentItem } from "../../../types/adminPanel/paymentAdminTypes";
import { deletePayment } from "../../../services/api/Admin/payment/deletePayment/deletePayment";
import toast from "react-hot-toast";
import { verifyPayment } from "../../../services/api/Admin/payment/verifyPayment/verifyPayment";
import EditPaymentModal from "./EditPaymentModal";
import { useSetParams } from "../../../utils/hooks/useSetParams";
import TabelSkeleton from "../../Loading/TabelSkeleton";
import FilterPaymentManagment from "./FilterPaymentManagment";

// نوع داده پرداخت

function PaymentContainer() {
  const [paymentSelected, setPaymentSelected] = useState<PaymentItem>();

  const {
    isOpen: isEditPayment,
    onOpen: onEditPayment,
    onOpenChange: onEditPaymentChange,
  } = useDisclosure();
  const { setParams, getParams } = useSetParams();
  const currentPage = Number(getParams("page", "1"));
  const status = getParams("status", "");
  const userId = getParams("user_id", "");
  const amount = getParams("amount", "");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllPayments", currentPage, status, userId, amount],
    queryFn: () =>
      getAllPayments({
        page: currentPage,
        limit: 5,
        status: status,
        user_id: userId,
        amount: amount,
      }),
    select: (response) => ({
      payments: response.data,
      totalCount: response.totalCount,
    }),
  });
  const deletePaymentMutation = useMutation({
    mutationFn: (data: number) => deletePayment(data),
    onSuccess: () => {
      refetch?.();
      toast.success("عملیات با موفقیت انجام شد ");
    },

    onError: (error) => {
      toast.error("مشکلی پیش آمده است ");
    },
  });
  const verifyPaymentMutation = useMutation({
    mutationFn: (data: number) => verifyPayment(data),
    onSuccess: () => {
      refetch?.();
      toast.success("عملیات با موفقیت انجام شد ");
    },

    onError: (error) => {
      toast.error("مشکلی پیش آمده است ");
    },
  });
  const totalPages = data ? Math.ceil(data.totalCount / 5) : 0;

  return (
    <div className="w-full overflow-x-auto pb-10">
      <FilterPaymentManagment />
      {isLoading ? (
        <TabelSkeleton rows={5} cols={5} />
      ) : (
        <Table aria-label="جدول مدیریت پرداخت‌ها" removeWrapper>
          <TableHeader>
            <TableColumn>مبلغ</TableColumn>
            <TableColumn>وضعیت</TableColumn>
            <TableColumn>توضیحات</TableColumn>
            <TableColumn>تاریخ</TableColumn>
            <TableColumn>عملیات</TableColumn>
          </TableHeader>

          <TableBody emptyContent={"پرداختی پیدا نشد"}>
            {(data?.payments ?? []).map((item: PaymentItem) => (
              <TableRow key={item.id}>
                {/* مبلغ */}
                <TableCell className="font-medium">
                  <Chip color={"secondary"} variant="flat" size="sm">
                    {" "}
                    {Number(item.amount).toLocaleString("fa-IR")} تومان
                  </Chip>
                </TableCell>

                {/* وضعیت */}
                <TableCell>
                  <Chip
                    color={
                      item.status === "completed"
                        ? "success"
                        : item.status === "pending"
                        ? "warning"
                        : "default"
                    }
                    variant="flat"
                    size="sm"
                  >
                    {item.status === "completed"
                      ? "تکمیل شده"
                      : item.status === "pending"
                      ? "در انتظار"
                      : item.status}
                  </Chip>
                </TableCell>

                {/* توضیحات */}
                <TableCell>{item.description ?? "-"}</TableCell>

                {/* تاریخ */}
                <TableCell>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("fa-IR")
                    : "-"}
                </TableCell>

                {/* عملیات */}
                <TableCell className="w-10">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="bg-transparent">
                        <MoreVertical />
                      </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="actions">
                      <DropdownItem key="edit">
                        <Button
                          onPress={() => {
                            setPaymentSelected(item);
                            onEditPayment();
                          }}
                          className="flex items-center gap-2 bg-transparent p-0"
                        >
                          <Edit size={16} />
                          ویرایش پرداختی
                        </Button>
                      </DropdownItem>
                      <DropdownItem key="accepet">
                        <Button
                          onPress={() =>
                            verifyPaymentMutation.mutate(Number(item.id))
                          }
                          className="flex items-center gap-2 bg-transparent p-0"
                        >
                          <Edit size={16} />
                          تایید پرداختی
                        </Button>
                      </DropdownItem>

                      <DropdownItem key="delete">
                        <Button
                          className="flex items-center gap-2 text-[red] bg-transparent p-0"
                          onClick={() => {
                            deletePaymentMutation.mutate(Number(item.id));
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
      {/* صفحه‌بندی */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-5">
          <Pagination
            total={totalPages}
            initialPage={currentPage}
            onChange={(page: number) => setParams("page", page)}
            variant="bordered"
            showControls
            color="secondary"
            radius="full"
            style={{ direction: "ltr" }}
          />
        </div>
      )}{" "}
      <Modal isOpen={isEditPayment} onOpenChange={onEditPaymentChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader> ثبت وضعیت</ModalHeader>
              <ModalBody>
                <EditPaymentModal
                  paymentSelected={paymentSelected}
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

export default PaymentContainer;
