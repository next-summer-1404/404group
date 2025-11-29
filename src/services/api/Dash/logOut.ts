import http from "@/services/api/interceptor/interceptor";

export const logOutApi = async () => {
  const res = await http.post("https://delta-project.liara.run/auth/logout");
  console.log("logout response ==>", res);
  return res;
};
