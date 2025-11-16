import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import React from "react";
import check from "@/assets/createBooking/check.svg";
import Image from "next/image";
import { formatNumberToPersian } from "../../../utils/hooks/formatNumberToPersian";
function TravelNotife() {
  return (
    <div className="bg-[white] rounded-[24px] h-[181px]  px-[16px] py-[16px] flex flex-col gap-[32px]">
      <h1 className="text-[24px] text-[black] font-[700]">کد تخفیف</h1>
      <div className="h-[84px]  flex justify-between">
        <div className="flex flex-col gap-4">
          <label>کد تخفیف</label>
          <div className="rounded-full  overflow-hidden">
            {" "}
            <Input
              placeholder="کد تخفیف را وارد کنید "
              className="rounded-full"
            />
          </div>
        </div>
        <div className=" flex flex-col justify-end">
          {" "}
          <Button className="flex flex-row gap-2 border border-[#7575FE] bg-[white] ">
            <div>
              <Image src={check} alt="icon" width={24} height={24} />
            </div>
            <p className="text-[#7575FE]">اعمال کد تخفیف</p>
          </Button>
        </div>
      </div>{" "}
    </div>
  );
}

export default TravelNotife;
