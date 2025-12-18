import http from "@/services/api/interceptor/interceptor";
import { ICommentsResponse } from "../../../../types/adminPanel/commentAdminTypes";

export const getAllComment = async (filters: any) => {
  const params: any = {};

  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;
  if (filters.sort) params.sort = filters.sort;
  if (filters.rating) params.rating = filters.rating;
  if (filters.user_id) params.user_id = filters.user_id;
  if (filters.house_id) params.house_id = filters.house_id;

  const res: ICommentsResponse = await http.get("/api/comments", {
    params: params,
  });
  return res;
};
