"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Image from "next/image";
import React from "react";
import search from "@/assets/rent/search.svg";
import ReserveFilterModal from "./reserveFilterModal";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useBuildSearchParams } from "../../utils/hooks/SearchParamsSet";
export type FormFilterSearch = {
  search?: string;
};
function HouseReserveFiltersComponents() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const currentParams = useSearchParams();
  const inMobile = false;

  const onSubmit = (data: FormFilterSearch) => {
    // ادغام با پارامترهای فعلی URL
    const existing = Object.fromEntries(currentParams.entries());
    const params = useBuildSearchParams({ ...existing, ...data });

    // اپدیت URL بدون رفرش صفحه
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full h-[50px] mt-6 flex flex-row gap-1">
      <ReserveFilterModal />
      <form className="flex flex-row" onSubmit={handleSubmit(onSubmit)}>
        <Button
          type="submit"
          className={`bg-[#7575FE] rounded-full size-[48px] relative right-3 z-9 m-0 p-2 ${
            inMobile ? "hidden" : "block"
          }`}
          isIconOnly
          aria-label="search"
          color="warning"
          variant="faded"
        >
          <Image src={search} width={24} height={24} alt="search" />
        </Button>

        <div className="flex flex-col gap-[12px]">
          <Input
            placeholder="جستجو کنید..."
            type="text"
            className="mt-1 h-[46px] w-[351px]"
            radius="full"
            {...register("search")}
          />
        </div>
      </form>
    </div>
  );
}

export default HouseReserveFiltersComponents;
