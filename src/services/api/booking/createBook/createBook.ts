import http from "@/services/api/interceptor/interceptor";
import Cookies from "js-cookie";
import { CreateBookingPayload } from "../../../../types/Booking/createBooking";

export const CreateBook = async (travel: CreateBookingPayload) => {
  try {
    const token = Cookies.get("accessTokenClient"); // توکن از کوکی خوانده می‌شود

    const res = await http.post("/api/bookings", travel, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
};
