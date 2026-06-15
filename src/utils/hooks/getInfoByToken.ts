import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
export interface getInfoType {
  email: string;
  exp: number;
  iat: number;
  id: string;
  name: string;
  profilePicture: string;
  role: string;
}
export const useGetInfo = () => {
  const token = Cookies.get("accessTokenClient");
  if (token) {
    const decoded: any = jwt.decode(token);
    console.log(decoded);
    return decoded;
  }
};
