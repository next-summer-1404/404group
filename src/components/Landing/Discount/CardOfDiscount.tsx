"use client";
import React from "react";
import Image from "next/image";
import location from "@/assets/rent/location.svg";
import locationWhite from "@/assets/rent/locationWhite.svg";
import human from "@/assets/rent/human.svg";
import humanWhite from "@/assets/rent/humanWhite.svg";
import bathRome from "@/assets/rent/bathRome.svg";
import bathRomeWhite from "@/assets/rent/bathRomeWhite.svg";
import bed from "@/assets/rent/bed.svg";
import bedWhite from "@/assets/rent/bedWhite.svg";
import imageHouses from "@/assets/rent/imageHouses.png";
import {
  formatNumberToPersian,
  toPersianDigits,
} from "../../../utils/hooks/formatNumberToPersian";
import { House } from "../../../types/RentTypes/HomeTypes";
const getFirstPhoto = (photos: string[] | null) => {
  if (photos && photos.length > 0 && photos[0] !== "") return photos[0];
  return imageHouses;
};
import { motion, Variants } from "framer-motion";
import {
  fadeInDown,
  fadeInUp,
  springBottomtoUp,
  springBottomtoUpDelay,
} from "../../../utils/animation/variants";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import { useIsDark } from "../../../utils/hooks/useIsDark";
interface ICardOfDiscountProps {
  item: House;
}
function CardOfDiscount({ item }: ICardOfDiscountProps) {
  const isDark = useIsDark();
  return (
    <>
      <div className=" border-gray-300 rounded-[24px] h-[282px] w-[303px] relative">
        <Image
          src={getFirstPhoto(item.photos)}
          alt="icone"
          fill
          className="object-cover rounded-[24px]"
        />
      </div>
      <div className=" pr-[16px] flex flex-col gap-[16px]">
        <h1 className="font-[700] text-[20px] text-black dark:text-white">
          {item.title}
        </h1>

        <div className="flex flex-row flex-nowrap gap-[8px]">
          <div className="size-[32px] rounded-[16px] bg-[#F3F3F3] flex justify-center items-center dark:bg-gray-800">
            {isDark ? (
              <Image src={locationWhite} alt="l" width={20} height={20} />
            ) : (
              <Image src={location} alt="l" width={20} height={20} />
            )}
          </div>
          <p className="text-[14px] mt-0.5">
            {item.caption
              ? item.caption.length > 30
                ? item.caption.substring(0, 30) + "..."
                : item.caption
              : "بدون توضیح"}{" "}
          </p>
        </div>
        <div className="flex flex-row flex-nowrap gap-[8px]">
          <div className="size-[32px] rounded-[16px] bg-[#F3F3F3] flex justify-center items-center dark:bg-gray-800">
            {isDark ? (
              <Image src={bedWhite} alt="l" width={20} height={20} />
            ) : (
              <Image src={bed} alt="l" width={20} height={20} />
            )}{" "}
          </div>{" "}
          <p className="font-[500] text-[14px] mt-1">
            {item.rooms !== null
              ? toPersianDigits(item.rooms.toString())
              : "بدون "}{" "}
            خواب
          </p>
          <div className="size-[32px] rounded-[16px] bg-[#F3F3F3] flex justify-center items-center dark:bg-gray-800">
            {isDark ? (
              <Image src={humanWhite} alt="l" width={20} height={20} />
            ) : (
              <Image src={human} alt="l" width={20} height={20} />
            )}{" "}
          </div>{" "}
          <p className="font-[500] text-[14px]  mt-1">
            {" "}
            {item.capacity !== null
              ? toPersianDigits(item.capacity.toString())
              : "بدون "}{" "}
            پارکینگ
          </p>
          <div className="size-[32px] rounded-[16px] bg-[#F3F3F3] flex justify-center items-center dark:bg-gray-800">
            {isDark ? (
              <Image src={bathRomeWhite} alt="l" width={20} height={20} />
            ) : (
              <Image src={bathRome} alt="l" width={20} height={20} />
            )}{" "}
          </div>{" "}
          <p className="font-[500] text-[14px]  mt-1">
            {" "}
            {item.bathrooms !== null
              ? toPersianDigits(item.bathrooms.toString())
              : "بدون "}{" "}
            حمام
          </p>
        </div>
        <div className="flex justify-between mb-2">
          <div>
            {" "}
            {item?.discounted_price && (
              <div className="text-[#A6A6A6] text-[20px] font-[700] relative">
                {formatNumberToPersian(Number(item?.discounted_price))}
                <div className="absolute border border-[#FF5555] w-full -rotate-12 top-1/2" />
              </div>
            )}
          </div>
          <div className="text-[#1E1E1E] dark:text-white text-[20px] font-[700] ml-4">
            {formatNumberToPersian(item?.price)}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardOfDiscount;
