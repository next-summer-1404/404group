import http from "@/services/api/interceptor/interceptor";

export const putRoles = async (id: string, role: string) => {
  const res = await http.put(`/api/admin/users/${id}/role`, role);
  return res;
};
