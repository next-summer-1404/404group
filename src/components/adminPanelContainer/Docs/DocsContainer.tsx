"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllDocs } from "../../../services/api/Admin/documents/getAllDoc";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Chip,
} from "@heroui/react";

import LoadingDots from "../../Loading/loadingOne";
import { Eye } from "lucide-react";
import {
  DocumentsResponse,
  DocumentItem,
} from "../../../types/adminPanel/docType";

function DocsContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  const { data, isLoading } = useQuery({
    queryKey: ["getDocs", currentPage],
    queryFn: () =>
      getAllDocs({
        page: currentPage,
        limit: 5,
      }),
    select: (response: DocumentsResponse) => ({
      docs: response.documents,
      totalCount: response.totalCount,
    }),
  });

  const totalPages = data ? Math.ceil(data.totalCount / 5) : 0;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  };
  const translateDocumentType = (type: string) => {
    switch (type) {
      case "contract":
        return "قرارداد";
      case "invoice":
        return "فاکتور";
      case "license":
        return "مجوز";
      default:
        return type; // اگر نوع ناشناخته بود، همان را نشان بده
    }
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
      <Table aria-label="لیست اسناد" removeWrapper>
        <TableHeader>
          <TableColumn>شناسه</TableColumn>
          <TableColumn>شناسه ملک</TableColumn>
          <TableColumn>نوع سند</TableColumn>
          <TableColumn>وضعیت امضا</TableColumn>
          <TableColumn>عملیات</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"سندی یافت نشد"}>
          {(data?.docs ?? []).map((item: DocumentItem) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.houseId}</TableCell>

              <TableCell>
                <Chip color="secondary" size="sm">
                  {translateDocumentType(item.documentType)}
                </Chip>
              </TableCell>

              <TableCell>
                {item.signed ? (
                  <Chip color="success" variant="flat">
                    امضا شده
                  </Chip>
                ) : (
                  <Chip color="danger" variant="flat">
                    امضا نشده
                  </Chip>
                )}
              </TableCell>

              <TableCell>
                <Button
                  onPress={() => window.open(item.filePath, "_blank")}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Eye size={16} />
                  مشاهده سند
                </Button>
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
    </div>
  );
}

export default DocsContainer;
