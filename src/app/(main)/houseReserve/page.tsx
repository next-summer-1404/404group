import HouseReserveMap from "../../../components/houseReserveContainer/houseReserveMap";
import { getHouseReserve } from "../../../services/api/HouseReserve/HouseReserveApi";
import HouseReserveFiltersComponents from "../../../components/houseReserveContainer/HouseReserveFiltersComponents";
import HouseReserveCardBox from "../../../components/houseReserveContainer/HouseReserveCardBox";
export interface HouseReserveProps {
  searchParams: { [key: string]: string };
}
async function HouseReserve({ searchParams }: HouseReserveProps) {
  const params: Record<string, string> = {};

  Object.entries(searchParams).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      params[key] = val;
    }
  });

  
  delete params.lng;
  delete params.lat;

  
  console.log(params);
  const res = await getHouseReserve(params);

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
