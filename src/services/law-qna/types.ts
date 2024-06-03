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

export type LawQnaDetailResponse = {
  id: number;
  mine: boolean;
  liked: boolean;
  title: string;
  user_message: string;
  user_nickname: string;
  created_time: string;
  admin_message: string;
  admin_updated_time: string;
  like_count: number;
  prev: {
    id: number;
    title: string;
  } | null;
  next: {
    id: number;
    title: string;
  } | null;
};
