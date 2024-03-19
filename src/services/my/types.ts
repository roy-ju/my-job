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

export type DeregisterResponse = {
  can_deregister: boolean;
  has_bidding: boolean;
  has_deposit_or_nego_money: boolean;
  has_listing: boolean;
} & ErrorResponse;

export type MySuggestListItem = {
  suggest_id: number;
  realestate_types: string;
  title: string;
  status: number;

  new_suggest_recommended_count: number;
  suggest_recommended_count: number;
  suggest_complete_status: boolean;

  created_time: string;
  danji_or_regional: number;
  buy_or_rents: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  pyoung_text: string;
  negotiable: boolean;
  quick_sale: boolean;
  has_new: boolean;
};

export type MySuggestListResponse = {
  list: MySuggestListItem[] | null;
};

export type MyRealpriceListItem = {
  danji_id: number;
  realestate_type: number;
  danji_name: string;
  price: number;
  monthly_rent_fee: number;
  buy_or_rent: number;
  jeonyong_area: string;
  deal_year: string;
  deal_month: string;
  deal_day: string;
  deal_type: string;
  created_time: string;
};

export type MyRealpriceListItemResponse = {
  list: MyRealpriceListItem[];
  page_number: number;
  updated_time: string;
};

export type FavoriteDanjiListItem = {
  danji_id: number;
  realestate_type: number;
  eubmyundong: string;
  danji_name: string;
  road_name_address: string;
  total_saedae_count: string;
  year: string;
  month: string;
  day: string;
  jeonyong_min: string;
  jeonyong_max: string;
  buy_count: number;
  jeonsae_count: number;
  wolsae_count: number;
  is_favorite: boolean;
  dong_count: number;
};

export type MyFavoriteDanjiListResponse = {
  count: number;
  list: FavoriteDanjiListItem[];
};

export type FavoriteListingListItem = {
  listing_id: number;
  thumbnail_full_path: string;
  listing_title: string;
  realestate_type: number;
  jeonyong_area: string;
  floor_description: string;
  total_floor: string;
  direction: string;
  buy_or_rent: number;
  quick_sale: boolean;
  is_participating: boolean;
  view_count: number;
  participants_count: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  eubmyundong: string;
  is_favorite: boolean;
  label_text: string;
  status_text: string;
};

export type MyFavoriteListingListResponse = {
  count: number;
  list: FavoriteListingListItem[];
};

export type MyListingsRegisteredListItem = {
  listing_id: number;
  thumbnail_full_path: string;
  listing_title: string;
  realestate_type: number;
  jeonyong_area: string;
  floor_description: string;
  total_floor: string;
  direction: string;
  buy_or_rent: number;
  quick_sale: boolean;
  is_participating: boolean;
  view_count: number;
  participants_count: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  eubmyundong: string;
  is_favorite: boolean;
  status_text: string;
  label_text: string;
};

export type MyListingsRegisteredListResponse = {
  count: number;
  list: MyListingsRegisteredListItem[];
};

export interface MyVerifyAddressRequest {
  jibun_address: string;
  road_name_address: string;
  dong: string;
  ho: string;
}

export interface MyVerifyAddressResponse {
  count: number;

  address_list: {
    address_detail: string;
    full_road_name_address: string;
    realestate_unique_number: string;
  }[];
}

export interface MyVerifyOwnershipRequest {
  realestate_unique_number: string;
  address_detail: string;
  bubjungdong_code: string;
  building_name: string;
  jibun_address: string;
  eubmyundong: string;
  lat: number;
  li: string;
  long: number;
  road_name_address: string;
  sido: string;
  sigungu: string;
}

export interface MyVerifyOwnershipResponse {
  user_address_id: number;
  verified: boolean;
}
