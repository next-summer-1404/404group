export interface ICommentItem {
  id: string;
  house_id: string;
  user_id: string;
  title: string;
  caption: string;
  rating: string | null;
  created_at: string;
  parent_comment_id: string | null;
}

export interface ICommentsResponse {
  data: ICommentItem[];
  totalCount: number;
}
