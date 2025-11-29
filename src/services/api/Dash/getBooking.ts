import { BookingTypes } from "@/types/panel/Booking";
import http from "@/services/api/interceptor/interceptor";

export const getBooking = async (): Promise<BookingTypes> => {
  const response = await http.get<BookingTypes>(
    "https://delta-project.liara.run/bookings"
  );
  // console.log(response,'rrrrrrr')
  return response;
};
