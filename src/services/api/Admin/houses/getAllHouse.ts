// getAllHousesWithFilter.ts

import http from "@/services/api/interceptor/interceptor";
import { IHouseResponse } from "../../../../types/adminPanel/housesAdmin";

export const getAllHousesForAdmin = async (
  filters: any
): Promise<IHouseResponse> => {
  const res: IHouseResponse = await http.get("/api/admin/houses", {
    params: filters,
  });
  return res;
};
