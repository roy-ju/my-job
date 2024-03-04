import useSWRInfinite from 'swr/infinite';

import { DanjiSuggestListResponse } from './types';

function getKey(
  danjiID: number | null | undefined,
  pageSize: number,
  pageIndex: number,
  previousPageData: DanjiSuggestListResponse | null,
) {
  if (!danjiID) return null;

  if (previousPageData && !previousPageData?.list?.length) return null;

  if (previousPageData && (previousPageData.list?.length || 0) < pageSize) return null;

  return [
    '/danji/suggest/list',
    {
      danji_id: danjiID,
      page_size: pageSize,
      page_number: pageIndex + 1,
    },
    null,
  ];
}

export function useFetchDanjiSuggestsList({
  danjiID,
  pageSize,
  prefetchedData,
}: {
  danjiID: number | null | undefined;
  pageSize: number;
  prefetchedData?: DanjiSuggestListResponse;
}) {
  return useSWRInfinite<DanjiSuggestListResponse>(
    (pageIndex, previousPageData) => getKey(danjiID, pageSize, pageIndex, previousPageData),
    null,
    {
      revalidateFirstPage: true,
      revalidateOnMount: true,
      onSuccess: () => {},
      ...(prefetchedData ? { fallbackData: [prefetchedData] } : {}),
    },
  );
}
