export interface housesFilter {
  page?: number;
  limit?: number;
  transactionType?: string;
  search?: string;
  order?: string;
  sort?: string;
  propertyType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minRent?: number;
  maxRent?: number;
  minMortgage?: number;
  maxMortgage?: number;
  minArea?: number;
  maxArea?: number;
}
export interface Property {
  id: string;
  title: string;
  address: string;
  caption: string;

  price: string;
  discounted_price: string | null;
  discount_id: string | null;

  rate: string | null;
  capacity: number;
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
  transaction_type: "rental" | "reservation" | string;

  tags: string[];
  photos: string[];

  num_comments: number;
  bookings: number;

  categories: {
    name: string;
  };

  location: {
    lat: number;
    lng: number;
  };

  sellerId: string;
  sellerName: string;

  favoriteId: string | null;
  isFavorite: boolean;

  last_updated: Record<string, unknown>;
}
export interface IHousesResponse {
  totalCount: number;
  houses: IHouse[];
}

export interface IHouse {
  id: string;
  title: string;
  address: string;
  photos: string[];
  rate: string;
  discounted_price: number | null;
  price: string;
  tags: string[];
  last_updated: string;
  capacity: number;
  location: {
    lat: number;
    lng: number;
  };
  categories: {
    name: string;
  };
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
  num_comments: number;
  discount_id: number | null;
  transaction_type: "rental" | "sale" | string;
  sellerId: string;
  sellerName: string;
  caption: string;
  bookings: number;
  favoriteId: string | null;
  isFavorite: boolean;
}
