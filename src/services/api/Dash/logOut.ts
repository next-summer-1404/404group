import http from "@/services/api/interceptor/interceptor";

export const logOutApi = async () => {
  const res = await http.post("/api/auth/logout");
  console.log("logout response ==>", res);
  return res;
};
