import http from "@/services/api/interceptor/interceptor";

export const deleteBooking = async (id: number) => {
  const res = await http.delete(`/api/admin/bookings/${id}`);
  return res;
};
