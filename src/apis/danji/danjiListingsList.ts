import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export type DanjiListingsListItem = {
  listing_id: number;
  listing_title: string;
  buy_or_rent: number;
  is_participating: boolean;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  jeonyong_area: string;
  floor_description: string;
  total_floor: string;
  direction: string;
  quick_sale: boolean;
  view_count: number;
  participants_count: number;
};

export type GetDanjiListingsResponse = {
  list: DanjiListingsListItem[];
  total_count: number;
};

function getKey(
  pnu: string | null | undefined,
  realestateType: number | null | undefined,
  orderBy: number,
  pageSize: number,
  pageIndex: number,
  previousPageData: GetDanjiListingsResponse | null,
) {
  if (!pnu || !realestateType) return null;

  if (previousPageData && !previousPageData?.list?.length) return null;

  if (previousPageData && (previousPageData.list?.length || 0) < pageSize) return null;

  return [
    '/danji/listings/list/v2',
    {
      pnu,
      realestate_type: realestateType,
      order_by: orderBy,
      page_size: pageSize,
      page_number: pageIndex + 1,
    },
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  ];
}

export function useAPI_GetDanjiListingsList({
  pnu,
  realestateType,
  orderBy,
  pageSize,
}: {
  pnu: string | null | undefined;
  realestateType: number | null | undefined;
  orderBy: number;
  pageSize: number;
}) {
  const {
    data: dataList,

    isLoading,
    size,
    setSize,
    mutate,
  } = useSWRInfinite<GetDanjiListingsResponse>(
    (pageIndex, previousPageData) => getKey(pnu, realestateType, orderBy, pageSize, pageIndex, previousPageData),
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
