import http from "@/services/api/interceptor/interceptor";
import { StylesResponse } from "../../../../types/adminPanel/categoryAdmin";

export const getAllCategory = async (filters: any) => {
  const params: any = {};

  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;
  if (filters.sort) params.sort = filters.sort;
  if (filters.name) params.name = filters.name;

  const res: StylesResponse = await http.get("/api/admin/users", {
    params: params,
  });
  return res;
};
