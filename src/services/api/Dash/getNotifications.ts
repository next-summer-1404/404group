import { NotificationTypes } from "@/types/panel/NotificationTypes";
import http from "@/services/api/interceptor/interceptor";

export const getNotifications = async (): Promise<NotificationTypes> => {
  const response = await http.get<NotificationTypes>(
    "https://delta-project.liara.run/notifications"
  );
  return response;
};
