export type LawQnaListItem = {
  id: number;
  status_text: string;
  title: string;
  user_message: string;
  view_count: number;
  like_count: number;
  mine: boolean;
  liked: boolean;
  created_time: string;
};

export type LawQnaListResponse = {
  list: LawQnaListItem[];
};
