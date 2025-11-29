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
