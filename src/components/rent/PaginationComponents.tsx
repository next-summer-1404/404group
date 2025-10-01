"use client";
import React from "react";
import { Pagination } from "@heroui/react";

export default function PaginationComponents() {
  return (
    <Pagination
      style={{ direction: "ltr" }}
      disableCursorAnimation
      loop
      showControls
      color="secondary"
      className="gap-2"
      initialPage={1}
      radius="full"
      total={10}
      variant="bordered"
    />
  );
}
