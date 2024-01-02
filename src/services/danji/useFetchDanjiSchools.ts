import useSWR from 'swr';

import { DanjiSchoolsResponse } from './types';

export function useFetchDanjiSchools({
  prefetchedData,
  danjiId,
  realestateType,
}: {
  prefetchedData?: DanjiSchoolsResponse;
  danjiId?: number | null;
  realestateType?: number | null;
}) {
  return useSWR<DanjiSchoolsResponse>(
    danjiId && realestateType
      ? [
          '/danji/schools',
          {
            danji_id: danjiId,
            realestate_type: Number(realestateType),
          },
        ]
      : null,
    null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      ...(prefetchedData ? { fallbackData: prefetchedData } : {}),
    },
  );
}
