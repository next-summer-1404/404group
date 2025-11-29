export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface Tour {
  id: string;
  title: string;
  address: string;
  photos: string[];
  description: string;
  price: string;
  startDate: string;
  endDate: string;
  tags: string[];
  updatedAt: string;
  location: Location;
  createdAt: string;
  facilities: string[];
  services: string[];
  userId: string;
}

export interface TourResponse {
  houses: Tour[];
  totalCount: number;
}
