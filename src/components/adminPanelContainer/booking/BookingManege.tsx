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
} from "@heroui/react";

import { MoreVertical, Edit, Trash2 } from "lucide-react";

import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllReserve } from "../../../services/api/Admin/booking/getAllReserve";
import { IReservationItem } from "../../../types/adminPanel/bookingAdminType";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingDots from "../../Loading/loadingOne";
import { getAllUser } from "../../../services/api/Admin/User/getAllUser/getAllUser";
import FilterOfBooking from "./FilterOfBooking";
import RegisterStatus from "./RegisterStatus";
import { divIcon } from "leaflet";
import toast from "react-hot-toast";
import { deleteBooking } from "../../../services/api/Admin/booking/DeleteBook/deleteBooking";

function BookingManage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);
  const sort = searchParams.get("sort") ?? "";
  const status = searchParams.get("status") ?? "";
  const user_id = searchParams.get(" user_id") ?? "";
  const house_id = searchParams.get("house_id") ?? "";
  const {
    isOpen: isRegisterStatus,
    onOpen: onRegisterStatus,
    onOpenChange: onRegisterStatusChange,
  } = useDisclosure();
  const [bookingId, setBookingId] = useState(0);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllReserve", currentPage, sort, status, user_id, house_id],
    queryFn: () =>
      getAllReserve({
        page: currentPage,
        limit: 5,
        sort: sort,
        status: status,
        user_id: user_id,
        house_id: house_id,
      }),
    select: (response) => ({
      bookings: response.data,
      totalCount: response.totalCount,
    }),
  });
  const deleteBookingMutation = useMutation({
    mutationFn: (data: number) => deleteBooking(data),
    onSuccess: () => {
      refetch?.();
      toast.success("عملیات با موفقیت انجام شد ");
    },

    onError: (error) => {
      toast.error("مشکلی پیش آمده است ");
    },
  });
  const totalPages = data ? Math.ceil(data.totalCount / 5) : 0;
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  };

  // 🔹 تبدیل تاریخ به شمسی
  const toPersianDate = (date: string) => {
    return new DateObject({
      date: new Date(date),
      calendar: persian,
      locale: persian_fa,
    }).format("YYYY/MM/DD");
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-0 mt-6">
      <FilterOfBooking />
      <Table
        aria-label="Booking Manage Table"
        className="min-w-[900px]"
        removeWrapper
      >
        <TableHeader>
          <TableColumn>شناسه</TableColumn>
          <TableColumn>از تاریخ</TableColumn>
          <TableColumn>تا تاریخ</TableColumn>
          <TableColumn>وضعیت</TableColumn>
          <TableColumn>شماره تماس</TableColumn>
          <TableColumn>عملیات</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"موردی یافت نشد"}>
          {(data?.bookings ?? []).map((item: IReservationItem) => (
            <TableRow key={item.id}>
              {/* شناسه */}
              <TableCell>{item.id}</TableCell>

              {/* از تاریخ */}
              <TableCell>
                {toPersianDate(item.reservedDates[0]?.value)}
              </TableCell>

              {/* تا تاریخ */}
              <TableCell>
                {toPersianDate(item.reservedDates[1]?.value)}
              </TableCell>

              {/* وضعیت */}
              <TableCell>
                <Chip
                  color={
                    item.status === "pending"
                      ? "warning"
                      : item.status === "confirmed"
                      ? "success"
                      : "danger"
                  }
                  variant="flat"
                  size="sm"
                >
                  {item.status === "pending"
                    ? "در انتظار"
                    : item.status === "confirmed"
                    ? "تایید شده"
                    : "رد شده"}
                </Chip>
              </TableCell>

              {/* شماره تماس */}
              <TableCell>
                {item.sharedMobile ? item.sharedMobile : "-"}
              </TableCell>

              {/* عملیات */}
              <TableCell className="w-10">
                <Dropdown>
                  <DropdownTrigger>
                    <Button className="bg-transparent">
                      <MoreVertical />
                    </Button>
                  </DropdownTrigger>

                  <DropdownMenu aria-label="Actions">
                    <DropdownItem
                      key="edit"
                      className={item.status !== "pending" ? "hidden" : ""}
                    >
                      <Button
                        className="bg-transparent flex items-center gap-2 p-0"
                        onPress={() => {
                          setBookingId(item.id);
                          onRegisterStatus();
                        }}
                      >
                        <Edit size={16} /> ثبت وضعیت
                      </Button>
                    </DropdownItem>

                    <DropdownItem key="delete">
                      <Button
                        className="text-red-500 bg-transparent flex items-center gap-2 p-0"
                        onClick={() => {
                          deleteBookingMutation.mutate(item.id);
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
      </Table>{" "}
      {/* 🟣 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            total={totalPages}
            initialPage={currentPage}
            onChange={handlePageChange}
            variant="bordered"
            showControls
            color="secondary"
            radius="full"
            style={{ direction: "ltr", marginTop: "20px" }}
          />
        </div>
      )}{" "}
      <Modal isOpen={isRegisterStatus} onOpenChange={onRegisterStatusChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader> ثبت وضعیت</ModalHeader>
              <ModalBody>
                <RegisterStatus
                  bookingId={bookingId}
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

export default BookingManage;
