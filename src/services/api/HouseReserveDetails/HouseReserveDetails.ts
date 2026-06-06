import http from "@/services/api/interceptor/interceptor";
import { House, HousesResponse } from "../../../types/RentTypes/HomeTypes";

export const getHouseReserveDetail = async (id: string) => {
  try {
    console.log(id);
    const res: House = await http.get(`/api/houses/${id.id}`);

    return res;
  } catch (error: any) {
    console.log("status:", error.response?.status);
    console.log("data:", error.response?.data);
    console.log("url:", error.config?.url);
    throw error;
  }
};
