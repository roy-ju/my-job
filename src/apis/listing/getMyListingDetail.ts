import useAuth from '@/hooks/services/useAuth';
import useSWR from 'swr';

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

export interface GetMyListingDetailResponse {
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

export default function useAPI_MyListingDetail(listingID: number) {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { data, isLoading, mutate } = useSWR<GetMyListingDetailResponse & ErrorResponse>(
    user && listingID ? ['/my/listing/detail', { listing_id: listingID }] : null,
  );
  return { data, isLoading: isLoading || isLoadingUser, mutate };
}
