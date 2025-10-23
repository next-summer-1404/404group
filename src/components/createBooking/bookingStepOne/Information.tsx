import { Button } from "@heroui/button";
import Image from "next/image";
import React from "react";
import imageStepOne from "@/assets/createBooking/imageStepOne.jpg";
import calender from "@/assets/createBooking/calender.svg";
import loc from "@/assets/createBooking/loc.svg";
import hotelBlue from "@/assets/createBooking/hotelBlue.svg";

function Information() {
  return (
    <div className="h-[190px] bg-[white] rounded-[24px] border border-[#DDDDDD] flex justify-between p-[16px]">
      <div className=" w-[50%] flex flex-row gap-[16px]">
        <div className=" w-[250px] h-[156px] overflow-hidden rounded-[16px]">
          {" "}
          <Image
            src={imageStepOne}
            alt="image"
            width={250}
            height={158}
            className="object-cover rounded-[16px] -top-20 relative "
          />
        </div>
        <div className=" w-[445px] flex flex-col gap-[16px] ">
          <h1>هتل همایون فر کیش ایران</h1>
          <div className="flex flex-row flex-nowrap gap-[4px]">
            <div className="flex justify-center items-center">
              <Image
                src={calender}
                alt="calender"
                width={16}
                height={16}
                className="object-cover  "
              />
            </div>
            <p className="text-[#777777] text-[16px] font-[400]">
              تاریخ ورود :
            </p>
            <p className="text-[#1E2022] text-[16px] font-[400] mr-[4px]">
              12 شهریور 1404 - ساعت 12:30
            </p>
          </div>
          <div className="flex flex-row flex-nowrap gap-[4px]">
            <div className="flex justify-center items-center">
              <Image
                src={calender}
                alt="calender"
                width={16}
                height={16}
                className="object-cover  "
              />
            </div>
            <p className="text-[#777777] text-[16px] font-[400]">
              تاریخ ورود :
            </p>
            <p className="text-[#1E2022] text-[16px] font-[400] mr-[4px]">
              12 شهریور 1404 - ساعت 12:30
            </p>
          </div>{" "}
          <div className="flex flex-row flex-nowrap gap-[4px]">
            <div className="flex justify-center items-center">
              <Image
                src={loc}
                alt="loc"
                width={16}
                height={16}
                className="object-cover  "
              />
            </div>
            <p className="text-[#777777] text-[16px] font-[400]">
              تاریخ ورود :
            </p>
            <p className="text-[#1E2022] text-[16px] font-[400] mr-[4px]">
              12 شهریور 1404 - ساعت 12:30
            </p>
          </div>
        </div>
      </div>
      <div
        className=" w-[163px] flex flex-col gap-[8px]"
        style={{ direction: "ltr" }}
      >
        <div className=" flex flex-row flex-nowrap gap-[8px]">
          <div className="bg-[#FF5555] rounded-[16px] w-[41px] h-[32px] text-[white] flex justify-center items-center">
            50%
          </div>{" "}
          <div className="text-[#777777] font-[700] text-[14px] flex flex-row flex-nowrap relative gap-[8px]">
            <span className="mt-1 font-[400]"> تومان</span>{" "}
            <div className="text-[20px]">
              <del>120,000</del>
            </div>
          </div>{" "}
        </div>
        <div className="text-[#1E2022] font-[700] text-[16px] flex flex-row flex-nowrap relative gap-[8px]">
          <span className="mt-1 font-[400]"> تومان</span>{" "}
          <div className="text-[24px]">120,000</div>{" "}
        </div>
        <Button className="border border-[#0D3B66] w-[124px] h-[48px] rounded-[16px] p-[12px] bg-[white] mt-[20px]">
          <p className="text-[#0D3B66] font-[400] text-[16px] ">تغییر هتل</p>{" "}
          <div>
            <Image src={hotelBlue} alt="hotelBlue" width={24} height={24} />
          </div>
        </Button>
      </div>
    </div>
  );
}

export default Information;
