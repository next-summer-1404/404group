"use client";

import { getHouse } from "@/services/api/HouseApiLand/route";
import Image from "next/image";
import { useEffect, useState } from "react";
import SetRefreshToken from "../RefreshToken/SetRefreshToken";
import landing from "../../../public/landing.png";
const Landing = () => {
  interface property {
    photos: string;
    title: string;
    rooms: number;
    bathrooms: number;
    parking: number;
    address: string;
    price: number;
  }
  const [properties, setProperties] = useState<property[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getHouse();
      setProperties(data.houses.slice(0, 4));
    }

    loadData();
  }, []);

  return (
    <div dir="rtl">
      <SetRefreshToken />
      <div className="container mx-auto px-6 mt-6 py-20 flex flex-col md:flex-row items-center gap-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="flex-1 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={landing}
              alt="building"
              width={500}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-gray-100">
            خانه‌ای که می‌خواهی، <br /> جایی که می‌خواهی
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            پیدا کردن بهترین ملک برای شما در کوتاه‌ترین زمان ممکن.
          </p>
          <div className="flex gap-6">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl p-6 text-center transition-all">
              <p className="text-2xl font-extrabold text-primary dark:text-blue-400">
                +۸۰۰۰
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ملک فعال
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl p-6 text-center transition-all">
              <p className="text-2xl font-extrabold text-primary dark:text-blue-400">
                +۷۰۰۰
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                خریدار خوشحال
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-gray-100">
          مرجع جامع املاک
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:mr-54">
          {["استخردار", "ملک ساحلی", "آپارتمانی"].map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl shadow-xl overflow-hidden bg-white dark:bg-gray-800 transition-colors duration-300"
            >
              <div className="w-full h-52 relative">
                <Image
                  src={`/cat-${idx + 1}.jpg`}
                  alt={item}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center font-bold text-lg dark:text-gray-200">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            ملک ها
          </h2>
          <button className="text-primary dark:text-blue-400 font-semibold hover:underline">
            مشاهده همه
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {properties.length > 0 ? (
            properties.map((item, i) => (
              <div
                key={i}
                className="rounded-3xl shadow-xl bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300"
              >
                <div className="h-56 relative">
                  <Image
                    src={
                      Array.isArray(item.photos)
                        ? item.photos[0] || "/villa.jpg"
                        : typeof item.photos === "string" && item.photos !== ""
                        ? item.photos
                        : "/villa.jpg"
                    }
                    alt={item.title || `property ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {item.title || "ملک بدون عنوان"}
                  </h3>
                  <h6 className="font-light text-sm text-gray-500 dark:text-gray-400">
                    {item.address}
                  </h6>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-5">
                    <div>{item.rooms} خواب </div>
                    <div>{item.bathrooms} حمام </div>
                    <div>{item.parking} پارکینگ </div>
                  </div>
                  <h3 className="dark:text-white">{item.price} تومن</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              در حال بارگذاری...
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            +۱۰ سال سابقه درخشان
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            شرکت ما با بیش از ۱۰ سال تجربه در زمینه خرید و فروش املاک، بهترین
            خدمات را به شما ارائه می‌دهد.
          </p>
        </div>
        <div className="flex-1 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/experience.png"
              alt="experience"
              width={500}
              height={400}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-gray-100">
          نظرات کاربران
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 space-y-4 transition-colors duration-300"
            >
              <h3 className="font-bold text-gray-900 dark:text-gray-100">
                کاربر {i}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                تجربه‌ی عالی داشتم! همه‌چیز خیلی سریع و راحت انجام شد.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
