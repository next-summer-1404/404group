import http from "@/services/api/interceptor/interceptor";
import { HousesResponse } from "../../../types/RentTypes/HomeTypes";

export const getAllLocation = async () => {
  try {
    const res = await http.get("/api/locations");
    return res.data;
  } catch (error) {
    throw error;
  }
};
