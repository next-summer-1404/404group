import http from "@/services/api/interceptor/interceptor";
interface ForgetResponseStepOne {
  message: string;
}
export const PostForgetPassStepOne = async (
  email: string
): Promise<ForgetResponseStepOne> => {
  try {
    const res: ForgetResponseStepOne = await http.post(
      "/api/auth/forgot-password/request",
      {
        email: email,
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
