import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

export interface IChatRoomDetailListingItem1 {
  listing_id: number;
  listing_status: number;
  realestate_type: number;
  buy_or_rent: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  listing_title: string;
  bidding_id: number;
}

export interface IChatRoomDetailListingItem2 {
  listing_id: number;
  listing_status: number;
  realestate_type: number;
  buy_or_rent: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  listing_title: string;
  bidding_id: number;
}

export interface IChatRoomDetailSuggestItem {
  suggest_id: number;
  danji_or_regional: number;
  request_target_text: string;
  realestate_types: string;
  buy_or_rents: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  pyoung_text: string;
  purpose: string;
  invest_amount: number;
  quick_sale: boolean;
  negotiable: boolean;
  move_in_date: string;
  move_in_date_type: number;
  note: string;
}

export interface IChatRoomDetailRecommendItem {
  suggest_id: number;
  suggest_recommend_id: number;
  danji_or_regional: number;
  request_target_text: string;
  realestate_types: string;
  buy_or_rents: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  pyoung_text: string;
  purpose: string;
  invest_amount: number;
  quick_sale: boolean;
  negotiable: boolean;
  move_in_date: string;
  move_in_date_type: number;
  note: string;
}

export interface ChatRoomAccordionsProps {
  listingItem1Count: number;
  listingItem1Arr?: IChatRoomDetailListingItem1[];
  listingItem2Count: number;
  listingItem2Arr?: IChatRoomDetailListingItem2[];
  suggestCount: number;
  suggestItemArr?: IChatRoomDetailSuggestItem[];
  recommendCount: number;
  recommendItemArr?: IChatRoomDetailRecommendItem[];
}

export interface GetChatRoomDetailResponse {
  chat_room_id: number;
  chat_room_type: number;
  chat_room_closed_time: string;

  other_profile_image_full_path: string;
  other_name: string;
  deregistered: boolean;

  oldest_unread_chat_id: any;
  chat_user_type: number;

  listing_item1_count: number;
  listing_item2_count: number;
  suggest_item_count: number;

  listing_item1?: IChatRoomDetailListingItem1[];
  listing_item2?: IChatRoomDetailListingItem2[];
  suggest_item?: IChatRoomDetailSuggestItem[];
  recommend_item?: IChatRoomDetailRecommendItem[];
  recommend_item_count: number;

  list?: {
    chat_room_id: number;
    chat_user_type: number;
    created_time: string;
    id: number;
    message: string;
    user1_read_time: string;
    user2_read_time: string;
    user_id: any;
  }[];
}

export default function useAPI_ChatRoomDetail(id: number) {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { data, isLoading, mutate } = useSWR<GetChatRoomDetailResponse>(
    user && id ? ['/chat/room/detail', { chat_room_id: id }] : null,
  );

  return { data, isLoading: isLoading || isLoadingUser, mutate };
}
