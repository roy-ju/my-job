import useSWR from 'swr';

import { DanjiStatsGraphResponse } from './types';

export function useFetchDanjiStatusGraph({
  danjiId,
  realestateType,
  year,
  buyOrRent,
}: {
  danjiId?: number | null;
  realestateType?: number | null;
  year?: number;
  buyOrRent?: number;
}) {
  const { data, isLoading, error } = useSWR<DanjiStatsGraphResponse>(
    danjiId && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/pricerpersqmeter',
          {
            danji_id: danjiId,
            realestate_type: Number(realestateType),
            buy_or_rent: buyOrRent,
            year,
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    listDanji: data?.list_danji,
    listSigungu: data?.list_sigungu,
    listSido: data?.list_sido,
    isLoading,
    error,
  };
}
