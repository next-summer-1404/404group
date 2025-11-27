import http from "@/services/api/interceptor/interceptor";
import { IUsersResponse } from "../../../../../types/adminPanel/adminPanelTypes";

export const getAllUser = async (filters: any) => {
  const params: any = {};

  if (filters.email) params.email = filters.email;
  if (filters.limit) params.limit = filters.limit;
  if (filters.role) params.role = filters.role;
  if (filters.membershipDate) params.membershipDate = filters.membershipDate;
  console.log(params);

  const res: IUsersResponse = await http.get("/api/admin/users", {
    params: params,
  });
  return res;
};
