export interface IHouseResponse {
  data: IHouse[];
  totalCount: number;
}

export interface IHouse {
  id: string;
  title: string;
  address: string;
  photos: string[] | null; // ممکن است null یا array باشد
  rate: string;
  discounted_price: string | null;
  price: string;
  tags: string[];
  last_updated: string;
  capacity: number;

  location: {
    lat: number | string;
    lng: number | string;
  };

  categories: {
    name: string;
  };

  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
  num_comments: number;
  discount_id: string | null;

  transaction_type: "mortgage" | "reservation" | "rental" | string;

  sellerId: string;
  sellerName: string;

  caption: string;
}
