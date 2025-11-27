export interface AreaItem {
  id: string;
  area_name: string;
  lat: string;
  lng: string;
}

export interface AreasResponse {
  data: AreaItem[];
  totalCount: number;
}
