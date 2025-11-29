export interface StyleItem {
  id: string;
  name: string;
}

export interface StylesResponse {
  data: StyleItem[];
  totalCount: number;
}
