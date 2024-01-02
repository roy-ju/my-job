import useSWR from 'swr';

import { BuyOrRent } from '@/constants/enums';

import { DanjiTradeTurnrateResponse } from './types';

export function useFetchDanjiTradeTurnrate({
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
  return useSWR<DanjiTradeTurnrateResponse>(
    buyOrRent === BuyOrRent.Buy && danjiId && realestateType && year
      ? [
          '/danji/stats/tradeturnrate',
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
