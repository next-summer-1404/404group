"use client";
import Image from "next/image";
import React, { useState } from "react";
import houseReserveBg from "@/assets/houseReserve/HouseReserveImageItems.png";
import location from "@/assets/rent/location.png";
import loc from "@/assets/houseReserve/location.svg";
import ring from "@/assets/houseReserve/ring.svg";
import rating from "@/assets/houseReserve/rating.svg";
import {
  formatNumberToPersian,
  toPersianDigits,
} from "../../utils/hooks/formatNumberToPersian";
import { HousesResponse } from "../../types/RentTypes/HomeTypes";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
function HouseReserveCardBox({ houses, totalCount }: HousesResponse) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const getFirstPhoto = (photos: string[] | null) => {
    if (photos && photos.length > 0 && photos[0] !== "") return photos[0];
    return houseReserveBg;
  };
  const handleClickLocation = (lat: number, lng: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("lat", lat.toString());
    newParams.set("lng", lng.toString());

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="w-[100%] h-[80%] border-black mt-8 flex gap-6 flex-row flex-wrap p-2 overflow-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-blue-200">
      {houses?.map((items) => (
        <Link href={`/SingleReservHouse/${items.id}`} key={items.id}>
          <div className="shadow-2xl rounded-2xl w-[218px] h-[317px] border-black  hover:scale-90 transition-[0.5s]">
            <div className="w-[218px] h-[182px]  rounded-[24px] border-black relative">
              {" "}
              <Image
                src={getFirstPhoto(items?.photos)}
                alt="search"
                fill
                className="object-cover rounded-[24px]"
              />{" "}
              <div className="absolute bottom-1 left-1 flex justify-between gap-[8px]">
                {" "}
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCardId(items.id);
                    handleClickLocation(items.location.lat, items.location.lng);
                  }}
                  className={` h-[32px]  rounded-[100px] bg-[#7575FE]  cursor-pointer w-[32px] hover:w-[150px] transition-[1s] duration-400 overflow-hidden
                    ${activeCardId === items.id ? "w-[150px]" : "w-[32px]"}
                    `}
                >
                  <div className="w-[150px] flex flex-row flex-nowrap ">
                    {" "}
                    <div className="size-[32px] rounded-[16px]  flex justify-center items-center">
                      <Image src={loc} alt="l" width={24} height={24} />
                    </div>
                    <p className="text-[14px] font-[700] mt-1 text-white text-center ">
                      نمایش داخل نقشه
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1 left-1 flex justify-between gap-[8px]">
                {" "}
                {items.discounted_price && items.price ? (
                  <div className="h-[32px] rounded-[100px] bg-[#FF5555] flex flex-row flex-nowrap items-center px-2">
                    <p className="text-[14px] font-[700] text-white text-center">
                      {`٪${toPersianDigits(
                        Math.round(
                          ((Number(items.price) -
                            Number(items.discounted_price)) /
                            Number(items.price)) *
                            100
                        ).toString()
                      )}-`}
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
                <div
                  className={` ${
                    items.rate !== null ? "" : " "
                  }  h-[32px]  rounded-[100px] bg-[#7575FE] flex flex-row flex-nowrap `}
                >
                  {" "}
                  <p className="text-[14px] font-[700] mt-1 text-white text-center pr-[5px]">
                    {items.rate !== null
                      ? toPersianDigits(items.rate.toString())
                      : ""}
                    {items.rate !== null ? "" : "بدون امتیاز"}
                  </p>
                  <div className="size-[32px] rounded-[16px]  flex justify-center items-center">
                    <Image src={rating} alt="l" width={24} height={24} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[16px]">
              <h1 className="text-[18px] font-[700] dark:text-white text-black mt-4">
                {items.title}
              </h1>
              <div className="  flex flex-row gap-[7px]">
                <div className="flex flex-row flex-nowrap gap-[7px]">
                  <div className="size-[32px] rounded-[16px] bg-[#F3F3F3] flex justify-center items-center">
                    <Image src={location} alt="l" width={20} height={20} />
                  </div>
                  <p className="text-[14px] dark:text-gray-300 mt-0.5 text-black">
                    {items.address
                      ? items.address.length > 10
                        ? items.address.substring(0, 10) + "..."
                        : items.address
                      : "بدون توضیح"}{" "}
                  </p>
                </div>
                <div className="flex flex-row flex-nowrap gap-[7px]">
                  <div className="size-[32px] rounded-[16px] bg-[#F3F3F3] flex justify-center items-center">
                    <Image src={ring} alt="l" width={20} height={20} />
                  </div>
                  <p className="text-[14px] mt-0.5 dark:text-gray-300 text-black">
                    6 شب
                  </p>
                </div>
              </div>
              <div className="flex  justify-between text-black">
                {items?.discounted_price ? (
                  <div className="text-[#A6A6A6] relative">
                    <div className="border border-red-500 -rotate-12 w-full absolute top-4 right-0"></div>
                    {formatNumberToPersian(items?.discounted_price)}{" "}
                    <span className="text-[10px] font-[700]">تومان</span>
                  </div>
                ) : (
                  <div></div>
                )}
                {items?.price ? (
                  <div className="dark:text-white">
                    {formatNumberToPersian(items?.price)}{" "}
                    <span className="text-[10px] font-[700]">تومان</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default HouseReserveCardBox;
