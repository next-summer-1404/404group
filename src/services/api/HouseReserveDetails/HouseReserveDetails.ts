import http from "@/services/api/interceptor/interceptor";
import { HousesResponse } from "../../../types/RentTypes/HomeTypes";

export const getHouseReserveDetail = async (id: string) => {
  try {
    const res = await http.get<HousesResponse>(`/api/houses/${id}`);

    return res;
  } catch (error) {
    throw error;
  }
};
