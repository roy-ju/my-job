export interface DashboardInfoResponse {
  suggest_sent_count: number;
  suggest_recommended_count: number;
  bidding_submitted_count: number;
  bidding_accepted_count: number;
  bidding_pre_contract_complete_count: number;
  bidding_past_count: number;
  my_registering_listing_count: number;
  my_active_listing_count: number;
  my_contract_complete_listing_count: number;
  my_cancelled_listing_count: number;
}

export type SuggestRecommendDetailListItem = {
  address_free_text: string;
  buy_or_rent: number;
  chat_room_id: number;
  created_time: string;
  direction: string;
  floor: string;
  jeonyong_areas: string;
  monthly_rent_fee: number;
  note: string;
  suggest_recommend_id: number;
  suggest_recommend_status: number;
  trade_or_deposit_price: number;
  with_address: boolean;
};

export type SuggestRecommendDetailList = {
  agent_has_suggest_complete_cancelled: boolean;
  agent_has_suggest_complete_completed: boolean;
  agent_office_address: string;
  agent_office_name: string;
  agent_office_phone: string;
  chat_room_id: number | null;
  chat_room_is_deleted: false;
  agent_suggest_complete_history_status: number;
  is_agent: boolean;
  recommender_deregistered: boolean;
  recommender_id: number;
  recommender_name: string;
  recommender_profile_image_url: string;
  suggest_recommend_ever_user_accepted: boolean;
  suggest_recommend_has_sent: boolean;
  suggest_recommend_detail_list: SuggestRecommendDetailListItem[];
};

export interface MySuggestRecommendsResponse {
  count: number;
  suggest_status: number;
  list: SuggestRecommendDetailList[] | null;
}

export interface UploadProfileImageResponse {
  full_file_paths: string[];
}
