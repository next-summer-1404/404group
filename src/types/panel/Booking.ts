export interface BookingTypes {
  data: BookingItem[];
  totalCount: number;
}

export interface BookingItem {
  id: number;
  user_id: number;
  houseId: number;
  reservedDates: ReservedDate[];
  traveler_details: TravelerDetail[];
  status: "pending" | "approved" | "rejected";
  sharedEmail?: string;
  sharedMobile?: string;
  createdAt: string;
  updatedAt: string;
  house: HouseDetail;
}

export interface ReservedDate {
  value: string;
  inclusive: boolean;
}

export interface TravelerDetail {
  gender: "male" | "female" | "سایر" | string;
  lastName: string;
  birthDate: string;
  firstName: string;
  nationalId: string;
}

export interface HouseDetail {
  title: string;
  price: string;
}
