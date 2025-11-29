import http from "@/services/api/interceptor/interceptor";
export interface ICreateCatByAdmin {
  name: string;
}
export const createCatByAdmin = async (newCat: ICreateCatByAdmin) => {
  const res = await http.post(`/api/categories`, newCat);
  return res;
};
