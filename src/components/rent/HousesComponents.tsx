import React from "react";
import { getAllHouses } from "../../services/api/Houses/getAllHousesWithFilter";
import Image from "next/image";
import googleIcone from "@/assets/auth/googleIcone.png";
import location from "@/assets/rent/location.png";
import parking from "@/assets/rent/parking.png";
import bathRome from "@/assets/rent/bathRome.png";
import bed from "@/assets/rent/bed.png";
import rating from "@/assets/rent/rating.png";
import imageHouses from "@/assets/rent/imageHouses.png";
import {
  formatNumberToPersian,
  toPersianDigits,
} from "../../utils/hooks/formatNumberToPersian";
import Link from "next/link";
import { House, HousesResponse } from "../../types/RentTypes/HomeTypes";

async function HousesComponents({ data }: { data: HousesResponse }) {
  console.log(data + "sjklhalsdksklgjldfjgdf");
  const getFirstPhoto = (photos: string[] | null) => {
    if (photos && photos.length > 0 && photos[0] !== "") return photos[0];
    return imageHouses;
  };

  return (
    <div className="flex flex-row flex-wrap gap-[56px]  p-[40px] sm:p-[56px]">
      {data?.houses?.map((item: House) => (
        <div
          className=" sm:w-[633px] p-2  sm:h-[229px]  flex flex-col sm:flex-row shadow-lg sm:shadow-none gap-[16px] hover:shadow-2xl transition-[0.3s] rounded-[24px] "
          key={item.id}
        >
          <div className="border border-gray-300 overflow-hidden rounded-[24px] h-[229px] sm:h-auto">
            <Image
              src={getFirstPhoto(item.photos)}
              alt="icone"
              width={272}
              height={229}
            />
          </div>
          <div className=" pr-[16px] flex flex-col gap-[16px]">
            <h1 className="font-[700] text-[20px] text-black ">{item.title}</h1>
            <div
              className={` ${
                item.rate !== null ? "w-[90px]" : " w-[100px]"
              }  h-[32px] rounded-[100px] bg-[#7575FE] flex flex-row flex-nowrap`}
            >
              <div className="size-[32px] rounded-[16px]  flex justify-center items-center">
                <Image src={rating} alt="l" width={24} height={24} />
              </div>
              <p className="text-[12px] mt-1 text-white text-center px-[1px]">
                {item.rate !== null
                  ? toPersianDigits(item.rate.toString())
                  : "بدون امتیاز"}
                {item.rate !== null ? "ستاره" : ""}
              </p>
            </div>
            <div className="flex flex-row flex-nowrap gap-[8px]">
              <div className="size-[32px] rounded-[16px] bg-[#F3F3F3] flex justify-center items-center">
                <Image src={location} alt="l" width={20} height={20} />
              </div>
              <p className="text-[14px] mt-0.5">
                {item.caption
                  ? item.caption.length > 30
                    ? item.caption.substring(0, 40) + "..."
                    : item.caption
                  : "بدون توضیح"}{" "}
              </p>
            </div>
            <div className="flex flex-row flex-nowrap gap-[8px]">
              <div className="size-[32px] rounded-[16px] bg-[#F3F3F3] flex justify-center items-center">
                <Image src={bed} alt="l" width={20} height={20} />
              </div>{" "}
              <p>
                {item.rooms !== null
                  ? toPersianDigits(item.rooms.toString())
                  : "بدون "}{" "}
                خواب
              </p>
              <div className="size-[32px] rounded-[16px] bg-[#F3F3F3] flex justify-center items-center">
                <Image src={parking} alt="l" width={20} height={20} />
              </div>{" "}
              <p>
                {" "}
                {item.parking !== null
                  ? toPersianDigits(item.parking.toString())
                  : "بدون "}{" "}
                پارکینگ
              </p>
              <div className="size-[32px] rounded-[16px] bg-[#F3F3F3] flex justify-center items-center">
                <Image src={bathRome} alt="l" width={20} height={20} />
              </div>{" "}
              <p>
                {" "}
                {item.bathrooms !== null
                  ? toPersianDigits(item.bathrooms.toString())
                  : "بدون "}{" "}
                حمام
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row flex-nowrap gap-1">
                {item.bathrooms !== null
                  ? formatNumberToPersian(item.price)
                  : "0 "}
                <span className="text-[12px] text-[#595959] mt-1">تومان</span>
              </div>
              <Link
                href={"/"}
                className="text-[#7575FE] text-[16px] cursor-pointer"
              >
                مشاهده جزئیات {">"}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HousesComponents;
