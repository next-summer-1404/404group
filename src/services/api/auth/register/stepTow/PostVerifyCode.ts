import http from "@/services/api/interceptor/interceptor";

export const PostVerifyCode = async (
  tempUserId: string,
  verificationCode: string
) => {
  try {
    const res = await http.post("/api/auth/verify-email", {
      tempUserId: tempUserId,
      verificationCode: verificationCode,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
