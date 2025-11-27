import http from "@/services/api/interceptor/interceptor";
import { IContactListResponse } from "../../../../types/adminPanel/contactUsTypes";

export const getContactUs = async (filters: any) => {
  const params: any = {};

  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;
  if (filters.sort) params.sort = filters.sort;
  if (filters.order) params.order = filters.order;
  if (filters.title) params.title = filters.title;

  const res: IContactListResponse = await http.get("/api/contact-us", {
    params: params,
  });
  return res;
};
