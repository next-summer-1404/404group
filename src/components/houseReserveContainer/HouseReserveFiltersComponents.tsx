import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Image from "next/image";
import React from "react";
import search from "@/assets/rent/search.svg";
import ReserveFilterModal from "./reserveFilterModal";

function HouseReserveFiltersComponents() {
  const inMobile = false;
  return (
    <div className=" w-[100%] h-[50px] border-black mt-6 flex flex-row gap-1">
      <ReserveFilterModal />
      <div className={`flex flex-row  border-black `}>
        {" "}
        <Button
          type="submit"
          className={`bg-[#7575FE] rounded-full size-[48px] relative right-3  z-9 m-0 p-2${
            inMobile ? "hidden" : "block"
          } `}
          isIconOnly
          aria-label="Take a photo"
          color="warning"
          variant="faded"
        >
          <Image src={search} width={24} height={24} alt="search" />
        </Button>{" "}
        <div className={`flex flex-col gap-[12px] ${inMobile ? "  " : ""}`}>
          <Input
            placeholder="جستجو کنید . . ."
            type="text"
            className={`mt-1  h-[46px] w-[351px] `}
            radius="full"
            // {...register("search")}
          />{" "}
        </div>{" "}
      </div>
      <div></div>
    </div>
  );
}

export default HouseReserveFiltersComponents;
