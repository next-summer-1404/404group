export interface IUser {
  id: string;
  role: "buyer" | "seller" | "admin" | string; // در صورت داشتن نقش‌های بیشتر، اصلاح کن
  membershipDate: string | null;
  email: string;
  phoneNumber: string;
  emailVerified: boolean;
  verificationCode: string | null;
  verificationCodeExpires: string | null;
  resetCode: string | null;
  resetCodeExpires: string | null;
  fullName: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IUsersResponse {
  data: IUser[]; // لیست کاربران
  totalCount: number; // تعداد کل کاربران
}
