import http from "@/services/api/interceptor/interceptor";
import { AreasResponse } from "../../../../types/adminPanel/loc";

export const getAllLocationByAdmin = async (filters: any) => {
  const params: any = {};

  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;
  if (filters.sort) params.sort = filters.sort;
  if (filters.order) params.order = filters.order;
  if (filters.area_name) params.area_name = filters.area_name;
  if (filters.lat) params.lat = filters.lat;
  if (filters.lng) params.lng = filters.lng;

  const res: AreasResponse = await http.get("/api/locations", {
    params: params,
  });
  return res;
};
