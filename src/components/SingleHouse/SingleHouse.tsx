"use client";

import { getHouse } from "@/services/api/HouseApiLand/route";
// import { getHousedeteil } from "@/services/api/HouseReserveDetails/HouseReserveDetails";
import { Bath, BedDouble } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const SingleHouse = ({ property }: any) => {
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
    <main
      className="bg-white font-yekan text-gray-800 dark:bg-gray-900"
      dir="rtl"
    >
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 border">
            <Image
              src={
                Array.isArray(property.photos) && property.photos.length > 0
                  ? property.photos[0]
                  : "/villa.png"
              }
              alt={property?.title || "property image"}
              width={800}
              height={600}
              className="rounded-3xl object-cover w-full h-[400px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Array.isArray(property.photos) && property.photos.length > 0
              ? property.photos
                  .slice(0, 4)
                  .map((photo: string, i: number) => (
                    <Image
                      key={i}
                      src={photo || "/villa.png"}
                      alt={`photo ${i}`}
                      width={200}
                      height={200}
                      className="rounded-3xl object-cover w-full h-[190px]"
                    />
                  ))
              : // اگر هیچ عکسی نبود → ۴ عکس پیش‌فرض
                [1, 2, 3, 4].map((i) => (
                  <Image
                    key={i}
                    src="/villa.png"
                    alt="default property"
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
        <aside className="lg:col-span-1 space-y-6 bg-gray-50 dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <div>
            <div className="border rounded-3xl w-max h-max px-4 py-1 border-[#7575FE] text-[#7575FE]">
              امکانات ملک
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

          <div className="text-sm text-gray-600 pt-10">
            قیمت هر شب{" "}
            <span className="font-bold text-primary">
              {property?.price} تومان
            </span>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex">
              <div></div>
              <div className="dark:text-white">عباس</div>
            </div>
            <div className="rounded-3xl bg-[#7575FE] flex text-white">
              <div className="text-sm my-auto mr-3">شماره تماس : </div>
              <div className="text-sm my-auto">09222939182</div>
            </div>
          </div>
          <div className="flex">
            <div className="text-gray-500 mb-2 font-semibold">برچسب ها</div>
            <div className="flex flex-wrap gap-2">
              {property?.tags && property.tags.length > 0 ? (
                property.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm text-[#7575FE]"
                  >
                    # {tag}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">بدون برچسب</span>
              )}
            </div>
          </div>
        </aside>
        <div className="lg:col-span-2 space-y-8">
          <div className="border rounded-3xl w-max h-max px-4 py-1 border-[#7575FE] text-[#7575FE]">
            درباره ملک
          </div>

          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">{property?.caption}</p>
          </div>
          <div className="border rounded-3xl w-max h-max px-4 py-1 border-[#7575FE] text-[#7575FE]">
            تصاویر ملک
          </div>
          <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(property.photos) && property.photos.length > 0
                ? property.photos
                    .slice(0, 2)
                    .map((photo: string, i: number) => (
                      <Image
                        key={i}
                        src={photo || "/villa.png"}
                        alt={`photo ${i}`}
                        width={200}
                        height={200}
                        className="rounded-3xl object-cover w-full h-[190px]"
                      />
                    ))
                : // اگر هیچ عکسی نبود → ۴ عکس پیش‌فرض
                  [1, 2].map((i) => (
                    <Image
                      key={i}
                      src="/villa.png"
                      alt="default property"
                      width={200}
                      height={200}
                      className="rounded-3xl object-cover w-full h-[190px]"
                    />
                  ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 mt-12 space-y-8">
            <h3 className="border rounded-3xl w-max h-max px-4 py-1 border-[#7575FE] text-[#7575FE]">
              نظرات کاربران
            </h3>
            {/* {[1, 2, 3].map((i) => (
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
            ))} */}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-10 dark:text-white">
          آگهی‌های مشابه
        </h2>
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
                        ? item.photos[0] || "/villa.png"
                        : typeof item.photos === "string" && item.photos !== ""
                        ? item.photos
                        : "/villa.png"
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
                  <h6 className="flex font-light text-sm text-gray-500 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      className="size-6 rounded-4xl bg-gray-50 py-1 px-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    <div className="my-1 mr-1">{item.address}</div>
                  </h6>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-5">
                    <div>
                      <h6 className="flex font-light text-sm text-gray-500 dark:text-gray-400">
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-1"
                        >
                          <path
                            d="M19 20V18.5M5 20V18.5"
                            stroke="#1C274C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M2 15C2 14.0681 2 13.6022 2.15224 13.2346C2.35523 12.7446 2.74458 12.3552 3.23463 12.1522C3.60218 12 4.06812 12 5 12H19C19.9319 12 20.3978 12 20.7654 12.1522C21.2554 12.3552 21.6448 12.7446 21.8478 13.2346C22 13.6022 22 14.0681 22 15C22 15.9319 22 16.3978 21.8478 16.7654C21.6448 17.2554 21.2554 17.6448 20.7654 17.8478C20.3978 18 19.9319 18 19 18H5C4.06812 18 3.60218 18 3.23463 17.8478C2.74458 17.6448 2.35523 17.2554 2.15224 16.7654C2 16.3978 2 15.9319 2 15Z"
                            stroke="#1C274C"
                            stroke-width="1.5"
                          />
                          <path
                            d="M21 12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12"
                            stroke="#1C274C"
                            stroke-width="1.5"
                          />
                          <path
                            d="M18.5 12V10.5C18.5 8.61438 18.5 7.67157 17.9142 7.08579C17.3284 6.5 16.3856 6.5 14.5 6.5H9.5C7.61438 6.5 6.67157 6.5 6.08579 7.08579C5.5 7.67157 5.5 8.61438 5.5 10.5V12"
                            stroke="#1C274C"
                            stroke-width="1.5"
                          />
                          <path
                            d="M12 7V12"
                            stroke="#1C274C"
                            stroke-width="1.5"
                          />
                        </svg>
                        <div className="my-1 mr-1">{item.rooms}خواب</div>
                      </h6>{" "}
                    </div>
                    <div>
                      {" "}
                      <h6 className="flex font-light text-sm text-gray-500 dark:text-gray-400">
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-1"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.38517 2.75C4.48209 2.75 3.75 3.48209 3.75 4.38516V11.25H4.03429C4.04516 11.25 4.05599 11.25 4.06675 11.25C4.07208 11.25 4.07739 11.25 4.08268 11.25L19.9332 11.25C19.944 11.25 19.9548 11.25 19.9657 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21.7321C21.7386 12.7949 21.7433 12.8405 21.7463 12.8864C21.7501 12.9442 21.75 13.0066 21.75 13.0668L21.75 13.1047C21.75 13.4799 21.75 13.6998 21.7344 13.9452C21.5925 16.1815 20.384 18.2467 18.6326 19.597C18.6463 19.6186 18.6591 19.6412 18.6708 19.6646L19.6708 21.6646C19.8561 22.0351 19.7059 22.4856 19.3354 22.6708C18.9649 22.8561 18.5144 22.7059 18.3292 22.3354L17.3615 20.4C16.5597 20.8059 15.6878 21.073 14.7809 21.1648C14.5364 21.1896 14.3872 21.1952 14.133 21.2047L14.1263 21.205C13.3861 21.2328 12.6615 21.25 12 21.25C11.3385 21.25 10.6139 21.2328 9.87368 21.205L9.86699 21.2047C9.61278 21.1952 9.46358 21.1896 9.2191 21.1648C8.31222 21.073 7.44028 20.8059 6.63851 20.4L5.67082 22.3354C5.48558 22.7059 5.03507 22.8561 4.66459 22.6708C4.29411 22.4856 4.14394 22.0351 4.32918 21.6646L5.32918 19.6646C5.34089 19.6412 5.35366 19.6186 5.3674 19.597C3.61596 18.2467 2.4075 16.1815 2.26556 13.9452C2.24999 13.6998 2.24999 13.4798 2.25 13.1046L2.25 13.0827C2.25 13.0774 2.25 13.0721 2.24999 13.0668C2.24999 13.0483 2.24998 13.0296 2.25008 13.0108C2.25003 13.0072 2.25 13.0036 2.25 13V12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H2.25V4.38516C2.25 2.65366 3.65366 1.25 5.38517 1.25C6.66715 1.25 7.81998 2.0305 8.29609 3.22079L8.40623 3.49613C9.19952 3.29489 10.0603 3.34152 10.8717 3.68813C11.887 4.12189 12.6258 4.94029 13.0041 5.90053C13.1526 6.27744 12.975 6.70417 12.6029 6.86436L6.64215 9.43044C6.45572 9.51069 6.24473 9.51197 6.05735 9.43396C5.86997 9.35596 5.72221 9.20535 5.6478 9.01651C5.26959 8.05665 5.24692 6.94515 5.66723 5.91014C5.96643 5.17335 6.45214 4.56929 7.04665 4.13607L6.90338 3.77788C6.65506 3.15708 6.05379 2.75 5.38517 2.75ZM4.08268 12.75C4.04261 12.75 4.01877 12.75 4.00076 12.7502C3.98765 12.7504 3.98298 12.7506 3.98281 12.7506C3.98215 12.7506 3.98276 12.7506 3.98281 12.7506C3.85775 12.7587 3.75904 12.8581 3.75057 12.9831C3.75052 12.9843 3.75035 12.9893 3.75022 13.0008C3.75001 13.0188 3.75 13.0426 3.75 13.0827C3.75 13.4853 3.75031 13.6573 3.76255 13.8501C3.94798 16.7718 6.45762 19.3775 9.37024 19.6725C9.5652 19.6922 9.67311 19.6964 9.92999 19.7061C10.658 19.7334 11.3629 19.75 12 19.75C12.6371 19.75 13.342 19.7334 14.07 19.7061C14.3269 19.6964 14.4348 19.6922 14.6298 19.6725C17.5424 19.3775 20.052 16.7718 20.2375 13.8501C20.2497 13.6573 20.25 13.4853 20.25 13.0827C20.25 13.0426 20.25 13.0188 20.2498 13.0008C20.2497 12.9906 20.2495 12.9855 20.2495 12.9837C20.2494 12.9825 20.2494 12.9824 20.2495 12.9837C20.2413 12.8584 20.1415 12.7587 20.0162 12.7505C20.0174 12.7506 20.0177 12.7506 20.0162 12.7505C20.0142 12.7505 20.009 12.7503 19.9992 12.7502C19.9812 12.75 19.9574 12.75 19.9173 12.75H4.08268ZM10.2824 5.06753C9.62506 4.78672 8.91452 4.82579 8.30713 5.12147C7.76827 5.3838 7.31118 5.8486 7.05701 6.47451C6.89349 6.87716 6.83436 7.29656 6.86648 7.70078L11.2476 5.81471C10.9982 5.49339 10.6713 5.2337 10.2824 5.06753Z"
                            fill="#1C274C"
                          />
                        </svg>
                        <div className="my-1 mr-1">{item.bathrooms}حمام</div>
                      </h6>{" "}
                    </div>
                    <div>
                      {" "}
                      <h6 className="flex font-light text-sm text-gray-500 dark:text-gray-400">
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 45 45"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-1"
                        >
                          <path
                            d="M32 29.6256H36V32.6256C36 33.1776 35.552 33.6256 35 33.6256H33C32.448 33.6256 32 33.1776 32 32.6256V29.6256Z"
                            stroke="#3C3C3C"
                            stroke-width="2"
                          />
                          <path
                            d="M10 29.6256H14V32.6256C14 33.1776 13.552 33.6256 13 33.6256H11C10.448 33.6256 10 33.1776 10 32.6256V29.6256Z"
                            stroke="#3C3C3C"
                            stroke-width="2"
                          />
                          <path
                            d="M14 19.6256H32C34.209 19.6256 36 21.4166 36 23.6256V28.6256C36 29.1776 35.552 29.6256 35 29.6256H11C10.448 29.6256 10 29.1776 10 28.6256V23.6256C10 21.4166 11.791 19.6256 14 19.6256Z"
                            stroke="#3C3C3C"
                            stroke-width="2"
                          />
                          <path
                            d="M32 23.6256C32.552 23.6256 33 24.0736 33 24.6256C33 25.1776 32.552 25.6256 32 25.6256C31.448 25.6256 31 25.1776 31 24.6256C31 24.0736 31.448 23.6256 32 23.6256Z"
                            fill="#3C3C3C"
                          />
                          <path
                            d="M14 23.6256C14.552 23.6256 15 24.0736 15 24.6256C15 25.1776 14.552 25.6256 14 25.6256C13.448 25.6256 13 25.1776 13 24.6256C13 24.0736 13.448 23.6256 14 23.6256Z"
                            fill="#3C3C3C"
                          />
                          <path
                            d="M15.693 11.6256H30.307C30.724 11.6256 31.097 11.8846 31.243 12.2746L34 19.6256H12L14.757 12.2746C14.903 11.8846 15.276 11.6256 15.693 11.6256Z"
                            stroke="#3C3C3C"
                            stroke-width="2"
                          />
                          <path
                            d="M9 16.6256H12V18.6256H9V16.6256Z"
                            fill="#3C3C3C"
                          />
                          <path
                            d="M34 16.6256H37V18.6256H34V16.6256Z"
                            fill="#3C3C3C"
                          />
                          <path
                            d="M17 24.6256H29"
                            stroke="#3C3C3C"
                            stroke-width="2"
                          />
                        </svg>
                        <div className="my-1 mr-1">{item.parking}پارکینگ</div>
                      </h6>{" "}
                    </div>
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
    </main>
  );
};

export default SingleHouse;
