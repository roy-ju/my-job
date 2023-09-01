import { useAuth } from '@/hooks/services';
import { authFetcher } from '@/lib/swr';
import useSWR from 'swr';

export interface GetSuggestDetailResponse {
  user_nickname: string;
  user_profile_image_url: string;
  suggest_id: number;
  danji_id: number | null;
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
  move_in_date: string;
  move_in_date_type: number;
  note: string;
  updated_time: string;
  created_time: string;
}

export default function useAPI_GetSuggestDetail(suggestID: number | undefined | null) {
  const { user } = useAuth();
  const { data, isLoading } = useSWR<GetSuggestDetailResponse | null>(
    user && suggestID
      ? [
          '/suggest/detail',
          {
            suggest_id: suggestID,
          },
        ]
      : null,
    authFetcher,
  );
  return {
    data,
    isLoading,
  };
}
