"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../../services/api/Admin/User/getAllUser/getAllUser";
import { IUser } from "../../../types/adminPanel/adminPanelTypes";

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

import { useSearchParams, useRouter } from "next/navigation";
import LoadingDots from "../../Loading/loadingOne";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import EditUserByAdmin from "./EditUserByAdmin";
import EditRoleUser from "./EditRoleUser";
import FilterOfUserTable from "./FilterOfUserTable";

function UsersAdminManage() {
  const [user, setUser] = useState<IUser | undefined>();

  // 🔹 مودال ۱ — ویرایش اطلاعات کاربر
  const {
    isOpen: isEditUserOpen,
    onOpen: onEditUserOpen,
    onOpenChange: onEditUserChange,
  } = useDisclosure();

  // 🔹 مودال ۲ — ویرایش نقش کاربر
  const {
    isOpen: isEditRoleOpen,
    onOpen: onEditRoleOpen,
    onOpenChange: onEditRoleChange,
  } = useDisclosure();

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") ?? 1);
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const location = searchParams.get("location") ?? "";
  // useEffect(() => console.log(search), [search]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllUser", currentPage, search, sort, location],
    queryFn: () =>
      getAllUser({
        page: currentPage,
        limit: 5,
        email: search,
        role: sort,
        membershipDate: location,
      }),
    select: (response) => ({
      users: response.data,
      totalCount: response.totalCount,
    }),
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
    <div className="w-full overflow-x-auto pb-0">
      <FilterOfUserTable />
      <Table
        aria-label="جدول مدیریت کاربران"
        className="min-w-[900px]"
        removeWrapper
      >
        <TableHeader>
          <TableColumn>نام</TableColumn>
          <TableColumn>نقش</TableColumn>
          <TableColumn>تاریخ عضویت</TableColumn>
          <TableColumn>وضعیت ایمیل</TableColumn>
          <TableColumn>ایمیل</TableColumn>
          <TableColumn>شماره موبایل</TableColumn>
          <TableColumn>عملیات</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"کاربری یافت نشد"}>
          {(data?.users ?? []).map((user: IUser) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.fullName ? user.fullName : "ناشناس"}
              </TableCell>

              <TableCell>
                <Chip
                  color={
                    user.role === "admin"
                      ? "secondary"
                      : user.role === "seller"
                      ? "primary"
                      : "success"
                  }
                  variant="flat"
                  size="sm"
                >
                  {user.role}
                </Chip>
              </TableCell>

              <TableCell>
                {user.membershipDate
                  ? new Date(user.membershipDate).toLocaleDateString("fa-IR")
                  : "-"}
              </TableCell>

              <TableCell>
                <Chip
                  color={user.emailVerified ? "success" : "danger"}
                  variant="flat"
                  size="sm"
                >
                  {user.emailVerified ? "تأیید شده" : "تأیید نشده"}
                </Chip>
              </TableCell>

              <TableCell>
                {user.email ? (
                  <Chip variant="flat" size="sm">
                    {user.email}
                  </Chip>
                ) : (
                  <div>-</div>
                )}
              </TableCell>

              <TableCell>{user.phoneNumber ?? "-"}</TableCell>

              <TableCell className="w-10">
                <Dropdown>
                  <DropdownTrigger>
                    <Button className="bg-transparent">
                      <MoreVertical />
                    </Button>
                  </DropdownTrigger>

                  <DropdownMenu aria-label="Static Actions">
                    {/* 🔹 دکمه ویرایش کاربر */}
                    <DropdownItem key="editUser">
                      <Button
                        className="flex items-center gap-2 bg-transparent p-0"
                        onPress={() => {
                          setUser(user);
                          onEditUserOpen();
                        }}
                      >
                        <Edit size={16} /> ویرایش
                      </Button>
                    </DropdownItem>

                    {/* 🔹 دکمه ویرایش نقش کاربر */}
                    <DropdownItem key="editRole">
                      <Button
                        className="flex items-center gap-2 bg-transparent p-0"
                        onPress={() => {
                          setUser(user);
                          onEditRoleOpen();
                        }}
                      >
                        <Edit size={16} /> ویرایش نقش
                      </Button>
                    </DropdownItem>

                    <DropdownItem key="delete">
                      <Button className="flex items-center gap-2 text-[red] bg-transparent p-0">
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
            style={{ direction: "ltr" }}
          />
        </div>
      )}

      {/* 🔵 MODAL 1 — ویرایش اطلاعات کاربر */}
      <Modal isOpen={isEditUserOpen} onOpenChange={onEditUserChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>ویرایش کاربر</ModalHeader>
              <ModalBody>
                <EditUserByAdmin
                  user={user}
                  refetch={refetch}
                  onClose={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* 🟠 MODAL 2 — ویرایش نقش */}
      <Modal isOpen={isEditRoleOpen} onOpenChange={onEditRoleChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                ویرایش نقش {user?.fullName ? user?.fullName : "ناشناس"}
              </ModalHeader>
              <ModalBody>
                <EditRoleUser user={user} onClose={onClose} refetch={refetch} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default UsersAdminManage;
