import http from "@/services/api/interceptor/interceptor";
interface ForgetResponseStepOne {
  message: string;
}
export const PostNewPasswordStepThree = async (
  email: string,
  resetCode: string,
  newPassword: string
): Promise<ForgetResponseStepOne> => {
  try {
    const res: ForgetResponseStepOne = await http.post(
      "/api/auth/forgot-password/reset",
      {
        email: email,
        resetCode: resetCode,
        newPassword: newPassword,
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
