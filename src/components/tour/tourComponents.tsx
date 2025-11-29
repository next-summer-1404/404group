import React from "react";
import Image from "next/image";
import location from "@/assets/rent/location.png";
import parking from "@/assets/rent/parking.png";
import bathRome from "@/assets/rent/bathRome.png";
import bed from "@/assets/rent/bed.png";
import imageHouses from "@/assets/rent/imageHouses.png";
import Link from "next/link";
import {
  formatNumberToPersian,
  toPersianDigits,
} from "../../utils/hooks/formatNumberToPersian";
import { Tour, TourResponse } from "@/types/TourTypes/TourTypes";

function TourComponents({ data }: { data: TourResponse }) {
  console.log("✅ received tour data: ", data);

  if (!data || !data.tours || data.tours.length === 0) {
    return <p className="text-center text-gray-500">هیچ توری یافت نشد.</p>;
  }

  const getFirstPhoto = (photos: string[] | null) => {
    if (photos && photos.length > 0 && photos[0] !== "") return photos[0];
    return imageHouses;
  };

  return (
    <div className="flex flex-wrap gap-[56px] p-[40px] sm:p-[56px]">
      {data.tours.map((item: Tour) => (
        <div
          className="sm:w-[633px] p-2 sm:h-[229px] flex flex-col sm:flex-row shadow-lg sm:shadow-none gap-[16px] hover:shadow-2xl transition-[0.3s] rounded-[24px]"
          key={item.id}
        >
          <div className="border border-gray-300 rounded-[24px] h-[229px] w-[272px] sm:h-auto relative">
            <Image
              src={getFirstPhoto(item.photos)}
              alt="icone"
              fill
              className="object-cover rounded-[24px]"
            />
          </div>
          <div className="pr-[16px] flex flex-col gap-[16px]">
            <h1 className="font-[700] text-[20px] text-black">{item.title}</h1>
            <div className="flex gap-[8px]">
              <div className="size-[32px] rounded-[16px] bg-[#F3F3F3] flex justify-center items-center">
                <Image src={location} alt="location" width={20} height={20} />
              </div>
              <p className="text-[14px] mt-0.5">
                {item.description?.length > 30
                  ? item.description.substring(0, 40) + "..."
                  : item.description || "بدون توضیح"}
              </p>
            </div>
            <div className="flex gap-[8px]">
              <Image src={bed} alt="bed" width={20} height={20} />
              <Image src={parking} alt="parking" width={20} height={20} />
              <Image src={bathRome} alt="bathroom" width={20} height={20} />
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-[12px] text-[#595959] mt-1">
                  {formatNumberToPersian(item.price)} تومان
                </span>
              </div>
              <Link
                href={`/tour/${item.id}`}
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

export default TourComponents;
