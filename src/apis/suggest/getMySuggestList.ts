import useAuth from '@/hooks/services/useAuth';
import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export interface GetMySuggestListResponse {
  list:
    | {
        suggest_id: number;
        realestate_types: string;
        title: string;
        status: number;
        suggest_recommended_count: number;
        created_time: string;
        danji_or_regional: number;
        buy_or_rents: string;
        trade_or_deposit_price: number;
        monthly_rent_fee: number;
        pyoung_text: string;
        negotiable: boolean;
        quick_sale: boolean;
        has_new: boolean;
      }[]
    | null;
}

function getKey(size: number, previousPageData: GetMySuggestListResponse) {
  const previousLength = previousPageData?.list?.length ?? 0;
  if (previousPageData && previousLength < 1) return null;
  return [`/my/suggest/list`, { page_number: size + 1, page_size: 10 }];
}

export default function useAPI_GetMySuggestList() {
  const { user } = useAuth();

  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<GetMySuggestListResponse>(user ? getKey : () => null);

  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item.list)
      .filter((item) => Boolean(item))
      .flat() as GetMySuggestListResponse['list'];
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
