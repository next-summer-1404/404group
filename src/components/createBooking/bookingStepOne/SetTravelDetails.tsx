"use client";
import Cookies from "js-cookie";

import jalaali from "jalaali-js";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useReserve } from "../../../context/ReserveContext";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { formatNumberToPersian } from "../../../utils/hooks/formatNumberToPersian";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { CreateBook } from "../../../services/api/booking/createBook/createBook";
import { CreateBookingPayload } from "../../../types/Booking/createBooking";

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
  const [acceptInfo, setAcceeptInfo] = useState(false);
  const router = useRouter();
  const {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
    price,
    setPrice,
    discountPrice,
    setDiscountPrice,
    id,
    setId,
  } = useReserve();
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
  React.useEffect(() => {
    if (!guests) return;

    // از اجرای دوباره در StrictMode جلوگیری کن
    if ((window as any).__TRAVELERS_EFFECT_DONE__) return;
    (window as any).__TRAVELERS_EFFECT_DONE__ = true;
    const diff = guests - fields.length;

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        append({
          firstName: "",
          lastName: "",
          gender: "",
          birthDate: "",
          nationalId: "",
        });
      }
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) {
        remove(fields.length - 1 - i);
      }
    }
  }, [guests]);
  const createBooking = useMutation({
    mutationFn: (data: CreateBookingPayload) => CreateBook(data),
    onSuccess: () => {
      toast.success("اطلاعات با موفقیت ثبت شد.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onSubmit = (data: TravelersForm) => {
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
    setAcceeptInfo(true);
    // ✅ اگر همه پر بودن
    const checkInM = Cookies.get("checkIn");
    const checkOutM = Cookies.get("checkOut");
    const dateCheckIn = new Date(Number(checkInM));
    const dateCheckOut = new Date(Number(checkOutM));
    console.log(dateCheckIn.toISOString());

    const finalyData = {
      ...data,
      houseId: id,
      reservedDates: [dateCheckIn.toISOString(), dateCheckOut.toISOString()],
    };
    createBooking.mutate(finalyData as CreateBookingPayload);
    console.log("✅ Traveler Data:", data);
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
              <div className="">
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
                  className="bg-[#F9F9F9]  rounded-[31px]"
                  radius={"full"}
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
                  className="bg-[#F9F9F9]  rounded-[31px]"
                  radius={"full"}
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
                      className="bg-[#F9F9F9]  rounded-[31px]"
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys)[0])
                      }
                      style={{
                        width: "100%",
                        height: "40px",
                        direction: "ltr",
                      }}
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
                  className="bg-[#F9F9F9]  rounded-[31px]"
                  radius={"full"}
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

                <Controller
                  control={form.control}
                  name={`traveler_details.${index}.birthDate`}
                  render={({ field }) => (
                    <DatePicker
                      calendar={persian}
                      locale={persian_fa}
                      value={field.value || null}
                      onChange={(date) => field.onChange(date)}
                      calendarPosition="bottom-right"
                      placeholder="انتخاب تاریخ تولد"
                      inputClass="custom-input"
                      style={{
                        width: "100%",
                        height: "40px",
                        borderRadius: "31px",
                        padding: "8px",
                        background: "#F4F4F5",
                      }}
                    />
                  )}
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
                className="bg-[#F9F9F9]  rounded-[31px]"
                radius={"full"}
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
                className="bg-[#F9F9F9]  rounded-[31px]"
                radius={"full"}
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
      </div>{" "}
      <div className="flex flex-col justify-between mt-4 text-white">
        <div className="h-[44px] flex flex-row gap-2 ">
          <span className="text-[24px] text-[#1E2022] font-[700] ">
            قیمت کل :
          </span>
          <span className="text-[32px] text-[#7575FE] font-[700]  flex items-center">
            {formatNumberToPersian(price)}
          </span>{" "}
          <span className="text-[20px] text-[#7575FE] font-[400] flex items-center ">
            تومان
          </span>
        </div>
        <div className="flex justify-end">
          {" "}
          <Button
            onClick={() => {
              if (acceptInfo) {
                router.push("/createBooking/step2");
              } else {
                toast.error("ابتدا اطلاعات مسافر را ثبت کنید !");
              }
            }}
            variant="solid"
            className="bg-[#7575FE] text-white px-[20px] py-[16px]"
          >
            تایید و ادامه فرایند
          </Button>
        </div>
      </div>
    </form>
  );
}
