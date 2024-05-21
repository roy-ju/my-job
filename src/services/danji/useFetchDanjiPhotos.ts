import useSWR from 'swr';

import { DanjiPhotosResponse } from './types';

export function useFetchDanjiPhotos({
  prefetchedData,
  danjiId,
  realestateType,
}: {
  prefetchedData?: { [key: string]: any } | null;
  danjiId?: number | null;
  realestateType?: number | null;
}) {
  const { data, error, mutate } = useSWR<DanjiPhotosResponse>(
    danjiId && realestateType
      ? [
          '/danji/photos',
          {
            danji_id: danjiId,
            realestate_type: Number(realestateType),
          },
        ]
      : null,
    null,
    {
      ...(prefetchedData ? { fallbackData: prefetchedData as DanjiPhotosResponse } : {}),
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  return {
    danjiPhotos: data,
    isLoading: danjiId && realestateType ? !data && !error : false,
    error,
    mutate,
  };
}
