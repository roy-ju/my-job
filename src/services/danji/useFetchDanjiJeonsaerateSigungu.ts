import useSWR from 'swr';

import { BuyOrRent } from '@/constants/enums';

import { DanjiJeonsaerateSigunguResponse } from './types';

export function useFetchDanjiJeonsaerateSigungu({
  buyOrRent,
  danjiId,
  realestateType,
  year,
}: {
  buyOrRent?: number;
  danjiId?: number | null;
  realestateType?: number | null;
  year?: number;
}) {
  return useSWR<DanjiJeonsaerateSigunguResponse>(
    buyOrRent === BuyOrRent.Jeonsae && danjiId && realestateType && year
      ? [
          '/danji/stats/jeonsaerate/sigungu',
          {
            danji_id: danjiId,
            realestate_type: Number(realestateType),
            year,
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );
}
