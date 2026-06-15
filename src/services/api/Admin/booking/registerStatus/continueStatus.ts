import http from "@/services/api/interceptor/interceptor";

export const postContinueStatus = async (id: number) => {
  const res = await http.post(`/api/bookings/${id}/continue`);
  return res;
};
