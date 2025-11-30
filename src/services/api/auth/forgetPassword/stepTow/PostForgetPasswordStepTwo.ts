import http from "@/services/api/interceptor/interceptor";
interface ForgetResponseStepTwo {
  message: string;
  userId: string;
}
export const PostForgetPasswordStepTwo = async (
  email: string,
  resetCode: string
): Promise<ForgetResponseStepTwo> => {
  try {
    const res: ForgetResponseStepTwo = await http.post(
      "/api/auth/forgot-password/verify",
      {
        email: email,
        resetCode: resetCode,
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
