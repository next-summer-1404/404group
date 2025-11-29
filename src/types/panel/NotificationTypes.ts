export interface NotificationTypes {
  data: NotificationItem[];
}

export interface NotificationItem {
  id: number;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  data: NotificationData;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationData {
  offerId: number;
}

export type NotificationType = "offer" | "finance" | "comment" | string;
