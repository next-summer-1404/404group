import http from "@/services/api/interceptor/interceptor";
interface RegisterInformation {
  userId: string;
  password: string;
  phoneNumber: string;
}
export const PostInformation = async (
  userId: string,
  password: string,
  phoneNumber: string
): Promise<RegisterInformation> => {
  try {
    const res: RegisterInformation = await http.post(
      "https://delta-project.liara.run/api/auth/complete-registration",
      {
        userId: userId,
        password: password,
        phoneNumber: phoneNumber,
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
