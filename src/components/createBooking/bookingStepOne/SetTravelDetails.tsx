"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as React from "react";
import toast from "react-hot-toast";

type Traveler = {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  nationalId: string;
};

type TravelersForm = {
  traveler_details: Traveler[];
  sharedEmail: string;
  sharedMobile: string;
};

export default function TravelersForm() {
  const form = useForm<TravelersForm>({
    defaultValues: {
      traveler_details: [
        {
          firstName: "",
          lastName: "",
          gender: "",
          birthDate: "",
          nationalId: "",
        },
      ],
      sharedEmail: "",
      sharedMobile: "",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "traveler_details",
  });

  const onSubmit = (data: TravelersForm) => {
    // ✅ بررسی خالی بودن فیلدهای مسافران
    const hasEmptyTraveler = data.traveler_details.some(
      (traveler) =>
        !traveler.firstName ||
        !traveler.lastName ||
        !traveler.gender ||
        !traveler.birthDate ||
        !traveler.nationalId
    );

    if (hasEmptyTraveler) {
      toast.error("لطفاً تمام اطلاعات مسافران را تکمیل کنید.");
      return;
    }

    // ✅ بررسی فیلدهای ایمیل و تلفن
    if (!data.sharedEmail || !data.sharedMobile) {
      toast.error("لطفاً ایمیل و شماره تلفن را وارد کنید.");
      return;
    }

    // ✅ اگر همه پر بودن
    console.log("✅ Traveler Data:", data);
    toast.success("اطلاعات با موفقیت ثبت شد.");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-8 w-full mx-auto"
    >
      {/* فرم مسافران */}
      <div className="rounded-[24px] shadow-md border border-[#DDDDDD] mt-[16px] p-[16px] bg-[white] relative">
        {fields.map((field, index) => (
          <div key={field.id} className="relative flex flex-col gap-4 mt-4">
            <h2 className="font-semibold text-lg text-gray-800">
              مسافر {index + 1}
            </h2>

            <div className="grid grid-cols-5 gap-4 items-end">
              {/* نام */}
              <div>
                <label
                  htmlFor={`firstName-${index}`}
                  className="block mb-1 text-sm font-medium"
                >
                  نام
                </label>
                <Input
                  id={`firstName-${index}`}
                  {...form.register(`traveler_details.${index}.firstName`)}
                  placeholder="علی"
                />
              </div>

              {/* نام خانوادگی */}
              <div>
                <label
                  htmlFor={`lastName-${index}`}
                  className="block mb-1 text-sm font-medium"
                >
                  نام خانوادگی
                </label>
                <Input
                  id={`lastName-${index}`}
                  {...form.register(`traveler_details.${index}.lastName`)}
                  placeholder="احمدی"
                />
              </div>

              {/* جنسیت */}
              <div>
                <label
                  htmlFor={`gender-${index}`}
                  className="block mb-1 text-sm font-medium"
                >
                  جنسیت
                </label>
                <Controller
                  name={`traveler_details.${index}.gender`}
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      placeholder="انتخاب جنسیت"
                      radius="full"
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys)[0])
                      }
                      style={{ width: "100%", height: "48px" }}
                    >
                      <SelectItem key="male">مرد</SelectItem>
                      <SelectItem key="female">زن</SelectItem>
                    </Select>
                  )}
                />
              </div>

              {/* کد ملی */}
              <div>
                <label
                  htmlFor={`nationalId-${index}`}
                  className="block mb-1 text-sm font-medium"
                >
                  کد ملی
                </label>
                <Input
                  id={`nationalId-${index}`}
                  {...form.register(`traveler_details.${index}.nationalId`)}
                  placeholder="1234567890"
                />
              </div>

              {/* تاریخ تولد */}
              <div>
                <label
                  htmlFor={`birthDate-${index}`}
                  className="block mb-1 text-sm font-medium"
                >
                  تاریخ تولد
                </label>

                <Input
                  id={`birthDate-${index}`}
                  type="date"
                  {...form.register(`traveler_details.${index}.birthDate`)}
                />
              </div>

              {/* حذف */}
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="bordered"
                  color="danger"
                  className="mt-3"
                  onClick={() => remove(index)}
                >
                  حذف
                </Button>
              )}
            </div>
          </div>
        ))}

        {/* افزودن مسافر جدید */}
        <div className="flex justify-end">
          <Button
            type="button"
            className="border-[#7575FE] border text-[#7575FE] mt-4"
            variant="bordered"
            onClick={() =>
              append({
                firstName: "",
                lastName: "",
                gender: "",
                birthDate: "",
                nationalId: "",
              })
            }
          >
            + افزودن مسافر جدید
          </Button>
        </div>
      </div>

      {/* ارسال بلیط به دیگران */}
      <div className="border border-[#DDDDDD] w-full bg-[white] rounded-[24px] p-[16px]">
        <div className="flex flex-row mb-4">
          <h1 className="text-[#1E2022] text-[24px] font-[700]">
            ارسال بلیط به دیگران
          </h1>
          <p className="text-[#777777] text-[16px] font-[400] mt-2 mr-2">
            (ارسال بلیط به ایمیل و شماره همراه دیگر)
          </p>
        </div>
        {/* 📱 شماره تلفن و ✉️ ایمیل */}
        <div className="flex flex-row gap-4 justify-between mt-[32px]">
          <div className="flex flex-row gap-4">
            {" "}
            <div>
              <label
                htmlFor="sharedMobile"
                className="block mb-1 text-sm font-medium"
              >
                شماره تلفن
              </label>
              <Input
                id="sharedMobile"
                {...form.register("sharedMobile")}
                placeholder="09121234567"
              />
            </div>
            <div>
              <label
                htmlFor="sharedEmail"
                className="block mb-1 text-sm font-medium"
              >
                ایمیل
              </label>
              <Input
                id="sharedEmail"
                {...form.register("sharedEmail")}
                placeholder="example@email.com"
              />
            </div>{" "}
          </div>
          <div className="flex justify-end mt-4 text-white">
            {" "}
            <Button
              type="submit"
              variant="solid"
              className="bg-[#7575FE] text-white"
            >
              ثبت اطلاعات مسافران
            </Button>
          </div>
        </div>{" "}
        {/* ثبت نهایی */}
      </div>
    </form>
  );
}
