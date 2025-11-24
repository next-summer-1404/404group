import http from "@/services/api/interceptor/interceptor";
import { IUsersResponse } from "../../../../../types/adminPanel/adminPanelTypes";

export const getAllUser = async (filters: any) => {
  const res: IUsersResponse = await http.get("/api/admin/users", {
    params: filters,
  });
  return res;
};
