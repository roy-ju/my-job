export interface ServiceQnaDetailResponse {
  admin_message: string;
  admin_response_time: string;
  created_time: string;
  id: number;
  user_id: number;
  user_message: string;
}

export interface ServiceQnaListResponse {
  admin_message: string;
  admin_response_time: string;
  created_time: string;
  id: number;
  user_id: number;
  user_message: string;
}

interface QnaListItem {
  id: number;
  user_id: number;
  user_nickname: string;
  message: string;
  agent_message: any;
  agent_response_time: any;
  owner: boolean;
  created_time: string;
}

interface Agent {
  profile_image_full_path: string;
  name: string;
  office_name: string;
  address: string;
  cell_phone: string;
  office_phone: string;
  registration_number: string;
  distance_from_listing: number;
}

export interface QnaListResponse {
  has_next: boolean;
  total_count: number;
  list: QnaListItem[] | null;
  agent: Agent;
}
