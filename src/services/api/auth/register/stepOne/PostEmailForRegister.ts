import http from "@/services/api/interceptor/interceptor";
interface RegisterResponse {
  message: string;
  tempUserId: string;
}
export const PostEmailForRegister = async (
  email: string
): Promise<RegisterResponse> => {
  try {
    const res: RegisterResponse = await http.post(
      "https://delta-project.liara.run/api/auth/register",
      {
        email: email,
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
