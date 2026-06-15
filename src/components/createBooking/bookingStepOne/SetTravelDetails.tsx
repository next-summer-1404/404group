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
      <div className="rounded-[24px] shadow-md border border-gray-300 dark:border-gray-700 mt-4 p-4 sm:p-6 bg-white dark:bg-gray-800 transition-colors duration-300 relative">
        {fields.map((field, index) => (
          <div key={field.id} className="relative flex flex-col gap-4 mt-6">
            <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
              مسافر {index + 1}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
              {/* نام */}
              <div>
                <label
                  htmlFor={`firstName-${index}`}
                  className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  نام
                </label>
                <Input
                  id={`firstName-${index}`}
                  {...form.register(`traveler_details.${index}.firstName`)}
                  placeholder="علی"
                  className="rounded-[31px] bg-gray-100 dark:bg-gray-700 dark:text-gray-100 w-full"
                  radius="full"
                />
              </div>

              {/* نام خانوادگی */}
              <div>
                <label
                  htmlFor={`lastName-${index}`}
                  className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  نام خانوادگی
                </label>
                <Input
                  id={`lastName-${index}`}
                  {...form.register(`traveler_details.${index}.lastName`)}
                  placeholder="احمدی"
                  className="rounded-[31px] bg-gray-100 dark:bg-gray-700 dark:text-gray-100 w-full"
                  radius="full"
                />
              </div>

              {/* جنسیت */}
              <div>
                <label
                  htmlFor={`gender-${index}`}
                  className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
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
                      className="rounded-[31px] bg-gray-100 dark:bg-gray-700 dark:text-gray-100 w-full"
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
                  className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  کد ملی
                </label>
                <Input
                  id={`nationalId-${index}`}
                  {...form.register(`traveler_details.${index}.nationalId`)}
                  placeholder="1234567890"
                  className="rounded-[31px] bg-gray-100 dark:bg-gray-700 dark:text-gray-100 w-full"
                  radius="full"
                />
              </div>

              {/* تاریخ تولد */}
              <div>
                <label
                  htmlFor={`birthDate-${index}`}
                  className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
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
                      inputClass="
                    w-full h-10 rounded-[31px] p-2
                    bg-gray-100 text-gray-800 
                    dark:bg-gray-700 dark:text-gray-100
                    transition-colors duration-300
                  "
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
                  className="mt-2"
                  onClick={() => remove(index)}
                >
                  حذف
                </Button>
              )}
            </div>
          </div>
        ))}

        {/* افزودن مسافر */}
        <div className="flex justify-end">
          <Button
            type="button"
            className="border-[#7575FE] text-[#7575FE] dark:border-indigo-400 dark:text-indigo-400 mt-6"
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

      {/* ارسال بلیط */}
      <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-[24px] p-4 sm:p-6 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row mb-4 gap-2 sm:gap-4">
          <h1 className="text-gray-900 dark:text-gray-100 text-[20px] sm:text-[24px] font-[700]">
            ارسال بلیط به دیگران
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-[14px] sm:text-[16px] font-[400]">
            (ارسال بلیط به ایمیل و شماره همراه دیگر)
          </p>
        </div>

        {/* شماره موبایل و ایمیل */}
        <div className="flex flex-col lg:flex-row gap-4 mt-6 items-start lg:items-end justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="w-full sm:w-[250px]">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                شماره تلفن
              </label>
              <Input
                {...form.register("sharedMobile")}
                placeholder="09121234567"
                className="rounded-[31px] bg-gray-100 dark:bg-gray-700 dark:text-gray-100 w-full"
                radius="full"
              />
            </div>

            <div className="w-full sm:w-[300px]">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                ایمیل
              </label>
              <Input
                {...form.register("sharedEmail")}
                placeholder="example@email.com"
                className="rounded-[31px] bg-gray-100 dark:bg-gray-700 dark:text-gray-100 w-full"
                radius="full"
              />
            </div>
          </div>

          <div className="w-full sm:w-auto flex justify-end">
            <Button
              type="submit"
              variant="solid"
              className="bg-[#7575FE] text-white w-full sm:w-auto mt-2 sm:mt-0"
            >
              ثبت اطلاعات مسافران
            </Button>
          </div>
        </div>
      </div>

      {/* قیمت کل */}
      <div className="flex flex-col gap-4 justify-between mt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-[20px] sm:text-[24px] text-gray-900 dark:text-gray-100 font-[700]">
            قیمت کل :
          </span>
          <span className="text-[28px] sm:text-[32px] text-[#7575FE] dark:text-indigo-400 font-[700]">
            {formatNumberToPersian(price)}
          </span>
          <span className="text-[18px] sm:text-[20px] text-[#7575FE] dark:text-indigo-400 font-[400]">
            تومان
          </span>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => {
              if (acceptInfo) router.push("/createBooking/step2");
              else toast.error("ابتدا اطلاعات مسافر را ثبت کنید !");
            }}
            variant="solid"
            className="bg-[#7575FE] dark:bg-indigo-500 text-white px-[20px] py-[16px] w-full sm:w-auto"
          >
            تایید و ادامه فرایند
          </Button>
        </div>
      </div>
    </form>
  );
}
