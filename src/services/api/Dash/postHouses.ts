import { PostHousesType } from "@/types/panel/PostHousesType";
import http from "@/services/api/interceptor/interceptor";

export const postHouses = async (value: PostHousesType) => {
  const res = await http.post("https://delta-project.liara.run/houses", value);
  return res;
};
