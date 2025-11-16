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
    <div className="bg-[white] rounded-[24px] h-[213px]  px-[16px] py-[16px]">
      <div className="flex justify-between">
        <h1 className="text-[24px] text-[black] font-[700]">مشخصات مسافران</h1>
        <Link
          href={"/createBooking/step1"}
          className="flex flex-row flex-nowrap justify-center items-center gap-2 "
        >
          <div className="mt-1">
            <Image src={EditInfo} alt="icon" width={20} height={20} />
          </div>
          <p className="text-[16px] text-[#7575FE] font-[400]">
            ویرایش مسافران
          </p>
        </Link>
      </div>
      <div className="rounded-[24px] overflow-hidden border border-[#EAEAEA]  mt-8">
        <Table
          removeWrapper
          aria-label="Traveler Table"
          className="w-full border-separate border-spacing-0"
        >
          <TableHeader>
            <TableColumn className="bg-[whtie] font-bold border-b border-[#EAEAEA] text-center py-3">
              بازه سنی
            </TableColumn>
            <TableColumn className="bg-[whtie] font-bold border-b border-[#EAEAEA] text-center py-3">
              نام و نام خانوادگی
            </TableColumn>
            <TableColumn className="bg-[whtie] font-bold border-b border-[#EAEAEA] text-center py-3">
              جنسیت
            </TableColumn>
            <TableColumn className="bg-[whtie] font-bold border-b border-[#EAEAEA] text-center py-3">
              کد ملی / پاسپورت
            </TableColumn>
            <TableColumn className="bg-[whtie] font-bold border-b border-[#EAEAEA] text-center py-3">
              تاریخ تولد
            </TableColumn>
            <TableColumn className="bg-[whtie] font-bold border-b border-[#EAEAEA] text-center py-3">
              خدمات
            </TableColumn>
            <TableColumn className="bg-[whtie] font-bold border-b border-[#EAEAEA] text-center py-3">
              مبلغ خدمات
            </TableColumn>
            <TableColumn className="bg-[whtie] font-bold border-b border-[#EAEAEA] text-center py-3">
              قیمت
            </TableColumn>
          </TableHeader>

          <TableBody>
            <TableRow key="1" className="border-b border-[#EAEAEA]">
              <TableCell className="text-center">بزرگسال</TableCell>
              <TableCell className="text-center">متین قربانزاده</TableCell>
              <TableCell className="text-center">مرد</TableCell>
              <TableCell className="text-center">09391234567</TableCell>
              <TableCell className="text-center">1382/04/17</TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center">2,000,000 تومان</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TravelInfo;
