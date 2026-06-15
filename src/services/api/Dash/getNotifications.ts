import { NotificationTypes } from "@/types/panel/NotificationTypes";
import http from "@/services/api/interceptor/interceptor";

export const getNotifications = async (): Promise<NotificationTypes> => {
  const response = await http.get<NotificationTypes>("/api/notifications");
  return response;
};
