import http from "@/services/api/interceptor/interceptor";
export interface ICreateLocationByAdmin {
  area_name: string;
  lat: string;
  lng: string;
}
export const createLocationByAdmin = async (newLoc: ICreateLocationByAdmin) => {
  const res = await http.post(`/api/locations`, newLoc);
  return res;
};
