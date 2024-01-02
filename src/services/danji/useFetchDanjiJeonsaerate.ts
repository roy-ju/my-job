import useSWR from 'swr';

import { BuyOrRent } from '@/constants/enums';

import { DanjiJeonsaerateResponse } from './types';

export function useFetchDanjiJeonsaerate({
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
  return useSWR<DanjiJeonsaerateResponse>(
    buyOrRent === BuyOrRent.Jeonsae && danjiId && realestateType && year
      ? [
          '/danji/stats/jeonsaerate',
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
