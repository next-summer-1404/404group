import http from "@/services/api/interceptor/interceptor";
import { BookingCustomersResponse } from "@/types/panel/BookingCustomersResponse ";

export const getCustomersBooking = async (
  id: string
): Promise<BookingCustomersResponse> => {
  const response = await http.get<BookingCustomersResponse>(
    `https://delta-project.liara.run/bookings/${id}/customers`
  );

  return response;
};
