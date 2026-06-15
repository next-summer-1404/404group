import React from "react";
import { Button } from "@heroui/button";
import Link from "next/link";
import Image from "next/image";
import EditInfo from "@/assets/createBooking/EditInfo.svg";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

function TravelInfo() {
  return (
    <div
      className="
    bg-white dark:bg-gray-800
    rounded-[24px] 
    px-4 py-4 sm:px-6 sm:py-6 
    transition-colors duration-300
  "
    >
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
        <h1 className="text-[20px] sm:text-[24px] font-[700] text-gray-900 dark:text-gray-100">
          مشخصات مسافران
        </h1>

        <Link
          href={"/createBooking/step1"}
          className="flex flex-row items-center gap-2 text-[14px] sm:text-[16px]"
        >
          <div className="mt-[2px]">
            <Image src={EditInfo} alt="icon" width={20} height={20} />
          </div>
          <p className="text-[#7575FE] dark:text-indigo-400 font-[400]">
            ویرایش مسافران
          </p>
        </Link>
      </div>

      {/* TABLE WRAPPER */}
      <div
        className="
      rounded-[24px] overflow-x-auto
      border border-gray-200 dark:border-gray-700
      mt-6 sm:mt-8
      transition-colors duration-300
    "
      >
        <Table
          removeWrapper
          aria-label="Traveler Table"
          className="min-w-[800px] w-full border-separate border-spacing-0"
        >
          <TableHeader>
            {[
              "بازه سنی",
              "نام و نام خانوادگی",
              "جنسیت",
              "کد ملی / پاسپورت",
              "تاریخ تولد",
              "خدمات",
              "مبلغ خدمات",
              "قیمت",
            ].map((head, i) => (
              <TableColumn
                key={i}
                className="
              bg-gray-50 dark:bg-gray-700 
              text-gray-900 dark:text-gray-100 
              font-bold text-center text-[12px] sm:text-[14px] py-3
              border-b border-gray-200 dark:border-gray-600
              whitespace-nowrap
              transition-colors duration-300
            "
              >
                {head}
              </TableColumn>
            ))}
          </TableHeader>

          <TableBody>
            <TableRow
              key="1"
              className="
            border-b border-gray-200 dark:border-gray-700
            transition-colors duration-300
          "
            >
              <TableCell className="text-center text-gray-800 dark:text-gray-100 text-[12px] sm:text-[14px]">
                بزرگسال
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-100 text-[12px] sm:text-[14px]">
                متین قربانزاده
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-100 text-[12px] sm:text-[14px]">
                مرد
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-100 text-[12px] sm:text-[14px]">
                09391234567
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-100 text-[12px] sm:text-[14px]">
                1382/04/17
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-100 text-[12px] sm:text-[14px]">
                -
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-100 text-[12px] sm:text-[14px]">
                -
              </TableCell>
              <TableCell className="text-center text-gray-800 dark:text-gray-100 text-[12px] sm:text-[14px]">
                2,000,000 تومان
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TravelInfo;
