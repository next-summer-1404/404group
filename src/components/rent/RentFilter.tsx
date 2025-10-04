"use client";
import { Input } from "@heroui/input";
import { Button, Select, SelectItem } from "@heroui/react";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import search from "@/assets/rent/search.svg";
import { Controller, useForm } from "react-hook-form";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllLocation } from "../../services/api/Location/getAllLocation";
import { ILocationData } from "../../types/LocationsTypes/LocationType";
import {
  useBuildSearchParams,
  useParseSearchParams,
} from "../../utils/hooks/SearchParamsSet";
import { FormFilterSearch } from "../../types/RentTypes/RentFormFilterTypes";

const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
];

interface IKeyValueOptions {
  key: string;
  label: string;
}
export function RentFilter({
  inMobile,
  onClose,
}: {
  inMobile?: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams(); // read-only

  const { data: locations } = useQuery({
    queryKey: ["getAllLocations"],
    queryFn: async () => getAllLocation(),
  });

  const locationOptions = locations?.map((loc: ILocationData) => ({
    key: loc.id,
    label: loc.area_name || "نامشخص",
  }));
  const sort = [
    { key: "last_updated", label: "آخرین آپدیت" },
    { key: "price", label: "قیمت" },
    { key: "created_at", label: "زمان ثبت" },
  ];
  // useEffect(() => console.log(location), []);
  // محتوای پارامز را به default values تبدیل می‌کنیم
  const initialValues = useMemo(() => {
    const searchParams = new URLSearchParams(sp?.toString() ?? "");
    return useParseSearchParams(searchParams);
  }, [sp]);

  const { register, control, handleSubmit, reset } = useForm<FormFilterSearch>({
    defaultValues: initialValues,
  });

  // اگر پارامز تغییر کرد، فرم را reset کن (مثلاً کاربر لینک با پارامز جدید باز کرد)
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const onSubmit = (values: FormFilterSearch) => {
    const params = useBuildSearchParams(values);
    const qs = params.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;

    router.replace(url);
    if (onClose) onClose();
    console.log("URL updated:", url);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`   flex-row flex-wrap  flex   ${
        inMobile
          ? "gap-[14px] mt-5 justify-center"
          : "gap-[24px] mt-36 px-[50px]"
      } `}
      style={{ direction: "rtl" }}
    >
      <div
        className={`flex flex-row gap-[12px]  relative   -right-[25px] ${
          inMobile ? "mr-[40px]" : ""
        }`}
      >
        {" "}
        <Button
          type="submit"
          className={`bg-[#7575FE] rounded-full size-[48px] relative top-[33px] right-[25px] z-9 m-0 p-2${
            inMobile ? "hidden" : "block"
          } `}
          style={{ padding: 0, margin: 0 }}
          isIconOnly
          aria-label="Take a photo"
          color="warning"
          variant="faded"
        >
          <Image src={search} width={24} height={24} alt="search" />
        </Button>{" "}
        <div className={`flex flex-col gap-[12px] ${inMobile ? " pr-3 " : ""}`}>
          <label htmlFor="search" className="text-right font-semibold">
            جستجو
          </label>
          <Input
            placeholder="جستجو کنید . . ."
            type="text"
            className={`  h-[46px]  ${inMobile ? "w-[208px] " : "w-[351px]"}`}
            radius="full"
            {...register("search")}
          />{" "}
        </div>{" "}
      </div>
      {/* مرتب سازی */}
      <div className="flex flex-col gap-[12px] ">
        <label className="text-right font-semibold">مرتب سازی بر اساس</label>
        <Controller
          name="sort"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="انتخاب کنید"
              radius="full"
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
              style={{ direction: "ltr", width: "208px", height: "48px" }}
            >
              {sort?.map((sort) => (
                <SelectItem key={sort.key}>{sort.label}</SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
      {/* محل مورد نظر */}
      <div className="flex flex-col gap-[12px]">
        <label className="text-right font-semibold">محل مورد نظر</label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="انتخاب کنید"
              radius="full"
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
              style={{
                direction: "ltr",
                width: "208px",
                height: "48px",
              }}
            >
              {locationOptions?.map((loc: IKeyValueOptions) => (
                <SelectItem key={loc.key}>{loc.label}</SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
      {/* نوع ملک */}
      <div className="flex flex-col gap-[12px]">
        <label className="text-right font-semibold">نوع ملک</label>
        <Controller
          name="propertyType"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="انتخاب کنید"
              radius="full"
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
              style={{ direction: "ltr", width: "208px", height: "48px" }}
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
      {/* نوع معامله */}
      <div className="flex flex-col gap-[12px]">
        <label className="text-right font-semibold">نوع معامله</label>
        <Controller
          name="transactionType"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="انتخاب کنید"
              radius="full"
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
              style={{ direction: "ltr", width: "208px", height: "48px" }}
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
      <div className="flex flex-col gap-[12px] ">
        <label htmlFor="minPrice">حداقل قیمت</label>
        <Input
          placeholder="وارد کنید "
          type="text"
          className=" w-[208px] h-[46px] "
          radius="full"
          {...register("minPrice", { valueAsNumber: true })}
        />
      </div>
      <div className="flex flex-col gap-[12px] ">
        <label htmlFor="maxPrice">حداکثر قیمت</label>
        <Input
          placeholder="وارد کنید "
          type="text"
          className=" w-[208px] h-[46px] "
          radius="full"
          {...register("maxPrice", { valueAsNumber: true })}
        />
      </div>
      <div
        className={`border-r-1 border-[#E0E0E0] h-[24px] mt-[45px] ${
          inMobile ? "hidden" : "block"
        }`}
      ></div>
      <div
        className={`flex flex-row flex-wrap   ${
          inMobile ? "justify-center items-center" : ""
        }`}
      >
        <div className="flex flex-col gap-[12px] ">
          <label htmlFor="minRent">حداقل اجاره </label>
          <Input
            placeholder="وارد کنید "
            type="text"
            className=" w-[208px] h-[46px] "
            radius="full"
            {...register("minRent", { valueAsNumber: true })}
          />
        </div>
        <div className={`flex flex-col gap-[12px] ${inMobile ? "" : "mr-8"}`}>
          <label htmlFor="maxRent"> حداکثر اجاره</label>
          <Input
            placeholder="وارد کنید "
            type="text"
            className=" w-[208px] h-[46px] "
            radius="full"
            {...register("maxRent", { valueAsNumber: true })}
          />{" "}
        </div>{" "}
      </div>
      <div
        className={`border-r-1 border-[#E0E0E0] h-[24px] mt-[45px] ${
          inMobile ? "hidden" : "block"
        }`}
      ></div>{" "}
      <div
        className={`flex flex-row flex-wrap   ${
          inMobile ? "justify-center items-center" : ""
        }`}
      >
        <div className="flex flex-col gap-[12px] ">
          <label htmlFor="minMortgage">حداقل وام </label>
          <Input
            placeholder="وارد کنید "
            type="text"
            className=" w-[208px] h-[46px] "
            radius="full"
            {...register("minMortgage", { valueAsNumber: true })}
          />{" "}
        </div>
        <div className={`flex flex-col gap-[12px] ${inMobile ? "" : "mr-8"}`}>
          <label htmlFor="maxMortgage">حداکثر وام</label>
          <Input
            placeholder="وارد کنید "
            type="text"
            className=" w-[208px] h-[46px] "
            radius="full"
            {...register("maxMortgage", { valueAsNumber: true })}
          />{" "}
        </div>
      </div>
      <div
        className={`border-r-1 border-[#E0E0E0] h-[24px] mt-[45px] ${
          inMobile ? "hidden" : "block"
        }`}
      ></div>{" "}
      <div
        className={`flex flex-row flex-wrap   ${
          inMobile ? "justify-center items-center" : ""
        }`}
      >
        <div className="flex flex-col gap-[12px] ">
          <label htmlFor="minArea">حداقل متراژ </label>
          <Input
            placeholder="وارد کنید "
            type="text"
            className=" w-[208px] h-[46px] "
            radius="full"
            {...register("minArea", { valueAsNumber: true })}
          />{" "}
        </div>
        <div className={`flex flex-col gap-[12px] ${inMobile ? "" : "mr-8"}`}>
          <label htmlFor="maxArea">حداکثر متراژ</label>
          <Input
            placeholder="وارد کنید "
            type="text"
            className=" w-[208px] h-[46px] "
            radius="full"
            {...register("maxArea", { valueAsNumber: true })}
          />{" "}
        </div>
      </div>
      {inMobile && (
        <Button
          type="submit"
          className="bg-[#7575FE] rounded-full w-full text-white"
        >
          اعمال فیلتر
        </Button>
      )}
    </form>
  );
}

export default RentFilter;
