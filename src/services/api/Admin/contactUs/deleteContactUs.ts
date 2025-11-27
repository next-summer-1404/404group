import http from "@/services/api/interceptor/interceptor";

export const deleteContactUsByAdmin = async (id: number) => {
  const res = await http.delete(`/api/contact-us/${id}`);
  return res;
};
