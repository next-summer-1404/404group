export interface UsersTypes {
  user: {
    id: number;
    role: "seller";
    membershipDate: string | null;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    verificationCode: string;
    verificationCodeExpires: string;
    resetCode: string;
    resetCodeExpires: string;
    fullName: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
    createdAt: string;
    updatedAt: string;
  };
  additionalPercentage: number;
}
