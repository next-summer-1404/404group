import http from "@/services/api/interceptor/interceptor";
import { HousesResponse } from "../../../types/RentTypes/HomeTypes";
import { housesFilter } from "../../../types/HouseReserve/HouseReserveType";

export const getAllHouses = async (
  filters: housesFilter
): Promise<HousesResponse> => {
  try {
    const res: any = await http.get<HousesResponse>("/api/houses", {
      params: filters,
    });

    return res as HousesResponse;
  } catch (error) {
    throw error;
  }
};
