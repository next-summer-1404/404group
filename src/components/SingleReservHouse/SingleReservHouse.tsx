"use client";

import { getHousedeteil } from "@/services/api/SingleHouse/route";
import { Button } from "@heroui/button";
import { Bath, BedDouble } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const SingleReservHouse = () => {
  interface data {
    photos: string;
    title: string;
    rooms: number;
    bathrooms: number;
    parking: number;
    address: string;
    price: number;
    caption: string;
    categories?: {
      name: string;
    };
    tags?: string[];
  }
  const [property, setProperty] = useState<data | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getHousedeteil();
        setProperty(data);
        console.log("API Data:", data);
      } catch (err) {
        console.error("Error fetching house:", err);
      }
    }

    loadData();
  }, []);

  return (
    <main
      className="bg-white font-yekan text-gray-800 dark:bg-gray-900"
      dir="rtl"
    >
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Image
              src="/property-main.jpg"
              alt="main property"
              width={800}
              height={600}
              className="rounded-3xl object-cover w-full h-[400px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Image
                key={i}
                src={`/property-${i}.jpg`}
                alt={`photo ${i}`}
                width={200}
                height={200}
                className="rounded-3xl object-cover w-full h-[190px]"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl dark:text-white font-bold mb-2">
              {property?.title}
            </h1>
            <p className="text-gray-500 text-sm">{property?.address}</p>
          </div>
          <button className="px-6 py-3 bg-primary text-white rounded-full hover:opacity-90 transition">
            رزرو یا استعلام قیمت
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
        <aside className="dark:bg-gray-800 lg:col-span-1 space-y-6 rounded-3xl p-6">
          <div>
            <div className="border rounded-3xl w-max h-max px-4 py-1 border-[#7575FE] text-[#7575FE]">
              امکانات هتل
            </div>
            <div className="grid grid-cols-3">
              <div className="border-[#7575FE] border-r pr-3 mt-3">
                <div className="text-[#7575FE]">تعداد اتاق</div>
                <div className="dark:text-white">{property?.rooms} خواب</div>
              </div>
              <div className="border-[#7575FE] border-r pr-3 mt-3">
                <div className="text-[#7575FE]">نوع</div>
                <div className="dark:text-white">
                  {property?.categories?.name}
                </div>
              </div>{" "}
              <div className="border-[#7575FE] border-r pr-3 mt-3">
                <div className="text-[#7575FE]">تعداد حمام</div>
                <div className="dark:text-white">{property?.bathrooms} تا</div>
              </div>{" "}
              <div className="border-[#7575FE] border-r pr-3 mt-3">
                <div className="text-[#7575FE]">تعداد پارکینگ</div>
                <div className="dark:text-white">{property?.parking} تا</div>
              </div>{" "}
            </div>
          </div>
          <h3 className="font-bold text-lg text-[#7575FE]">
            همین حالا رزرو کنید
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm text-gray-600">تاریخ ورود</label>
              <input
                type="date"
                className="w-full mt-1 p-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">تاریخ خروج</label>
              <input
                type="date"
                className="w-full mt-1 p-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">تعداد نفرات</label>
              <input
                type="number"
                placeholder="مثلاً ۲ نفر"
                className="w-full mt-1 p-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="text-sm text-gray-600 pt-9 ">
              قیمت هر شب از
              <span className="font-bold text-primary">
                {property?.price} تومان
              </span>
            </div>
            <div className="mx-auto w-10/12 col-span-2 mt-5 bg-[#7575FE] rounded-4xl text-white">
              <Button className="w-full"> همین الان رزرو کن</Button>
            </div>
          </div>
        </aside>
        <div className="lg:col-span-2 space-y-8">
          <div className="border rounded-3xl w-max h-max px-4 py-1 border-[#7575FE] text-[#7575FE]">
            درباره هتل
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              چرا {property?.title} را انتخاب کنیم؟
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {property?.caption}{" "}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Image
                src="/property-int-1.jpg"
                alt="interior"
                width={500}
                height={300}
                className="rounded-3xl object-cover w-full h-[250px]"
              />
              <Image
                src="/property-int-2.jpg"
                alt="interior"
                width={500}
                height={300}
                className="rounded-3xl object-cover w-full h-[250px]"
              />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 mt-12 space-y-8">
            <h3 className="border rounded-3xl w-max h-max px-4 py-1 border-[#7575FE] text-[#7575FE]">
              نظرات کاربران
            </h3>
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold dark:text-white">کاربر {i}</p>
                  <p className="text-xs text-gray-400">۳ روز پیش</p>
                </div>
                <p className="text-gray-600 text-sm">
                  اقامت خیلی خوبی داشتم، اتاق تمیز بود و برخورد کارکنان عالی
                  بود.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-10 dark:text-white">
          آگهی‌های مشابه
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-3xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition"
            >
              <div className="relative h-48">
                <Image
                  src="/villa.jpg"
                  alt={`property ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-bold text-base text-gray-800 dark:text-gray-100">
                  ویلای مدرن در شمال کشور
                </h3>

                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm gap-2">
                  <BedDouble size={16} /> ۳ خواب
                  <Bath size={16} /> ۲ حمام
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold">
                  قیمت:{" "}
                  <span className="text-primary dark:text-indigo-400">
                    ۶,۵۰۰,۰۰۰ تومان
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SingleReservHouse;
