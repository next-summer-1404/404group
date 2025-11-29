import http from "@/services/api/interceptor/interceptor";
import { TourResponse } from "@/types/TourTypes/TourTypes";

export const getAllTour = async () => {
  try {
    const res = await http.get<TourResponse>(
      "https://delta-project.liara.run/api/tour"
    );
    const data = res.data;
    console.log("Server API RESPONSE:", res);
    return res.data; // ✅ کل res رو برمی‌گردونی
  } catch (error) {
    throw error;
  }
};
