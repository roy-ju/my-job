import useSWRInfinite from 'swr/infinite';

import { DanjiListingListResponse } from './types';

function getKey(
  danjiID: number | null | undefined,
  realestateType: number | null | undefined,
  orderBy: number,
  pageSize: number,
  pageIndex: number,
  previousPageData: DanjiListingListResponse | null,
) {
  if (!danjiID || !realestateType) return null;

  if (previousPageData && !previousPageData?.list?.length) return null;

  if (previousPageData && (previousPageData.list?.length || 0) < pageSize) return null;

  return [
    '/danji/listings/list',
    {
      danji_id: danjiID,
      realestate_type: realestateType,
      order_by: orderBy,
      page_size: pageSize,
      page_number: pageIndex + 1,
    },
  ];
}

export function useFetchDanjiListingsList({
  danjiID,
  realestateType,
  orderBy,
  pageSize,
  prefetchedData,
}: {
  danjiID: number | null | undefined;
  realestateType: number | null | undefined;
  orderBy: number;
  pageSize: number;
  prefetchedData?: DanjiListingListResponse;
}) {
  return useSWRInfinite<DanjiListingListResponse>(
    (pageIndex, previousPageData) => getKey(danjiID, realestateType, orderBy, pageSize, pageIndex, previousPageData),
    null,
    {
      revalidateFirstPage: false,
      revalidateOnMount: true,
      onSuccess: () => {},
      ...(prefetchedData ? { fallbackData: [prefetchedData] } : {}),
    },
  );
}
