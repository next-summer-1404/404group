export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface PostHousePayload {
  id: number;
  last_updated: string;
  num_comments: number;
  title: string;
  address: string;
  rate: string;
  price: string;
  tags: string[];
  capacity: number;
  location: GeoLocation;
  categories: { name: string };
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
  transaction_type: "reservation" | "mortgage" | "sale";
  caption: string;
  sellerId: string;
  sellerName: string;
  photos: string[];
  discounted_price: string | null;
  discount_id: string | null;
}

export interface House {
  id: number;
  last_updated: string;
  num_comments: number;
  title: string;
  address: string;
  rate: string;
  price: string;
  tags: string[];
  capacity: number;
  location: GeoLocation;
  categories: { name: string };
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
  transaction_type: "reservation" | "mortgage" | "sale";
  caption: string;
  sellerId: string;
  sellerName: string;
  photos: string[] | null;
  discounted_price: string | null;
  discount_id: string | null;
}

export interface GetSellerHousesResponse {
  houses: House[];
  totalCount: number;
}
