export interface BookingCustomersResponse {
  bookings: BookingItem[];
}

export interface BookingItem {
  id: number ;
  user_id: number;
  houseId: number;
  reservedDates: ReservedDate[];
  traveler_details: TravelerDetail[];
  status: "pending" | "confirmed" | "cancelled" | string;
  sharedEmail: string | null;
  sharedMobile: string | null;
  createdAt: string;
  updatedAt: string;
  house: HouseInfo;
}

export interface ReservedDate {
  value: string;      
  inclusive: boolean;
}

export interface TravelerDetail {
  gender: "خانم" | "آقا" | string;
  lastName: string;
  birthDate: string;       
  firstName: string;
  nationalId: string;      
}

export interface HouseInfo {
  title: string;           
  price: number;          
}
