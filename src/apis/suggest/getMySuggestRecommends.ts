import { useAuth } from '@/hooks/services';
import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export interface GetMySuggestRecommendsResponse {
  count: number;
  list:
    | {
        agent_profile_image_url: string;
        agent_name: string;
        created_time: string;
        suggest_recommend_status: number;
        realestate_type: number;
        eubmyundong: string;
        listing_id: number;
        suggest_recommend_id: number;
        thumbnail_full_path: any;
        quick_sale: boolean;
        listing_title: string;
        jeonyong_area: string;
        floor_description: string;
        total_floor: string;
        direction: string;
        buy_or_rent: number;
        note: string;
        trade_or_deposit_price: number;
        monthly_rent_fee: number;
        buyer_agent_chat_room_id?: number | null;
        suggest_recommend_accepted_time: string;
      }[]
    | null;
}

function getKey(suggestID: number | null, filter?: number) {
  return (size: number, previousPageData: GetMySuggestRecommendsResponse) => {
    const previousLength = previousPageData?.list?.length ?? 0;
    if (previousPageData && previousLength < 1) return null;
    return [`/my/suggest/recommends`, { page_number: size + 1, page_size: 10, suggest_id: suggestID, filter }];
  };
}

export default function useAPI_GetMySuggestRecommends(suggestID: number | null, filter?: number) {
  const { user } = useAuth();
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<GetMySuggestRecommendsResponse>(
    user && (suggestID || filter) ? getKey(suggestID, filter) : () => null,
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
  };
}
