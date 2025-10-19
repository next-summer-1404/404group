import HouseReserveMap from "../../../components/houseReserveContainer/houseReserveMap";
import Image from "next/image";
import houseReserveBg from "@/assets/houseReserve/HouseReserveImageItems.png";
import { getHouseReserve } from "../../../services/api/HouseReserve/HouseReserveApi";
import {
  formatNumberToPersian,
  toPersianDigits,
} from "../../../utils/hooks/formatNumberToPersian";
import location from "@/assets/rent/location.png";
import loc from "@/assets/houseReserve/location.svg";
import ring from "@/assets/houseReserve/ring.svg";
import rating from "@/assets/houseReserve/rating.svg";
import HouseReserveFiltersComponents from "../../../components/houseReserveContainer/HouseReserveFiltersComponents";
import HouseReserveCardBox from "../../../components/houseReserveContainer/HouseReserveCardBox";

async function HouseReserve() {
  const res = await getHouseReserve();

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
          <HouseReserveFiltersComponents />
          <HouseReserveCardBox
            houses={res?.houses}
            totalCount={res?.totalCount}
          />
        </div>
      </div>
    </div>
  );
}

export default HouseReserve;
