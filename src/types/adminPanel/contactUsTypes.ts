export interface IContactItem {
  id: string;
  title: string;
  message: string;
}

export interface IContactListResponse {
  data: IContactItem[];
  totalCount: number;
}
