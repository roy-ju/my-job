import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export type DanjiSuggestListItem = {
  my_suggest: boolean;
  iam_recommending: boolean;
  suggest_id: number;
  suggest_status: number;
  user_nickname: string;
  user_profile_image_url: string;
  danji_id: number;
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
  move_in_date: null | string;
  move_in_date_type: null | number;
  note: string;
  additional_conditions: string;
  updated_time: string;
  created_time: string;
  view_count: number;
};

export type GetDanjiSuggestListResponse = {
  list: DanjiSuggestListItem[];
  total_count: number;
};

function getKey(
  danjiId: number | null | undefined,
  pageSize: number,
  pageIndex: number,
  previousPageData: GetDanjiSuggestListResponse | null,
) {
  if (!danjiId) return null;

  if (previousPageData && !previousPageData?.list?.length) return null;

  if (previousPageData && (previousPageData.list?.length || 0) < pageSize) return null;

  return [
    '/danji/suggest/list',
    {
      danji_id: danjiId,
      page_size: pageSize,
      page_number: pageIndex + 1,
    },
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  ];
}

export function useAPI_GetDanjiSuggestList({
  danjiId,
  pageSize,
}: {
  danjiId: number | null | undefined;
  pageSize: number;
}) {
  const {
    data: dataList,
    isLoading,
    size,
    setSize,
    mutate,
  } = useSWRInfinite<GetDanjiSuggestListResponse>(
    (pageIndex, previousPageData) => getKey(danjiId, pageSize, pageIndex, previousPageData),
    null,
    {
      revalidateFirstPage: false,
      revalidateOnMount: true,
      onSuccess: () => {},
    },
  );

  const increamentPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item?.list)
      .filter((item) => Boolean(item))
      .flat();
  }, [dataList]);

  return {
    isLoading,
    data,
    totalCount: dataList ? (dataList[0] ? dataList[0].total_count : 0) : 0,
    size,
    increamentPageNumber,
    setSize,
    mutate,
  };
}
