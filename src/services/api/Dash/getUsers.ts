import { UsersTypes } from "@/types/panel/UsersTypes";
import http from "@/services/api/interceptor/interceptor";

export const getUsers = async (id: string): Promise<UsersTypes> => {
  const res = await http.get<UsersTypes>(
    `https://delta-project.liara.run/users/${id}`
  );
  // console.log(res,'rrrrrrrrrrr')
  return res;
};
