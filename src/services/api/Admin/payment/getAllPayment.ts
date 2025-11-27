import http from "@/services/api/interceptor/interceptor";
import { PaymentsResponse } from "../../../../types/adminPanel/paymentAdminTypes";

export const getAllPayments = async (filters: any) => {
  const params: any = {};

  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;
  if (filters.status) params.status = filters.status;
  if (filters.sort) params.sort = filters.sort;
  if (filters.userId) params.userId = filters.userId;
  if (filters.amount) params.amount = filters.amount;

  const res: PaymentsResponse = await http.get("/api/admin/payments", {
    params: params,
  });
  return res;
};
