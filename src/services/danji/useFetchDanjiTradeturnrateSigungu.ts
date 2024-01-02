import useSWR from 'swr';

import { BuyOrRent } from '@/constants/enums';

import { DanjiTradeTurnrateSigunguResponse } from './types';

export function useFetchDanjiTradeTurnrateSigungu({
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
  return useSWR<DanjiTradeTurnrateSigunguResponse>(
    buyOrRent === BuyOrRent.Buy && danjiId && realestateType && year
      ? [
          '/danji/stats/tradeturnrate/sigungu',
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
