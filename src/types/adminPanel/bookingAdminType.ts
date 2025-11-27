export interface IReservedDate {
  value: string;
  inclusive: boolean;
}

export interface ITravelerDetail {
  gender: string;
  lastName: string | null;
  birthDate: string;
  firstName: string | null;
  nationalId: string;
}

export interface IReservationItem {
  id: number;
  user_id: number;
  houseId: number;
  reservedDates: IReservedDate[];
  traveler_details: ITravelerDetail[];
  status: string;
  sharedEmail: string;
  sharedMobile: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReservationResponse {
  data: IReservationItem[];
  totalCount: number;
}
