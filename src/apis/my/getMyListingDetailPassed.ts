import useSWR from 'swr';

export interface GetMyListingDetailPassedResponse {
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
  contract_completion_date: string;
  contract_trade_or_deposit_price: number;
  contract_monthly_rent_fee: number;
  status_text: string;
  has_review: boolean;
  listing_contract_id: number;
}

export default function useAPI_GetMyListingDetailPassed(listingId: number) {
  const { data, isLoading, mutate } = useSWR<GetMyListingDetailPassedResponse>(
    listingId ? [`/my/listing/past/detail`, { listing_id: listingId }] : null,
  );

  return { data, isLoading, mutate };
}
