import http from "@/services/api/interceptor/interceptor";

export const verifyPayment = async (id: number) => {
  const res = await http.post(`/api/payments/${id}/verify`);
  return res;
};
