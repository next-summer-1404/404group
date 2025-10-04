import http from "@/services/api/interceptor/interceptor";
import { HousesResponse } from "../../../types/RentTypes/HomeTypes";

interface housesFilter {
  page?: number;
  limit?: number;
  transactionType?: string;
  search?: string;
  order?: string;
  sort?: string;
  propertyType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minRent?: number;
  maxRent?: number;
  minMortgage?: number;
  maxMortgage?: number;
  minArea?: number;
  maxArea?: number;
}

export const getAllHouses = async (
  filters: housesFilter
): Promise<HousesResponse> => {
  try {
    // ⚠️ به Axios بگوییم که داده ها همان HousesResponse هستند
    const res: any = await http.get<HousesResponse>("/api/houses", {
      params: filters,
    });

    // چون اینترسپتور response.data را برمی‌گرداند، res خودش از نوع HousesResponse است
    return res as HousesResponse;
  } catch (error) {
    throw error;
  }
};
