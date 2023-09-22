import useSWRInfinite from 'swr/infinite';
import { useAuth } from '@/hooks/services';
import { useMemo, useCallback } from 'react';

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
  chat_room_id: number | null;
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
  quick_sale?: boolean | null;
  negotiable: boolean;
  move_in_date: string | null;
  move_in_date_type: number | null;
  note: string;
  realestate_types: string;
  request_target_text: string;
}

interface Item {
  suggest_item: ISuggestItem;
  suggest_recommend_item: ISuggestRecommendItem;
}

export interface GetMySuggestRecommendedListResponse {
  list: Item[];
}

function getKey() {
  return (size: number, previousPageData: GetMySuggestRecommendedListResponse) => {
    const previousLength = previousPageData?.list?.length ?? 0;
    if (previousPageData && previousLength < 1) return null;
    return ['/my/suggest/recommended/list', { page_number: size + 1, page_size: 10 }];
  };
}

export default function useAPI_GetMySuggestRecommendedList() {
  const { user } = useAuth();
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<GetMySuggestRecommendedListResponse>(user ? getKey() : () => null);
  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item.list)
      .filter((item) => Boolean(item))
      .flat() as GetMySuggestRecommendedListResponse['list'];
  }, [dataList]);

  const increamentPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    data,
    pageNumber: size,
    isLoading,
    increamentPageNumber,
    mutate,
  };
}
