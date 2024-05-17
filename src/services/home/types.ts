export type InterviewScheduleInfoItem = {
  address: string;
  interview_available_times: string;
  is_quick_interview: boolean;
  interview_schedule_count: number;
};

export type HomeSuggestInfoResponse = {
  /** 전체 구해요 요청 건수 */
  suggest_sent_count: number;
  /** 추천 대기 중 */
  suggest_waiting_recommended_count: number;
  /** 추천 대기 중 */
  suggest_new_recommended_count: number;
  /** 총 추천 수 */
  suggest_total_recommended_count: number;
  /** 인터뷰 관련 */
  interview_schedule_info: InterviewScheduleInfoItem | null;
};

export interface HomeListingsMostFavoritesResponse {
  list:
    | [
        {
          buy_or_rent: number;
          direction: string;
          eubmyundong: string;
          favorite_count: number;
          floor_description: string;
          is_favorite: boolean;
          jeonyong_area: string;
          listing_id: number;
          listing_title: string;
          monthly_rent_fee: number;
          quick_sale?: boolean;
          realestate_type: number;
          thumbnail_full_path?: string;
          total_floor: string;
          trade_or_deposit_price: number;
        },
      ]
    | null;
}

export interface HomeDanjisMostSuggestsResponse {
  list:
    | [
        {
          total_suggest_count: number;
          danji_id: number;
          realestate_type: number;
          eubmyundong: string;
          name: string;
          saedae_count: string;
          jeonyong_min: string;
          jeonyong_max: string;
          date: string;
          dong_count: string;
        },
      ]
    | null;
}

export interface HomeDanjisMostTradeCountResponse {
  region_name: string;
  list:
    | [
        {
          danji_id: number;
          realestate_type: number;
          eubmyundong: string;
          name: string;
          saedae_count: string;
          jeonyong_min: string;
          jeonyong_max: string;
          date: string;
          dong_count: string;
          trade_count: number;
          rent_count: number;
        },
      ]
    | null;
}

export interface HomeListingsLoggedInResponse {
  list:
    | [
        {
          listing_id: number;
          thumbnail_full_path?: string;
          listing_title: string;
          realestate_type: number;
          jeonyong_area: string;
          floor_description: string;
          total_floor: string;
          direction: string;
          buy_or_rent: number;
          quick_sale?: boolean;
          trade_or_deposit_price: number;
          monthly_rent_fee: number;
          eubmyundong: string;
          is_favorite: boolean;
          favorite_count: number;
        },
      ]
    | null;
}

export interface HomeDashboardInfoResponse {
  suggest_assigned_agent_count: number;
  active_listing_count: number;
}

export interface HomeDanjisLoggedInResponse {
  has_favorite_danji: boolean;
  has_address: boolean;
  list:
    | [
        {
          danji_id: number;
          realestate_type: number;
          eubmyundong: string;
          name: string;
          is_direct_deal: boolean;
          buy_or_rent: number;
          trade_or_deposit_price: number;
          monthly_rent_fee: number;
          deal_date: string;
        },
      ]
    | null;
}
