import http from "@/services/api/interceptor/interceptor";
export interface ILogin {
  accessToken: string;
  refreshToken: string;
}
export const Login = async (
  email: string,
  password: string
): Promise<ILogin> => {
  try {
    const res: ILogin = await http.post("/api/auth/login", {
      email: email,
      password: password,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
