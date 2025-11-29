import http from "@/services/api/interceptor/interceptor";
import {
  UpdateUserRequest,
  UpdateUserResponse,
} from "@/types/panel/UpdateUserType";

export const putUpdateUser = async (id: string, value: UpdateUserRequest) => {
  const res = await http.put<UpdateUserResponse>(
    `https://delta-project.liara.run/users/${id}`,
    value
  );
  return res;
};
