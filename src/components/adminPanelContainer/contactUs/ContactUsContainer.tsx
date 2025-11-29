"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { getContactUs } from "../../../services/api/Admin/contactUs/getCantactUs";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Chip,
} from "@heroui/react";

import LoadingDots from "../../Loading/loadingOne";
import { MoreVertical, Eye, Trash2 } from "lucide-react";
import { IContactItem } from "../../../types/adminPanel/contactUsTypes";
import { deleteContactUsByAdmin } from "../../../services/api/Admin/contactUs/deleteContactUs";
import toast from "react-hot-toast";

function ContactUsContainer() {
  const [selectedMessage, setSelectedMessage] = useState<IContactItem>();

  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onOpenChange: onViewChange,
  } = useDisclosure();

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getContactUs", currentPage],
    queryFn: () =>
      getContactUs({
        page: currentPage,
        limit: 5,
      }),
    select: (response) => ({
      contactUs: response.data,
      totalCount: response.totalCount,
    }),
  });
  const deleteContactUsMutation = useMutation({
    mutationFn: (data: number) => deleteContactUsByAdmin(data),
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

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-10">
      <Table aria-label="جدول پیام های تماس با ما" removeWrapper>
        <TableHeader>
          <TableColumn>شناسه</TableColumn>
          <TableColumn>عنوان</TableColumn>
          <TableColumn>پیام</TableColumn>
          <TableColumn>عملیات</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"پیامی یافت نشد"}>
          {(data?.contactUs ?? []).map((item: IContactItem) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>

              <TableCell>
                <Chip color="secondary" variant="flat" size="sm">
                  {item.title}
                </Chip>
              </TableCell>

              <TableCell>
                {item.message.length > 30
                  ? item.message.slice(0, 30) + "..."
                  : item.message}
              </TableCell>

              <TableCell className="w-10">
                <Dropdown>
                  <DropdownTrigger>
                    <Button className="bg-transparent">
                      <MoreVertical />
                    </Button>
                  </DropdownTrigger>

                  <DropdownMenu aria-label="actions">
                    <DropdownItem key="view">
                      <Button
                        onPress={() => {
                          setSelectedMessage(item);
                          onViewOpen();
                        }}
                        className="flex items-center gap-2 bg-transparent p-0"
                      >
                        <Eye size={16} />
                        مشاهده پیام
                      </Button>
                    </DropdownItem>
                    <DropdownItem key="delete">
                      <Button
                        onPress={() => {
                          deleteContactUsMutation.mutate(Number(item.id));
                        }}
                        className="text-red-500 bg-transparent flex items-center gap-2 p-0"
                      >
                        <Trash2 size={16} />
                        حذف
                      </Button>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* صفحه‌بندی */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-5">
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

      {/* مودال نمایش پیام */}
      <Modal isOpen={isViewOpen} onOpenChange={onViewChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>مشاهده پیام</ModalHeader>
              <ModalBody className="space-y-3 pb-4">
                <p className="text-gray-600">
                  <strong className="text-black">عنوان:</strong>{" "}
                  {selectedMessage?.title}
                </p>
                <p className="text-gray-600">
                  <strong className="text-black">متن پیام:</strong>
                </p>
                <p className="whitespace-pre-line text-gray-700">
                  {selectedMessage?.message}
                </p>

                <Button
                  onPress={onClose}
                  color="primary"
                  className="rounded-full"
                >
                  بستن
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ContactUsContainer;
