// export async function getHouse() {
//   const res = await fetch("/houses", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     console.error("Failed to fetch houses");
//     return [];
//   }

//   return res.json();
// }
import http from "@/services/api/interceptor/interceptor";
import { IHousesResponse } from "../../../types/HouseReserve/HouseReserveType";

export const getHouse = async () => {
  try {
    const res: IHousesResponse = await http.get(`/api/houses`);
    return res;
  } catch (error) {
    throw error;
  }
};
