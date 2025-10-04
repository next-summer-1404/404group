export interface Location {
  lat: number;
  lng: number;
}

export interface Categories {
  name: string;
}

export interface House {
  id: string;
  title: string;
  address: string;
  photos: string[]; // آرایه از استرینگ
  rate: number | null;
  discounted_price: number | null;
  price: string; // یا number بسته به API
  tags: string[];
  last_updated: string;
  capacity: number;
  location: Location;
  categories: Categories;
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
  num_comments: number;
  discount_id: string | null;
  transaction_type: string;
  sellerId: string;
  sellerName: string;
  caption: string;
  bookings: number;
  favoriteId: string | null;
  isFavorite: boolean;
}

// اگر میخوای برای پاسخ API استفاده کنی:
export interface HousesResponse {
  houses: House[];
  totalCount: number;
}
