import useSWR from 'swr';

interface List {
  description: string;
  created_time: string;
  bidding_trade_or_deposit_price: number;
  bidding_monthly_rent_fee: number;
}

export interface GetMyParticipatedListingDetailResponse {
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
  list: List[];
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

export default function useAPI_GetMyParticipatedListingDetail(listingId: number, biddingId: number) {
  const { data, isLoading, mutate } = useSWR<GetMyParticipatedListingDetailResponse>(
    listingId && biddingId
      ? [`/my/listings/participated/detail`, { listing_id: listingId, bidding_id: biddingId }]
      : null,
  );

  return { data, isLoading, mutate };
}
