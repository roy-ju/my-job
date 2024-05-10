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
  status: number;
  realestate_types: string;
  title: string;
  danji_or_regional: number;
  buy_or_rents: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  pyoung_text: string;
  negotiable: boolean;
  quick_sale: boolean;
  suggest_recommended_count: number;
  new_suggest_recommended_count: number;
  has_new: boolean;
  suggest_complete_status: boolean;
  is_interviewed: false;
  interview_available_times: string;
  created_time: string;
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

export type MyAddressListRequest = {
  activeOnly?: boolean;
  danjiID?: number | null;
  isFetch?: boolean;
  exclude_duplicated_listing?: boolean;
};

export interface MyAddressListItem {
  id: number;
  status: number;
  road_name_address: string;
  danji_name: string;
  dong: string;
  ho: string;
  floor?: string | null;
}

export interface MyAddressListResponse {
  list: MyAddressListItem[] | null;
}

interface Listing {
  id: number;
  user_id: number;
  agent_id: any;
  assigned_agent_id: number;
  trade_id: string;
  status: number;
  listing_title: string;
  internal_listing_title: string;
  gap_investment: boolean;
  owner_name: string;
  owner_phone: string;
  realestate_unique_number: string;
  danji_id: number;
  bubjungdong_code: string;
  road_name_address: string;
  jibun_address: string;
  address_detail: string;
  dong: string;
  ho: string;
  floor: string;
  sido: string;
  sigungu: string;
  eubmyundong: string;
  li: string;
  road_name_bonbun: string;
  road_name_bubun: string;
  jibun_bonbun: string;
  jibun_bubun: string;
  building_name: string;
  long: number;
  lat: number;
  token: string;
  realestate_type: any;
  officetel_type: any;
  buy_or_rent: number;
  quick_sale: boolean;
  quick_sale_comparative: string;
  trade_price: number;
  deposit: number;
  monthly_rent_fee: number;
  negotiation_target: number;
  negotiation_or_auction: number;
  auction_end_days: any;
  auction_end_time: any;
  auction_batch_processed_time: any;
  negotiation_conversion_time: any;
  administrative_fee: number;
  special_terms: string;
  contract_amount: number;
  contract_amount_negotiable: boolean;
  interim_amount1: number;
  interim_amount_negotiable1: boolean;
  interim_amount_payment_time1: any;
  interim_amount_payment_time1_type: number;
  interim_amount2: number;
  interim_amount_negotiable2: boolean;
  interim_amount_payment_time2: any;
  interim_amount_payment_time2_type: number;
  interim_amount3: number;
  interim_amount_negotiable3: boolean;
  interim_amount_payment_time3: any;
  interim_amount_payment_time3_type: number;
  remaining_amount: number;
  remaining_amount_payment_time: any;
  remaining_amount_payment_time_type: number;
  rent_contract_term_year: number;
  rent_contract_term_month: number;
  rent_contract_term_negotiable: boolean;
  rent_end_date: any;
  move_in_date: any;
  move_in_date_type: number;
  rent_area: string;
  jeonsae_loan: boolean;
  veranda_extended: boolean;
  veranda_remodelling: boolean;
  description: string;
  jeonyong_area: string;
  gonggeup_area: string;
  direction: string;
  floor_description: string;
  total_floor: string;
  toogi_region: string;
  toji_trade_eligible: boolean;
  room_count: string;
  bathroom_count: string;
  storey: string;
  agent_selection_expire_time: any;
  agent_assigned_view_time: any;
  agent_completion_expire_time: string;
  cancelled_time: any;
  cancelled_reason: string;
  cancellation_type: number;
  view_count: number;
  updated_time: string;
  created_time: string;
}

interface AgentSummary {
  profile_image_full_path: string;
  name: string;
  office_name: string;
  address: string;
  cell_phone: string;
  office_phone: string;
  registration_number: string;
  distance_from_listing: number;
  description: string;
}

export interface MyListingDetailResponse {
  listing_id: number;
  listing_status: number;
  listing: Listing | null;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  full_road_name_address: string;
  agent_summary: AgentSummary;
  debt_successions:
    | {
        id: number;
        listing_id: number;
        name: string;
        amount: number;
        created_time: string;
      }[]
    | null;
  collaterals:
    | {
        id: number;
        listing_id: number;
        name: string;
        amount: number;
        created_time: string;
      }[]
    | null;
  tags: any[];
  options: any[];
  target_price: number;
  seller_agent_chat_room_id: any;
  address_list:
    | {
        realestate_unique_number: string;
        full_road_name_address: string;
        address_detail: string;
      }[]
    | null;
  agent_list:
    | {
        id: number;
        name: string;
        email: string;
        profile_image_full_path: string;
        office_name: string;
        cell_phone: string;
        office_phone: string;
        full_road_name_address: string;
        full_jibun_address: string;
        registration_number: string;
        description: string;
        unit: number;
        distance_from_listing: number;
        performance_score: number;
      }[]
    | null;
}

export interface MyAgreementInfoResponse {
  full_road_name_address: string;
  requestor_name: string;
  token: string;
  loi: number;
  status_text: '';
}

export type AgentInfo = {
  agent_name: string;
  agent_jibun_address: string;
  agent_address_detail: string;
  agent_registration_number: string;
  agent_office_name: string;
  agent_office_phone: string;
};

export interface MyListingDetailPassedResponse {
  agent_info: null | AgentInfo;
  listing_id: number;
  listing_status: number;
  thumbnail_full_path: any;
  listing_title: string;
  road_name_address: string;
  jeonyong_area: string;
  floor_description: string;
  total_floor: string;
  direction: string;
  seller_agent_chat_room_id: number;
  seller_agent_chat_room_closed: boolean;
  contract_completion_date: string;
  contract_trade_or_deposit_price: number;
  contract_monthly_rent_fee: number;
  status_text: string;
  has_review: boolean;
  listing_contract_id: number;
}

interface MyParticipatedListingListItem {
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
  personal_status: string;
  bidding_id: number;
  label_text: string;
}

export interface MyParticipatedListingListResponse {
  count: number;
  list: MyParticipatedListingListItem[];
}

export interface MyParticipatedListingHistoryList {
  description: string;
  created_time: string;
  bidding_trade_or_deposit_price: number;
  bidding_monthly_rent_fee: number;
}

export interface MyParticipatedListingDetailResponse {
  bidding_id: number;
  bidding_monthly_rent_fee: number;
  bidding_status: number;
  bidding_trade_or_deposit_price: number;
  buy_or_rent: number;
  buyer_agent_chat_room_id: number;
  buyer_agent_chat_room_closed: boolean;
  can_have_earlier_remaining_amount_payment_time: boolean;
  can_have_more_contract_amount: boolean;
  can_have_more_interim_amount: boolean;
  contract_amount: number;
  contract_bidding_monthly_rent_fee: number;
  contract_bidding_trade_or_deposit_price: number;
  contract_date: string;
  description: string;
  etcs: string;
  floor_description: string;
  has_review: boolean;
  interim_amount: number;
  jeonyong_area: string;
  list: MyParticipatedListingHistoryList[];
  listing_contract_id: number;
  listing_id: number;
  listing_status: number;
  listing_title: string;
  monthly_rent_fee: number;
  move_in_date: string;
  move_in_date_type: number;
  realestate_type: number;
  remaining_amount_payment_time: string;
  remaining_amount_payment_time_type: number;
  road_name_address: string;
  status_text: string;
  thumbnail_full_path: string;
  total_floor: string;
  trade_or_deposit_price: number;
  direction: string;
  visit_user_type: number;
}
