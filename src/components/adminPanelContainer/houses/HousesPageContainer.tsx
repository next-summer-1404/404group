"use client";

import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

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
} from "@heroui/react";

import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingDots from "../../Loading/loadingOne";
import { IHouse, IHouseResponse } from "../../../types/adminPanel/housesAdmin";
import { getAllHousesForAdmin } from "../../../services/api/Admin/houses/getAllHouse";
import { deleteHouses } from "../../../services/api/Admin/houses/deleteHouses/deleteHouses";
import toast from "react-hot-toast";

function HousesAdminManage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  // --- React Query ---
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllHousesByAdmin", currentPage],
    queryFn: () =>
      getAllHousesForAdmin({
        page: currentPage,
        limit: 5,
      }),
    select: (response: IHouseResponse) => ({
      houses: response.data,
      totalCount: response.totalCount,
    }),
  });
  const deleteHousesMutation = useMutation({
    mutationFn: (data: number) => deleteHouses(data),
    onSuccess: () => {
      refetch?.();
      toast.success("عملیات با موفقیت انجام شد ");
    },

    onError: (error) => {
      toast.error("مشکلی پیش آمده است ");
    },
  });
  const totalPages = data ? Math.ceil(data.totalCount / 10) : 0;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  };

  if (isLoading)
    return (
      <div className="w-full flex justify-center py-10">
        <LoadingDots />
      </div>
    );

  return (
    <div className="w-full overflow-x-auto pb-0">
      {/* ================= Table =================== */}
      <Table
        aria-label="جدول مدیریت خانه‌ها"
        className="min-w-[900px]"
        removeWrapper
      >
        <TableHeader>
          <TableColumn>عنوان</TableColumn>
          <TableColumn>قیمت</TableColumn>
          <TableColumn>نوع معامله</TableColumn>
          <TableColumn>امتیاز</TableColumn>
          <TableColumn>آخرین تغییر</TableColumn>
          <TableColumn>دسته‌بندی</TableColumn>
          <TableColumn>نام کاربر</TableColumn>
          <TableColumn>عملیات</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"خانه‌ای یافت نشد"}>
          {(data?.houses ?? []).map((house: IHouse) => (
            <TableRow key={house.id}>
              <TableCell>{house.title}</TableCell>

              <TableCell>
                <Chip variant="flat" size="sm" color="secondary">
                  {Number(house.price).toLocaleString("fa-IR")} تومان
                </Chip>
              </TableCell>

              <TableCell>
                <Chip
                  color={
                    house.transaction_type === "rental"
                      ? "primary"
                      : house.transaction_type === "reservation"
                      ? "warning"
                      : "success"
                  }
                  variant="flat"
                  size="sm"
                >
                  {house.transaction_type === "rental"
                    ? "اجاره"
                    : house.transaction_type === "reservation"
                    ? "رزرو"
                    : "رهن"}
                </Chip>
              </TableCell>

              <TableCell>{house.rate}</TableCell>

              <TableCell>
                {new Date(house.last_updated).toLocaleDateString("fa-IR")}
              </TableCell>

              <TableCell>{house.categories?.name ?? "-"}</TableCell>

              <TableCell>{house.sellerName ?? "-"}</TableCell>

              {/* ================== Dropdown ================ */}
              <TableCell className="w-10">
                <Dropdown>
                  <DropdownTrigger>
                    <Button className="bg-transparent">
                      <MoreVertical />
                    </Button>
                  </DropdownTrigger>

                  <DropdownMenu aria-label="Actions">
                    <DropdownItem key="edit">
                      <Button
                        className="bg-transparent flex items-center gap-2 p-0"
                        onPress={() => {
                          console.log("ویرایش", house.id);
                        }}
                      >
                        <Edit size={16} /> ویرایش
                      </Button>
                    </DropdownItem>

                    <DropdownItem key="delete">
                      <Button
                        className="text-red-500 bg-transparent flex items-center gap-2 p-0"
                        onClick={() => {
                          deleteHousesMutation.mutate(Number(house.id));
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

      {/* ================= Pagination ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            total={totalPages}
            initialPage={currentPage}
            onChange={handlePageChange}
            variant="bordered"
            showControls
            color="secondary"
            radius="full"
            style={{ direction: "ltr" }}
          />
        </div>
      )}
    </div>
  );
}

export default HousesAdminManage;
