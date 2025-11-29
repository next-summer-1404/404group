"use client";
import { Button, Select, SelectItem, Slider } from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import trash from "@/assets/houseReserve/trash.svg";
import { useQuery } from "@tanstack/react-query";
import { getAllLocation } from "../../services/api/Location/getAllLocation";
import { IKeyValueOptions } from "../rent/RentFilter";

export default function ReserveFilterModal() {
  const [open, setOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([500000, 2000000]);
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      location: "",
      sortBy: "",
      facilities: "",
      rating: "",
    },
  });

  const onSubmit = (data: any) => {
    const { destination, ...rest } = data;
    console.log({ ...rest, priceRange });
  };
  const { data: locations } = useQuery({
    queryKey: ["getAllLocations"],
    queryFn: async () => getAllLocation(),
  });

  const locationOptions = locations
    ?.filter(
      (loc: any, index: number, self: any[]) =>
        index ===
        self.findIndex(
          (t) => t.dataValues.area_name === loc.dataValues.area_name
        )
    )
    .map((loc: any) => ({
      key: loc.dataValues.id,
      label: loc.dataValues.area_name || "نامشخص",
      value: loc.dataValues.id,
      dataValue: loc.dataValues,
    }));
  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="bg-[#7575FE] rounded-full z-9 w-[93px] h-[48px] text-white"
      >
        فیلتر ها
      </Button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`text-black dark:bg-gray-800 pt-[24px] pr-[56px] pl-[36px] rounded-tl-[32px] rounded-bl-[32px] fixed top-65 right-0 h-[649px] w-[540px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center pb-3">
            <h2 className="font-[700] text-[#1E1E1E] dark:text-white text-[20px]">
              فیلترها
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-800 flex flex-row flex-nowrap gap-0"
            >
              <div className="size-[24px] p-0.5">
                <Image src={trash} alt="trash" width={20} height={20} />
              </div>
              <h1 className="text-[#FF5555] font-[600] text-[14px]">حذف همه</h1>
            </button>
          </div>

          {/* فرم فیلترها */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-6"
          >
            <div className="flex flex-row flex-no-wrap gap-8 justify-between ">
              {/* مقصد یا هتل */}
              {/* <div className=" w-[100%] flex flex-col gap-3">
                <label className="font-[600] text-[14px] text-[#1E1E1E]">
                  مقصد یا هتل شما
                </label>
                <Select
                  placeholder="انتخاب مقصد"
                  {...register("destination")}
                  dir="ltr"
                  className="rounded-full"
                  style={{ borderRadius: "31px" }}
                >
                  <SelectItem key="tehran">تهران</SelectItem>
                  <SelectItem key="kish">کیش</SelectItem>
                  <SelectItem key="mashhad">مشهد</SelectItem>
                </Select>
              </div> */}
              <div className=" w-[100%] flex flex-col gap-3">
                <label className="font-[600] text-[14px] dark:text-white text-[#1E1E1E]">
                  محل مورد نظر
                </label>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <Select
                      placeholder="انتخاب مقصد"
                      radius="full"
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys)[0])
                      }
                      style={{
                        direction: "ltr",
                        // width: "208px",
                        height: "44px",
                        borderRadius: "31px",
                      }}
                    >
                      {locationOptions?.map((loc: IKeyValueOptions) => (
                        <SelectItem key={loc.label}>{loc.label}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* مرتب‌سازی */}
              <div className=" w-[100%] flex flex-col gap-3">
                <label className="font-[600] dark:text-white text-[14px] text-[#1E1E1E]">
                  مرتب‌سازی بر اساس
                </label>
                <Select
                  placeholder="انتخاب معیار"
                  {...register("sortBy")}
                  dir="ltr"
                  className="rounded-full"
                  style={{ borderRadius: "31px" }}
                >
                  <SelectItem key="price">قیمت</SelectItem>
                  <SelectItem key="rate">امتیاز کاربران</SelectItem>
                  <SelectItem key="distance">فاصله از مرکز شهر</SelectItem>
                </Select>
              </div>{" "}
            </div>
            {/* فیلتر قیمت */}
            <div>
              <label className="font-[600] dark:text-white text-[14px] text-[#1E1E1E] mb-2 block">
                محدوده قیمت
              </label>
              <div className="text-[#757575] font-sans text-[14px] mt-2 flex justify-between">
                <div>
                  {" "}
                  قیمت از{" "}
                  <span className="text-black dark:text-white font-medium text-[16px]">
                    {priceRange[0].toLocaleString()} تومان
                  </span>
                </div>
                <div>
                  {" "}
                  قیمت تا{" "}
                  <span className="text-black dark:text-white font-medium text-[16px]">
                    {priceRange[1].toLocaleString()} تومان
                  </span>
                </div>
              </div>

              <Slider
                step={100000}
                minValue={100000}
                maxValue={5000000}
                value={priceRange}
                color="secondary"
                onChange={(val) => {
                  if (Array.isArray(val)) setPriceRange(val);
                }}
                className="max-w-md"
                dir="rtl"
                formatOptions={{ style: "currency", currency: "IRR" }}
              />
            </div>

            <div className="flex flex-row flex-no-wrap gap-8 justify-between ">
              {/* امکانات هتل */}
              <div className=" w-[100%] flex flex-col gap-3">
                <label className="font-[600] dark:text-white text-[14px] text-[#1E1E1E]">
                  امکانات هتل
                </label>
                <Select
                  placeholder="انتخاب امکانات"
                  {...register("facilities")}
                  dir="ltr"
                  className="rounded-full"
                  style={{ borderRadius: "31px" }}
                >
                  <SelectItem key="pool">استخر</SelectItem>
                  <SelectItem key="wifi">وای‌فای</SelectItem>
                  <SelectItem key="parking">پارکینگ</SelectItem>
                </Select>
              </div>

              {/* امتیازات هتل */}
              <div className=" w-[100%] flex flex-col gap-3">
                <label className="font-[600] dark:text-white text-[14px] text-[#1E1E1E]">
                  امتیازات هتل
                </label>
                <Select
                  placeholder="انتخاب امتیاز"
                  {...register("rating")}
                  dir="ltr"
                  style={{ borderRadius: "31px" }}
                >
                  <SelectItem key="5">۵ ستاره</SelectItem>
                  <SelectItem key="4">۴ ستاره</SelectItem>
                  <SelectItem key="3">۳ ستاره</SelectItem>
                </Select>
              </div>
            </div>
            {/* دکمه‌ها */}
            <div className="flex gap-2 mt-6">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-gray-300 text-black rounded-full "
              >
                بستن
              </Button>

              <Button
                type="submit"
                className="bg-[#7575FE] text-white rounded-full "
              >
                مشاهده نتیجه
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
