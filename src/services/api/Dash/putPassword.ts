import http from "@/services/api/interceptor/interceptor";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "@/types/panel/ChangePassword";

export const putPassword = async (value: ChangePasswordRequest) => {
  const res = await http.put<ChangePasswordResponse>(
    "https://delta-project.liara.run/users/change-password",
    value
  );
  return res;
};
