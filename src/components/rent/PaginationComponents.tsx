"use client";
import React from "react";
import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationComponents({
  totalCount,
}: {
  totalCount: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className={`${totalCount ? "block" : "hidden"}`}>
      {totalCount && (
        <Pagination
          style={{ direction: "ltr" }}
          disableCursorAnimation
          loop
          showControls
          color="secondary"
          className="gap-2"
          initialPage={Number(searchParams?.get("page") ?? 1)}
          radius="full"
          total={totalCount}
          variant="bordered"
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}
