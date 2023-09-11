// import { useSWRInfinite } from 'swr/infinite';
// import { useAuth } from '@/hooks/services';

interface ISuggestRecommendItem {
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

interface ISuggestItem {
  user_nickname: string;
  user_profile_image_url: string;
  created_time: string;
  suggest_id: number;
  suggest_status: number;
  buy_or_rents: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  pyoung_text: string;
  purpose: string;
  invest_amount: number;
  quick_sale?: boolean;
  negotiable: boolean;
  move_in_date: string;
  move_in_date_type: number;
  note: string;
}

interface Item {
  suggest_item: ISuggestItem;
  suggest_recommend_item: ISuggestRecommendItem;
}

export interface GetMySuggestRecommendedListResponse {
  list: Item[] | null;
}
