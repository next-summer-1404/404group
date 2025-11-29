import http from "@/services/api/interceptor/interceptor";
export interface ICreateCatByAdmin {
  name: string;
}
export const createCatByAdmin = async (
  id: string,
  newCat: ICreateCatByAdmin
) => {
  const res = await http.put(`/api/categories/${id}`, newCat);
  return res;
};
