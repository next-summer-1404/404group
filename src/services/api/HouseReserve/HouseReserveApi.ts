import http from "@/services/api/interceptor/interceptor";
import { HousesResponse } from "../../../types/RentTypes/HomeTypes";
import { housesFilter } from "../../../types/HouseReserve/HouseReserveType";

export const getHouseReserve = async (): Promise<HousesResponse> => {
  try {
    const res: any = await http.get<HousesResponse>(
      "/api/houses?transactionType=[reservation]"
    );

    return res as HousesResponse;
  } catch (error) {
    throw error;
  }
};
