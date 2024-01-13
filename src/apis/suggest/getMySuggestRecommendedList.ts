import useSWRInfinite from 'swr/infinite';
import useAuth from '@/hooks/services/useAuth';
import { useMemo, useCallback } from 'react';

interface Item {
  suggestor_nickname: string;
  suggestor_profile_image_url: string;
  latest_recommended_time: string;
  deregistered: boolean;
  suggest_recommend_ever_user_accepted: boolean;
  realestate_types: string;
  suggest_id: number;
  suggest_recommend_count: number;
  danji_or_regional: number;
  suggest_status: number;
  buy_or_rents: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  pyoung_text: string;
  purpose: string;
  invest_amount: number;
  quick_sale: any;
  negotiable: boolean;
  move_in_date: any;
  move_in_date_type: any;
  note: string;
  request_target_text: string;
  suggestor_id: number;
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
