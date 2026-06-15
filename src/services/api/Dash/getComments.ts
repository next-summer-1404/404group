import http from "@/services/api/interceptor/interceptor";
import { ICommentsParams } from "@/types/panel/ICommentCardProps";

export const getComments = async (params?: ICommentsParams) => {
  const result = await http.get("/api/comments", {
    params,
  });
  return result;
};
