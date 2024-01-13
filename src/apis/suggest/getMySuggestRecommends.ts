import useAuth from '@/hooks/services/useAuth';
import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export type MySuggestRecommendsListItem = {
  suggest_recommend_id: number;
  other_profile_image_url: string;
  other_name: string;
  created_time: string;
  suggest_recommend_status: number;
  with_address: true;
  address_free_text: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  jeonyong_areas: string;
  floor_description: string;
  floor: string;
  direction: string;
  buy_or_rent: number;
  note: string;
  chat_room_id?: number | null;
};

export type SuggestRecommendDetailListItem = {
  address_free_text: string;
  buy_or_rent: number;
  chat_room_id: number;
  created_time: string;
  direction: string;
  floor: string;
  jeonyong_areas: string;
  monthly_rent_fee: number;
  note: string;
  suggest_recommend_id: number;
  suggest_recommend_status: number;
  trade_or_deposit_price: number;
  with_address: boolean;
};

export type SuggestRecommendDetailList = {
  agent_has_suggest_complete_cancelled: boolean;
  agent_has_suggest_complete_completed: boolean;
  agent_office_address: string;
  agent_office_name: string;
  agent_office_phone: string;
  chat_room_id: number | null;
  chat_room_is_deleted: false;
  agent_suggest_complete_history_status: number;
  is_agent: boolean;
  recommender_deregistered: boolean;
  recommender_id: number;
  recommender_name: string;
  recommender_profile_image_url: string;
  suggest_recommend_ever_user_accepted: boolean;
  suggest_recommend_has_sent: boolean;
  suggest_recommend_detail_list: SuggestRecommendDetailListItem[];
};

export interface GetMySuggestRecommendsResponse {
  count: number;
  suggest_status: number;
  list: SuggestRecommendDetailList[] | null;
}

function getKey(suggestID: number | null, filter?: number) {
  return (size: number, previousPageData: GetMySuggestRecommendsResponse) => {
    if (previousPageData && !previousPageData?.list?.length) return null;

    if (previousPageData && (previousPageData.list?.length || 0) < 10) return null;

    return [`/my/suggest/recommends`, { page_number: size + 1, page_size: 10, suggest_id: suggestID, filter }];
  };
}

export default function useAPI_GetMySuggestRecommends(suggestID: number | null, filter?: number, mySuggest?: boolean) {
  const { user } = useAuth();
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<GetMySuggestRecommendsResponse>(
    user && mySuggest && (suggestID || filter) ? getKey(suggestID, filter) : () => null,
    null,
    { revalidateFirstPage: false, revalidateOnMount: true },
  );
  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item.list)
      .filter((item) => Boolean(item))
      .flat() as GetMySuggestRecommendsResponse['list'];
  }, [dataList]);

  const increamentPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    data,
    pageNumber: size,
    count: dataList?.[0]?.count ?? 0,
    isLoading,
    increamentPageNumber,
    mutate,
    suggestStatus: dataList?.[0]?.suggest_status ?? 0,
  };
}
