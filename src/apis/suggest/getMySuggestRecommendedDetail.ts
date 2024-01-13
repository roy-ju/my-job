import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

import authFetcher from '@/lib/swr/authFetcher';

interface SuggestRecommend {
  suggest_recommend_id: number;
  created_time: string;
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

export interface GetMySuggestRecommendedDetailResponse {
  created_time: string;
  suggestor_id: number;
  suggestor_nickname: string;
  suggestor_profile_image_url: string;
  deregistered: boolean;
  suggest_recommend_ever_user_accepted: boolean;
  chat_room_id: any;
  chat_room_is_deleted: boolean;
  realestate_types: string;
  suggest_id: number;
  danji_or_regional: number;
  suggest_status: number;
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
  request_target_text: string;
  suggest_recommends: SuggestRecommend[];
  danji_id: number;
}

export default function useAPI_GetMySuggestRecommendedDetail(suggestID: number) {
  const { user } = useAuth();
  const { data, isLoading, mutate } = useSWR<GetMySuggestRecommendedDetailResponse>(
    user ? ['/my/suggest/recommended/detail', { suggest_id: suggestID }] : null,
    authFetcher,
  );
  return {
    data,
    isLoading,
    mutate,
  };
}
