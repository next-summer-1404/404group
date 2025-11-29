export interface UpdateUserRequest {
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface UpdateUserResponse {
  user: {
    id: string;
    role: "buyer" | "seller" | "admin";
    membershipDate: string;
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
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
  };
}
