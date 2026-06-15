// types/housesAdmin.ts

export interface ILocation {
  lat: number | string;
  lng: number | string;
}

export interface ICategory {
  name: string;
}

export interface IHouse {
  id: string;
  title: string;
  address: string;
  photos: string[] | null;
  rate: string;
  discounted_price: string | null;
  price: string;
  tags: string[];
  last_updated: string;
  capacity: number;
  location: ILocation;
  categories: ICategory;
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
}

export interface IHouseResponse {
  data: IHouse[];
  totalCount: number;
}
