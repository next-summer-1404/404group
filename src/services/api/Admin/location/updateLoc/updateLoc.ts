import http from "@/services/api/interceptor/interceptor";
export interface ICreateLocationByAdmin {
  area_name: string;
  lat: string;
  lng: string;
}
export const updateLocationByAdmin = async (
  id: string,
  newLoc: ICreateLocationByAdmin
) => {
  const res = await http.put(`/api/locations/${id}`, newLoc);
  return res;
};
