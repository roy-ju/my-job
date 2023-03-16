import { useAuth } from '@/hooks/services';
import useSWR from 'swr';

export interface GetChatRoomDetailResponse {
  chat_room_id: number;
  closed_time: any;
  listing_id: number;
  listing_status: number;
  listing_title: string;
  trade_id: string;
  full_road_name_address: string;
  negotiation_or_auction: number;
  buy_or_rent: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  bidding_trade_or_deposit_price: number;
  bidding_monthly_rent_fee: number;
  contract_bidding_trade_or_deposit_price: number;
  contract_bidding_monthly_rent_fee: number;
  negotiation_target: number;
  agent_profile_image_full_path: string;
  agent_office_name: string;
  agent_name: string;
  agent_description: string;
  oldest_unread_chat_id: any;
  chat_room_type: number;
  chat_user_type: number;
  visit_schedule_time: any;
  can_close: boolean;
  participating: boolean;
}

export default function useAPI_ChatRoomDetail(id: number) {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { data, isLoading } = useSWR<GetChatRoomDetailResponse>(
    user ? ['/chat/room/detail', { chat_room_id: id }] : null,
  );
  return { data, isLoading: isLoading || isLoadingUser };
}
