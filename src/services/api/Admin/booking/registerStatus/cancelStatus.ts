import http from "@/services/api/interceptor/interceptor";

export const postCancleStatus = async (id: number) => {
  const res = await http.post(`/api/bookings/${id}/cancel`);
  return res;
};
