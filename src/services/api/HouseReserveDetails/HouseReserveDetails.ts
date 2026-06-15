import http from "@/services/api/interceptor/interceptor";
import { House, HousesResponse } from "../../../types/RentTypes/HomeTypes";

export const getHouseReserveDetail = async (id: string) => {
  try {
    const res: House = await http.get(`/api/houses/${id}`);

    return res;
  } catch (error) {
    throw error;
  }
};
