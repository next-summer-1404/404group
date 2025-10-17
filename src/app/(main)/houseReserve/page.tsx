import { Button } from "@heroui/button";
import HouseReserveMap from "../../../components/houseReserveContainer/houseReserveMap";
import Image from "next/image";
import { Input } from "@heroui/input";
import search from "@/assets/rent/search.svg";
import ReserveFilterModal from "../../../components/houseReserveContainer/reserveFilterModal";

function HouseReserve() {
  const inMobile = true;
  return (
    <div>
      <div className="h-[102px]"></div>
      <div className="relative w-full h-[800px] ">
        {/* نقشه */}
        <HouseReserveMap />

        {/* باکس روی نقشه */}
        <div className="absolute top-0 right-0 z-[1000] w-[540px] h-[800px] bg-white bg-opacity-70 rounded-2xl text-white p-6">
          <div className="text-black">
            خانه {">"} رزرو هتل {">"} رزرو هتل رشت
          </div>
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
              <div
                className={`flex flex-col gap-[12px] ${inMobile ? "  " : ""}`}
              >
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
          <div className="border w-[100%] h-[80%] border-black mt-8 flex gap-6 flex-row flex-wrap p-2 overflow-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-blue-200">
            <div className="border w-[218px] h-[317px] border-black"></div>
            <div className="border w-[218px] h-[317px] border-black"></div>
            <div className="border w-[218px] h-[317px] border-black"></div>
            <div className="border w-[218px] h-[317px] border-black"></div>
            <div className="border w-[218px] h-[317px] border-black"></div>
            <div className="border w-[218px] h-[317px] border-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseReserve;
