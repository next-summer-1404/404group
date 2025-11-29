import http from "@/services/api/interceptor/interceptor";
export interface IRoomType {
  room: string;
  users: number[];
}

export const getAllRome = async () => {
  const res: IRoomType[] = await http.get("/api/admin/chat-rooms");
  return res;
};
