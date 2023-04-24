import { useAuth } from '@/hooks/services';
import { authFetcher } from '@/lib/swr';
import useSWR from 'swr';

export interface GetMySuggestDetailResponse {
  suggest_danji_summary: {
    name: string;
    road_name_address: string;
    saedae_count: string;
    use_accepted_year: string;
    jeonyong_min: string;
    jeonyong_max: string;
  } | null;
  suggest_id: number;
  request_number: string;
  danji_or_regional: number;
  request_target_text: string;
  realestate_types: string;
  buy_or_rents: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  pyoung_text: string;
  purpose: string;
  remaining_amount_payment_time: string;
  remaining_amount_payment_time_type: number;
  move_in_date: string;
  move_in_date_type: number;
  floors: string;
  note: string;
  updated_time: string;
  created_time: string;
}

export default function useAPI_GetMySuggestDetail(suggestID: number) {
  const { user } = useAuth();
  const { data, isLoading } = useSWR<GetMySuggestDetailResponse | null>(
    user && suggestID
      ? [
          '/my/suggest/detail',
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
