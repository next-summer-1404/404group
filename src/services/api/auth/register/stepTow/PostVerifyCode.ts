import http from "@/services/api/interceptor/interceptor";
interface RegisterVerifyCode {
  message: string;
  userId: string;
}
export const PostVerifyCode = async (
  tempUserId: string,
  verificationCode: string
): Promise<RegisterVerifyCode> => {
  try {
    const res: RegisterVerifyCode = await http.post("/api/auth/verify-email", {
      tempUserId: tempUserId,
      verificationCode: verificationCode,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
