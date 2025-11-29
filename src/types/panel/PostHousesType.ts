export interface PostHousesType {
  last_updated: string;
  num_comments: number;
  id: number;
  title: string;
  address: string;
  rate: number;
  price: number;
  tags: string[];
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
  transaction_type: string;
  caption: string;
  sellerId: number;
  sellerName: string;
  photos: string[] | null;
  discounted_price: number | null;
  discount_id: number | null;
  
}
