import useSWR from 'swr';

import { DanjiPhotosResponse } from './types';

export function useFetchDanjiPhotos({ id, realestateType }: { id?: number; realestateType?: number }) {
  const { data, isLoading, error, mutate } = useSWR<DanjiPhotosResponse>(
    id && realestateType
      ? [
          '/danji/photos',
          {
            danji_id: id,
            realestate_type: realestateType,
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnMount: true },
  );

  return {
    photos: data,
    isLoading: id && realestateType ? isLoading : false,
    error,
    mutate,
  };
}
