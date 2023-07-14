import useSWR from 'swr';
import { BuyOrRent } from '@/constants/enums';

export type DanjiRealPriceChartResponse = {
  list:
    | {
        date: string;
        count: number;
        prices: string;
        avg_price: number;
      }[]
    | null;
} & ErrorResponse;

export function useAPI_DanjiRealPriceChart({
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
  list:
    | [
        {
          min_jeonyong: number;
          max_jeonyong: number;
          avg_jeonyong: number;
          gonggeup_pyoung: number;
          saedae_count: number;
        },
      ]
    | []
    | null;
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
