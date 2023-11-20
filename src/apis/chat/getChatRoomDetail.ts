import { useAuth } from '@/hooks/services';
import useSWR from 'swr';

export interface IChatRoomDetailListingItem {
  listing_id: number;
  listing_status: number;
  buy_or_rent: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  listing_title: string;
  jeonyong_area: string;
  floor_description: string;
  total_floor: string;
  direction: string;
}
export interface IChatRoomDetailBiddingItem {
  bidding_id: number;
  bidding_status: number;
  bidding_trade_or_deposit_price: number;
  bidding_monthly_rent_fee: number;
}
export interface IChatRoomDetailSuggestItem {
  suggest_id: number;
  suggest_status: number;
  buy_or_rents: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  pyoung_text: string;
  purpose: string;
  invest_amount: number;
  quick_sale: boolean | null;
  negotiable: boolean;
  move_in_date: string;
  move_in_date_type: number;
  note: string;
  user_completed: boolean;
  agent_completed: boolean;
}
export interface IChatRoomDetailSuggestRecommendItem {
  suggest_recommend_id: number;
  suggest_recommend_status: number;
  with_address: boolean;
  address_free_text: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  jeonyong_areas: string;
  floor: string;
  direction: string;
  buy_or_rent: number;
  note: string;
}
export interface GetChatRoomDetailResponse {
  chat_room_id: number;
  chat_room_type: number;
  title: string;
  other_profile_image_full_path: string;
  other_name: string;
  oldest_unread_chat_id: any;
  chat_user_type: number;

  listing_item?: IChatRoomDetailListingItem;

  bidding_item?: IChatRoomDetailBiddingItem;

  suggest_item?: IChatRoomDetailSuggestItem;

  suggest_recommend_item?: IChatRoomDetailSuggestRecommendItem;

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
    user ? ['/chat/room/detail', { chat_room_id: id }] : null,
  );

  return { data, isLoading: isLoading || isLoadingUser, mutate };
}
