export interface ICommentCardProps {
  id?: number;
  showComment?: boolean;
  showUserDetail?: boolean;
  showReplySign?: boolean;
  bgColor?: string;
}

export interface ICommentsParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?:string;
  house_id?: number;
  user_id?: number;
  rating?: number;
  parent_comment_id?: number;
}
export type IComments = {
  data: {
    caption: string;
    created_at: string;
    house_id: string;
    id: string;
    parent_comment_id: string;
    rating: string;
    title: string;
    user_id: string;
  };

  totalCount: number;
};
export type ICommentsData ={
  caption: string;
    created_at: string;
    house_id: string;
    id: string;
    parent_comment_id: string;
    rating: string;
    title: string;
    user_id: string;
}
