import useSWR from 'swr';

interface Listing {
  id: number;
  user_id: number | null;
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
  pnu: string;
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
  realestate_type: number;
  officetel_type: any;
  buy_or_rent: number;
  quick_sale: any;
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
  rent_end_date: string | null;
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
  agent_completion_expire_time: any;
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
}

interface DebtSuccession {
  id: number;
  listing_id: number;
  name: string;
  amount: number;
  created_time: string;
}

interface BiddingsChatRoomNotCreated {
  bidding_id: number;
  is_my_bidding: boolean;
  nickname: string;
  bidding_status: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  created_time: any;
}

export interface GetListingDetailResponse {
  listing: Listing | null;
  is_owner: boolean;
  chat_room_id: number;
  bidding_id: any;
  bidding_status: any;
  visit_user_type: number;
  display_address: string;
  quick_sale_comparative: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  agent_summary: AgentSummary;
  participator_count: number;
  is_favorite: boolean;
  total_parking_count: string;
  parking_per_saedae: string;
  active_status_time: string;
  photos:
    | {
        id: number;
        listing_id: number;
        pnu: any;
        token: any;
        document_type: number;
        full_file_path: string;
        thumb_file_path: string;
        created_time: string;
      }[]
    | null;
  danji_photos:
    | {
        id: number;
        listing_id: number;
        pnu: any;
        token: any;
        document_type: number;
        full_file_path: string;
        thumb_file_path: string;
        created_time: string;
      }[]
    | null;
  debt_successions: DebtSuccession[];
  collaterals: any[];
  tags: {
    id: number;
    name: string;
    created_time: string;
  }[];
  options: any[];
  biddings_chat_room_created: BiddingsChatRoomNotCreated[] | null;
  biddings_chat_room_not_created: BiddingsChatRoomNotCreated[] | null;
  suggest_recommend_id: number | null;
  bidding_reject_reason?: string | null;
  highest_bidding_trade_or_deposit_price?: number;
  highest_bidding_monthly_rent_fee?: number;
}

export default function useAPI_GetListingDetail(id: number) {
  const { data, isLoading, mutate } = useSWR<GetListingDetailResponse & ErrorResponse>(
    id !== 0 ? ['/listing/detail', { listing_id: id }] : null,
  );

  return { data, isLoading, mutate };
}
