export type DanjiDetailResponse = {
  danji_id: number;
  type: number;
  name: string;
  bubjungdong_code: string;
  road_name_address: string;
  jibun_address: string;
  long: number;
  lat: number;
  total_saedae_count: string;
  use_accepted_year: string;
  construction_start_date: string;
  total_dong_count: string;
  total_parking_count: string;
  parking_per_saedae: string;
  highest_floor: string;
  gunpae_rate: string;
  yongjuk_rate: string;
  building_purpose: string;
  building_purpose_etc: string;
  daeji_area: string;
  architecture_area: string;
  total_area: string;
  buy_listing_count: number;
  rent_listing_count: number;
  hall_type: string;
  sigong_company: string;
  heat_type: string;
  is_favorite: boolean;
  latest_price: number;
  latest_pyoung: string;
  sido_name: string;
  sigungu_name: string;
  sido_code: string;
  sigungu_code: string;
  jeonyong_min: number;
  jeonyong_max: number;
  suggest_count: number;

  latest_buy_year: string;
  latest_buy_month: string;
  latest_buy_day: string;
  latest_buy_price: number;

  latest_rent_day: string;
  latest_rent_deposit: number;
  latest_rent_month: string;
  latest_rent_monthly_rent_fee: number;
  latest_rent_year: string;
} & ErrorResponse;

export type DanjiPhotoItem = {
  id: number;
  listing_id: string;
  danji_id: number;
  token: string;
  document_type: number;
  full_file_path: string;
  thumb_file_path: string;
  created_time: string;
};

export type DanjiPhotosResponse = {
  danji_photos: DanjiPhotoItem[];
} & ErrorResponse;

export type NaverDanjiResponse = {
  outlink_pc: string;
  outlink_mobile: string;
};

export type DanjiListingListItem = {
  listing_id: number;
  listing_title: string;
  buy_or_rent: number;
  is_participating: boolean;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  jeonyong_area: string;
  floor_description: string;
  total_floor: string;
  direction: string;
  quick_sale: boolean;
  view_count: number;
  participants_count: number;
  label_text: string;
};

export type DanjiListingListResponse = {
  list: DanjiListingListItem[];
  total_count: number;
};

export type DanjiSuggestListItem = {
  my_suggest: boolean;
  iam_recommending: boolean;
  suggest_id: number;
  suggest_complete_status: boolean;
  suggest_status: number;
  user_nickname: string;
  user_profile_image_url: string;
  danji_id: number;
  request_number: string;
  danji_or_regional: number;
  request_target_text: string;
  realestate_types: string;
  buy_or_rents: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  pyoung_text: string;
  pyoungs: string;
  pyoung_from: string;
  pyoung_to: string;
  purpose: string;
  invest_amount: number;
  quick_sale: boolean;
  negotiable: boolean;
  move_in_date: null | string;
  move_in_date_type: null | number;
  note: string;
  additional_conditions: string;
  updated_time: string;
  created_time: string;
  view_count: number;
};

export type DanjiSuggestListResponse = {
  list: DanjiSuggestListItem[];
  total_count: number;
};

export type SchoolItem = {
  school_id: string;
  name: string;
  school_type: string;
  found_type: string;
  students_per_teacher_count: number;
  distance_in_km: number;
};

export type DanjiSchoolsResponse = {
  list_all: SchoolItem[] | null;
  list_elementary_schools: SchoolItem[] | null;
  list_middle_schools: SchoolItem[] | null;
  list_high_schools: SchoolItem[] | null;
};

export type RealPriceChartItem = {
  date: string;
  count: number;
  prices: string;
  avg_price: number;
};

export type DanjiRealPriceChartResponse = {
  list: RealPriceChartItem[] | null;
};

export type PyoungListItem = {
  min_jeonyong: number;
  max_jeonyong: number;
  avg_jeonyong: number;
  gonggeup_pyoung: number;
  saedae_count: number;
  default: boolean;
};

export type DanjiRealPricesPyoungListResponse = {
  buy_or_rent: number;
  list: PyoungListItem[] | null;
  has_jyb: boolean;
};

export type RealPricesListItem = {
  year: string;
  month: string;
  day: string;
  buy_or_rent: number;
  price: number;
  monthly_rent_fee: number;
  floor: string;
  trade_type: string;
  cancel_deal_day: string;
};

export type DanjiRealPricesListResponse = {
  list: RealPricesListItem[];
  page_number: number;
  page_size: number;
};

export type DanjiTradeTurnrateResponse = {
  trade_turn_rate: number;
};

export type DanjiTradeTurnrateSigunguResponse = {
  trade_turn_rate: number;
};

export type DanjiJeonsaerateResponse = {
  jeonsae_rate: number;
};

export type DanjiJeonsaerateSigunguResponse = {
  jeonsae_rate: number;
};

export type StatusListItem = {
  date: string;
  price: number;
  count: number;
};

export type StatusJeonsaeListItem = {
  date: string;
  jeonsae_rate: number;
};

export type DanjiStatsGraphResponse = {
  list_danji: StatusListItem[];
  list_sigungu: StatusListItem[];
  list_sido: StatusListItem[];
};

export type DanjiStatusGraphJeonsaeResponse = {
  list_danji: StatusJeonsaeListItem[];
  list_sigungu: StatusJeonsaeListItem[];
  list_sido: StatusJeonsaeListItem[];
};

export type DanjiSuggestRecommendEligibilityResponse = {
  is_eligible: boolean;
};

export type SchoolsListItem = {
  school_name: string;
  school_id: string;
  school_type: string;
  long: number;
  lat: number;
  distance_in_km: number;
};

export type DanjiMapSchoolsResponse = {
  list: SchoolsListItem[] | null;
} & ErrorResponse;
