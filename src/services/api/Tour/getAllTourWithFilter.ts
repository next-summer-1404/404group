import http from "@/services/api/interceptor/interceptor";
import { TourResponse } from "@/types/TourTypes/TourTypes";

export const getAllTour = async () => {
  try {
    const res = await http.get<TourResponse>("/api/tour");
    const data = res;
    console.log("Server API RESPONSE:", data);
    return res.data; // ✅ کل res رو برمی‌گردونی
  } catch (error) {
    throw error;
  }
};
