import http from "@/services/api/interceptor/interceptor";
import { IReservationResponse } from "../../../../types/adminPanel/bookingAdminType";

export const getAllReserve = async (filters: any) => {
  const params: any = {};

  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;
  if (filters.status) params.status = filters.status;
  if (filters.user_id) params.user_id = filters.user_id;
  if (filters.house_id) params.house_id = filters.house_id;

  const res: IReservationResponse = await http.get("/api/admin/bookings", {
    params: params,
  });
  return res;
};
