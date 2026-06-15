export interface IChatItem {
  id: string;
  senderId: number;
  getterId: number;
  room: string;
  message: string | null;
  files: string[] | null; // اگر فایل‌ها آرایه نیستند بگو اصلاحش کنم
  createdAt: string;
  updatedAt: string;
}

export interface IChatsResponse {
  chats: IChatItem[];
}
import http from "@/services/api/interceptor/interceptor";

export const getAllChats = async (roomId: string) => {
  const res: IChatsResponse = await http.get(
    `/api/admin/chat-rooms/${roomId}/chats`
  );
  return res;
};
