import http from "@/services/api/interceptor/interceptor";
import { PaymentsResponse } from "@/types/panel/PaymentType ";

export const getPayments = async (): Promise<PaymentsResponse> => {
  const response = await http.get<PaymentsResponse>("/api/payments");
  return response;
};
