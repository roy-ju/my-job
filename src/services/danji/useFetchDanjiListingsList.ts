import { useCallback, useMemo } from 'react';

import useSWRInfinite from 'swr/infinite';

import { DanjiListingsListResponse } from './types';

function getKey(
  danjiId: number | null | undefined,
  realestateType: number | null | undefined,
  orderBy: number,
  pageSize: number,
  pageIndex: number,
  previousPageData: DanjiListingsListResponse | null,
) {
  if (!danjiId || !realestateType) return null;

  if (previousPageData && !previousPageData?.list?.length) return null;

  if (previousPageData && (previousPageData.list?.length || 0) < pageSize) return null;

  return [
    '/danji/listings/list',
    {
      danji_id: danjiId,
      realestate_type: realestateType,
      order_by: orderBy,
      page_size: pageSize,
      page_number: pageIndex + 1,
    },
  ];
}

export function useFetchDanjiListingsList({
  danjiId,
  realestateType,
  orderBy,
  pageSize,
}: {
  danjiId: number | null | undefined;
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
  } = useSWRInfinite<DanjiListingsListResponse>(
    (pageIndex, previousPageData) => getKey(danjiId, realestateType, orderBy, pageSize, pageIndex, previousPageData),
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
