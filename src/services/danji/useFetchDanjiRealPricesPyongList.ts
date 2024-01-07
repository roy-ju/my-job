import useSWR from 'swr';

import { DanjiRealPricesPyoungListResponse } from './types';

export function useFetchDanjiRealPricesPyongList({
  danjiId,
  realestateType,
  buyOrRent,
}: {
  danjiId?: number;
  realestateType?: number;
  buyOrRent?: number | null;
}) {
  return useSWR<DanjiRealPricesPyoungListResponse>(
    danjiId && realestateType && typeof buyOrRent !== 'undefined'
      ? [
          '/danji/realprices/pyoung/list',
          {
            danji_id: danjiId,
            realestate_type: Number(realestateType),
            buy_or_rent: buyOrRent,
          },
        ]
      : null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );
}
