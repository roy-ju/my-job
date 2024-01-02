import useSWR from 'swr';

import { BuyOrRent } from '@/constants/enums';

import { DanjiRealPriceChartResponse, PyoungListItem } from './types';

export function useFetchDanjiRealPriceChart({
  directDealExcluded,
  danjiId,
  realestateType,
  buyOrRent,
  year,
  selectedIndex,
  list,
}: {
  directDealExcluded: boolean;
  danjiId?: number;
  realestateType?: number | null;
  buyOrRent?: number;
  year?: number;
  selectedIndex?: number;
  list: PyoungListItem[] | null;
}) {
  const { data, error } = useSWR<DanjiRealPriceChartResponse>(
    danjiId &&
      realestateType &&
      buyOrRent &&
      year &&
      typeof selectedIndex === 'number' &&
      typeof directDealExcluded === 'boolean' &&
      selectedIndex >= 0 &&
      list &&
      list.length > 0
      ? [
          '/danji/realprices/chart',
          {
            danji_id: danjiId,
            realestate_type: Number(realestateType),
            buy_or_rent: buyOrRent,
            year,
            direct_deal_excluded: buyOrRent === BuyOrRent.Buy ? directDealExcluded : false,
            selected_index: selectedIndex,
            list,
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}
