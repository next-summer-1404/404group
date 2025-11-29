import http from "@/services/api/interceptor/interceptor";
export interface IPustPayment {
  amount: string;
  status: string;
  description: string;
}
export const putPayment = async (id: string, newPayment: IPustPayment) => {
  const res = await http.put(`api/admin/payments/${id}`, newPayment);
  return res;
};
