import http from "@/services/api/interceptor/interceptor";
export interface IPutCommentByAdmin {
  title: string;
  caption: string;
  rating: string;
}
export const putCommentByAdmin = async (
  id: string,
  newComment: IPutCommentByAdmin
) => {
  const res = await http.put(`/api/admin/comments/${id}`, newComment);
  return res;
};
