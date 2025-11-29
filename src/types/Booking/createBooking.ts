export interface TravelerDetail {
  firstName: string;
  lastName: string;
  gender: "مرد" | "زن";
  birthDate: string;
  nationalId: string;
}

export interface CreateBookingPayload {
  houseId: string;
  reservedDates: string[];
  traveler_details: TravelerDetail[];
  sharedEmail: string;
  sharedMobile: string;
}
