import useSWR from 'swr';

import { DanjiMapSchoolsResponse } from './types';

export function useFetchDanjiMapSchools({
  danjiId,
  realestateType,
  schoolTypes,
}: {
  danjiId?: number | null;
  realestateType?: number | null;
  schoolTypes?: string | null;
}) {
  const { data, error, mutate } = useSWR<DanjiMapSchoolsResponse>(
    danjiId && realestateType && schoolTypes
      ? [
          '/danji/map/schools',
          {
            danji_id: danjiId,
            realestate_type: Number(realestateType),
            school_types: schoolTypes,
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    data,
    isLoading: !data && !error,
    list: data?.list || [],
    error,
    mutate,
  };
}
