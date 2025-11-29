export interface FavoriteTypes {
  data: SellerFinanceItem[];
}

export interface SellerFinanceItem {
  id: number;
  user_id: string;
  house_id: string;
  createdAt: string;
  updatedAt: string;
  house: HouseInfo;
  rate: number | null;
  price: string;
}

export interface HouseInfo {
  id: string;
  title: string;
  address: string;
  photos: string[];
}
