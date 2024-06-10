/* eslint-disable no-nested-ternary */
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import { prefixComparison } from '../../utils/prefix';

type ListItem = {
  name: string;
  danji_id: number;
  realestate_type: number;
  saedae_count: number;
  year: number;
  month: number;
  day: number;
  price: number;
  distance: number;
};

export type DanjiListbySigunguResponse = {
  list: ListItem[];
} & ErrorResponse;

function getKey(
  danjiId: number | null | undefined,
  sigunguCode: string | null | undefined,
  realestateType: number | null | undefined,
  realestateType2: number | null | undefined,
  filter: string | undefined,
  pageIndex: number,
  previousPageData: DanjiListbySigunguResponse | null,
) {
  const pageSize = 10;

  if (!danjiId || !sigunguCode || !realestateType || !realestateType2) return null;

  if (previousPageData && !previousPageData.list?.length) {
    return null;
  }

  if (previousPageData && (previousPageData.list?.length || 0) < pageSize) return null;

  return [
    '/danji/list/bysigungu',
    {
      page_number: pageIndex + 1,
      page_size: pageSize,
      danji_id: danjiId,
      sigungu_code: sigunguCode,
      realestate_type: realestateType,
      realestate_type2: realestateType2,
      filter,
    },
  ];
}

export function useAPI_DanjiListbySigungu({
  danjiId,
  sigunguCode,
  realestateType,
  realestateType2,
  filter,
}: {
  danjiId?: number | null;
  sigunguCode?: string | null;
  realestateType?: number | null;
  realestateType2?: number | null;
  filter?: string;
}) {
  const { data, error, size, setSize, mutate } = useSWRInfinite<DanjiListbySigunguResponse>(
    (pageIndex, previousPageData) =>
      getKey(danjiId, sigunguCode, realestateType, realestateType2, filter, pageIndex, previousPageData),
    null,
    {
      revalidateFirstPage: false,
      revalidateOnMount: true,
      onSuccess: () => {},
    },
  );

  return {
    data,
    isLoading: !sigunguCode ? false : !data && !error,
    list: data
      ? ([] as NonNullable<DanjiListbySigunguResponse['list']>).concat(...data.map((item) => item.list || []))
      : [],
    error,
    size,
    setSize,
    mutate,
  };
}

export function useFetchDanjiListBySigungu({
  isNotFetch = false,
  danjiId,
  sigunguCode,
  realestateType,
  realestateType2,
}: {
  isNotFetch?: boolean;
  danjiId?: number | null;
  sigunguCode?: string | null;
  realestateType?: number | null;
  realestateType2?: number | null;
}) {
  const { data, error, mutate } = useSWR<DanjiListbySigunguResponse>(
    isNotFetch
      ? null
      : localStorage.getItem(prefixComparison)
      ? null
      : danjiId && sigunguCode && realestateType && realestateType2
      ? [
          '/danji/list/bysigungu',
          {
            page_number: 1,
            page_size: 5,
            danji_id: danjiId,
            sigungu_code: sigunguCode,
            realestate_type: realestateType,
            realestate_type2: realestateType2,
            filter: '',
          },
        ]
      : null,
    null,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  return {
    data,
    list: data?.list
      ? data.list.map((item) => ({ name: item.name, danjiID: item.danji_id, rt: item.realestate_type }))
      : [],
    isLoading: !sigunguCode ? false : !data && !error,
    error,
    mutate,
  };
}
