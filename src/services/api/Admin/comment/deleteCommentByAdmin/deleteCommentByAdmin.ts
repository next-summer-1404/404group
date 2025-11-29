import http from "@/services/api/interceptor/interceptor";

export const deleteCommentByAdmin = async (id: number) => {
  const res = await http.delete(`/api/admin/comments/${id}`);
  return res;
};
