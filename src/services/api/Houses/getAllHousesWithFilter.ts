import http from "@/services/api/interceptor/interceptor";
import { HousesResponse } from "../../../types/RentTypes/HomeTypes";
import { housesFilter } from "../../../types/HouseReserve/HouseReserveType";

export const getAllHouses = async (
  filters: housesFilter
): Promise<HousesResponse> => {
  try {
    let params: housesFilter = {};

    if (filters.page) params.page = filters.page;
    if (filters.limit) params.limit = filters.limit;
    if (filters.search) params.search = filters.search;
    if (filters.order) params.order = filters.order;
    if (filters.sort) params.sort = filters.sort;
    if (filters.propertyType) params.propertyType = filters.propertyType;
    if (filters.location) params.location = filters.location;

    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;

    if (filters.minRent) params.minRent = filters.minRent;
    if (filters.maxRent) params.maxRent = filters.maxRent;

    if (filters.minMortgage) params.minMortgage = filters.minMortgage;
    if (filters.maxMortgage) params.maxMortgage = filters.maxMortgage;

    if (filters.minArea) params.minArea = filters.minArea;
    if (filters.maxArea) params.maxArea = filters.maxArea;

    const res: any = await http.get<HousesResponse>("/api/houses", {
      params: params,
    });

    return res as HousesResponse;
  } catch (error) {
    throw error;
  }
};
