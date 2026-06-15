"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Input,
} from "@heroui/react";

import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { getAllCategory } from "../../../services/api/Admin/category/getAllCategory";
import LoadingDots from "../../Loading/loadingOne";

function CategoryContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  const [selectedId, setSelectedId] = useState<string>("");
  const [newName, setNewName] = useState("");

  const {
    isOpen: isEditOpen,
    onOpen: onOpenEdit,
    onOpenChange: onEditChange,
  } = useDisclosure();

  // 📌 دریافت دسته‌بندی‌ها
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllCategory", currentPage],
    queryFn: () =>
      getAllCategory({
        page: currentPage,
        limit: 5,
      }),
    select: (response) => ({
      categories: response.data,
      totalCount: response.totalCount,
    }),
  });

  //   // 📌 حذف دسته‌بندی
  //   const deleteMutation = useMutation({
  //     mutationFn: (id: string) => deleteCategory(id),
  //     onSuccess: () => {
  //       toast.success("با موفقیت حذف شد");
  //       refetch();
  //     },
  //     onError: () => toast.error("مشکلی رخ داده است"),
  //   });

  //   // 📌 ویرایش دسته‌بندی
  //   const updateMutation = useMutation({
  //     mutationFn: (data: { id: string; name: string }) => updateCategory(data),
  //     onSuccess: () => {
  //       toast.success("ویرایش انجام شد");
  //       refetch();
  //     },
  //     onError: () => toast.error("خطا در ویرایش"),
  //   });

  // 📌 صفحه‌بندی
  const totalPages = data ? Math.ceil(data.totalCount / 5) : 0;
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <LoadingDots />
      </div>
    );
  }
  return (
    <div className="w-full overflow-x-auto mt-6">
      <Table
        aria-label="Category Manage Table"
        className="min-w-[600px]"
        removeWrapper
      >
        <TableHeader>
          <TableColumn>شناسه</TableColumn>
          <TableColumn>نام</TableColumn>
          <TableColumn>عملیات</TableColumn>
        </TableHeader>

        <TableBody emptyContent="دسته‌ای یافت نشد">
          {(data?.categories ?? []).map(
            (item: { id: string; name: string }) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>

                <TableCell>{item.name}</TableCell>

                <TableCell className="w-10">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="bg-transparent">
                        <MoreVertical />
                      </Button>
                    </DropdownTrigger>

                    <DropdownMenu>
                      {/* ویرایش */}
                      <DropdownItem key="edit">
                        <Button
                          className="bg-transparent flex items-center gap-2 p-0"
                          onPress={() => {
                            setSelectedId(item.id);
                            setNewName(item.name);
                            onOpenEdit();
                          }}
                        >
                          <Edit size={16} /> ویرایش
                        </Button>
                      </DropdownItem>

                      {/* حذف */}
                      <DropdownItem key="delete">
                        <Button
                          className="text-red-500 bg-transparent flex items-center gap-2 p-0"
                          //   onClick={() => deleteMutation.mutate(item.id)}
                        >
                          <Trash2 size={16} color="red" /> حذف
                        </Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      {/* صفحه بندی */}
      <div className="flex justify-center mt-4">
        <Pagination
          total={totalPages}
          initialPage={currentPage}
          onChange={handlePageChange}
          variant="bordered"
          showControls
          color="secondary"
        />
      </div>

      {/* مودال ویرایش */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>ویرایش دسته‌بندی</ModalHeader>
              <ModalBody>
                <Input
                  label="نام جدید"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />

                <Button
                  color="secondary"
                  className="mt-3"
                  onPress={() => {
                    // updateMutation.mutate({ id: selectedId, name: newName });
                    onClose();
                  }}
                >
                  ذخیره
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CategoryContainer;
