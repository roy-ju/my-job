import useSWR from 'swr';

export interface GetSuggestDetailResponse {
  user_nickname: string;
  user_profile_image_url: string;
  suggest_id: number;
  suggest_status: number;
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
  additional_conditions: string;
  updated_time: string;
  created_time: string;
  my_suggest: boolean;
  has_active_chat_room: boolean;
  view_count: number;
  interview_available_times: string;
}

export default function useAPI_GetSuggestDetail(suggestID: number | undefined | null) {
  const { data, isLoading, mutate } = useSWR<GetSuggestDetailResponse | null>(
    suggestID
      ? [
          '/suggest/detail',
          {
            suggest_id: suggestID,
          },
          null,
        ]
      : null,
  );
  return {
    data,
    isLoading,
    mutate,
  };
}
