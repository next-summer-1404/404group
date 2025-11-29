import http from "@/services/api/interceptor/interceptor";

export const putUsers = async (id: string, body: any) => {
  const res = await http.put(`/api/admin/users/${id}`, body);
  return res;
};
