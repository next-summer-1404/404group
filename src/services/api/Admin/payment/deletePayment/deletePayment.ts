import http from "@/services/api/interceptor/interceptor";

export const deletePayment = async (id: number) => {
  const res = await http.delete(`/api/admin/payments/${id}`);
  return res;
};
