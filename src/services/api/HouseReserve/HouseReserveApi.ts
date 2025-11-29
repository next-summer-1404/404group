import http from "@/services/api/interceptor/interceptor";
import { HousesResponse } from "../../../types/RentTypes/HomeTypes";
import { housesFilter } from "../../../types/HouseReserve/HouseReserveType";

export const getHouseReserve = async (params: any): Promise<HousesResponse> => {
  try {
    const res: any = await http.get<HousesResponse>(
      "https://delta-project.liara.run/api/houses",
      {
        params: { transactionType: ["reservation"], ...params },
      }
    );

    return res as HousesResponse;
  } catch (error) {
    throw error;
  }
};
