import http from "@/services/api/interceptor/interceptor";

export const deleteHouses = async (id: number) => {
  const res = await http.delete(`/api/admin/houses/${id}`);
  return res;
};
