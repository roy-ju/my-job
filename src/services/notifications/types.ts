export interface NotificationListItem {
  id: number;
  link_type: number;
  type: number;
  category: number;
  user_id: number;
  title: string;
  message: string;
  listing_title: string;
  listing_id: number;
  chat_room_id: any;
  read_time: string | null;
  deleted_time: any;
  created_time: string;
}

export interface NotificationListResponse {
  has_next: boolean;
  total_count: number;
  list: NotificationListItem[];
}
