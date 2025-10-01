"use client";
import { Input } from "@heroui/input";
import { Button, Select, SelectItem } from "@heroui/react";
import Image from "next/image";
import React from "react";
import search from "@/assets/rent/search.svg";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

function RentFilter() {
  return (
    <div
      className=" mt-36 flex flex-row flex-wrap gap-[24px] px-[50px] "
      style={{ direction: "rtl" }}
    >
      <div className="flex flex-row gap-[12px] ">
        {" "}
        <Button
          className="bg-[#7575FE] rounded-full size-[48px] relative top-[33px] right-[25px] z-9"
          style={{ padding: 0 }}
          isIconOnly
          aria-label="Take a photo"
          color="warning"
          variant="faded"
        >
          <Image src={search} width={24} height={24} alt="search" />
        </Button>{" "}
        <div className="flex flex-col gap-[12px] ">
          <label htmlFor="search" className="text-right font-semibold">
            جستجو
          </label>
          <Input
            placeholder="جستجو کنید . . ."
            name="search"
            type="text"
            className=" w-[351px] h-[46px]  "
            radius="full"
          />{" "}
        </div>{" "}
      </div>
      <div className="flex flex-col gap-[12px]">
        <label htmlFor="Select" className="text-right font-semibold">
          مرتب سازی بر اساس{" "}
        </label>
        <Select
          name="Select"
          className="max-w-xs"
          placeholder="انتخاب کنید "
          style={{ direction: "ltr", width: "208px", height: "48px" }}
          radius="full"
          // className="w-[208px] h-[48px]"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key} style={{ direction: "rtl" }}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>{" "}
      <div className="flex flex-col gap-[12px]">
        <label htmlFor="Select" className="text-right font-semibold">
          مرتب سازی بر اساس{" "}
        </label>
        <Select
          name="Select"
          className="max-w-xs"
          placeholder="انتخاب کنید "
          style={{ direction: "ltr", width: "208px", height: "48px" }}
          radius="full"
          // className="w-[208px] h-[48px]"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key} style={{ direction: "rtl" }}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>{" "}
      <div className="flex flex-col gap-[12px]">
        <label htmlFor="Select" className="text-right font-semibold">
          مرتب سازی بر اساس{" "}
        </label>
        <Select
          name="Select"
          className="max-w-xs"
          placeholder="انتخاب کنید "
          style={{ direction: "ltr", width: "208px", height: "48px" }}
          radius="full"
          // className="w-[208px] h-[48px]"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key} style={{ direction: "rtl" }}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>{" "}
      <div className="flex flex-col gap-[12px]">
        <label htmlFor="Select" className="text-right font-semibold">
          مرتب سازی بر اساس{" "}
        </label>
        <Select
          name="Select"
          className="max-w-xs"
          placeholder="انتخاب کنید "
          style={{ direction: "ltr", width: "208px", height: "48px" }}
          radius="full"
          // className="w-[208px] h-[48px]"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key} style={{ direction: "rtl" }}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-[12px] mr-8">
        <label htmlFor="maxPrice">حداکثر قیمت</label>
        <Input
          placeholder="وارد کنید "
          name="maxPrice"
          type="text"
          className=" w-[208px] h-[46px] "
          radius="full"
        />{" "}
      </div>{" "}
      <div className="border-r-1 border-[#E0E0E0] h-[24px] mt-[45px]"></div>
      <div className="flex flex-row flex-wrap ">
        {" "}
        <div className="flex flex-col gap-[12px] ">
          <label htmlFor="maxPrice">حداکثر قیمت</label>
          <Input
            placeholder="وارد کنید "
            name="maxPrice"
            type="text"
            className=" w-[208px] h-[46px] "
            radius="full"
          />{" "}
        </div>
        <div className="flex flex-col gap-[12px] mr-8">
          <label htmlFor="maxPrice">حداکثر قیمت</label>
          <Input
            placeholder="وارد کنید "
            name="maxPrice"
            type="text"
            className=" w-[208px] h-[46px] "
            radius="full"
          />{" "}
        </div>{" "}
      </div>
      <div className="border-r-1 border-[#E0E0E0] h-[24px] mt-[45px]"></div>
      <div className="flex flex-row flex-wrap ">
        <div className="flex flex-col gap-[12px] ">
          <label htmlFor="maxPrice">حداکثر قیمت</label>
          <Input
            placeholder="وارد کنید "
            name="maxPrice"
            type="text"
            className=" w-[208px] h-[46px] "
            radius="full"
          />{" "}
        </div>
        <div className="flex flex-col gap-[12px] mr-8 ">
          <label htmlFor="maxPrice">حداکثر قیمت</label>
          <Input
            placeholder="وارد کنید "
            name="maxPrice"
            type="text"
            className=" w-[208px] h-[46px] "
            radius="full"
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default RentFilter;
