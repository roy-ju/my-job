import { useCallback, useMemo } from 'react';

import useSWRInfinite from 'swr/infinite';

import { QnaListResponse } from './types';

function getKey(listingID: number) {
  return (size: number, previousData: QnaListResponse | null) => {
    if (size > 0 && (previousData === null || !previousData.list?.length)) return null;
    return [
      '/qna/list',
      {
        page_number: size + 1,
        listing_id: listingID,
        page_size: 5,
      },
    ];
  };
}

export default function useFetchQnaList(listingID: number) {
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<QnaListResponse>(listingID === 0 ? () => null : getKey(listingID), null, {
    revalidateOnFocus: false,
  });

  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item?.list)
      .filter((item) => Boolean(item))
      .flat() as QnaListResponse['list'];
  }, [dataList]);

  const increamentPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    data,
    pageNumber: size,
    hasNext: Boolean(dataList?.[size - 1]?.has_next),
    isLoading,
    increamentPageNumber,
    size,
    setSize,
    mutate,
  };
}
