// getAllHousesWithFilter.ts

import http from "@/services/api/interceptor/interceptor";
import { IHouseResponse } from "../../../../types/adminPanel/housesAdmin";

export const getAllHousesForAdmin = async (
  filters: any
): Promise<IHouseResponse> => {
  const params: any = {};

  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;
  if (filters.sellerId) params.sellerId = filters.sellerId;
  if (filters.price && filters.price != 0) params.price = filters.price;

  const res: IHouseResponse = await http.get("/api/admin/houses", {
    params: params,
  });
  return res;
};
