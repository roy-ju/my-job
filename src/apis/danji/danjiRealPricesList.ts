import useSWRInfinite from 'swr/infinite';

import { BuyOrRent } from '@/constants/enums';

export type DanjiRealPricesListItem = {
  year: string;
  month: string;
  day: string;
  buy_or_rent: number;
  price: number;
  monthly_rent_fee: number;
  floor: string;
  trade_type: string;
  cancel_deal_day: string;
};

export type DanjiRealPricesListResponse = {
  list: DanjiRealPricesListItem[];
  page_number: number;
  page_size: number;
};

function getKey(
  danjiId: number | null | undefined,
  pageIndex: number,
  realestateType: number | null,
  previousPageData: DanjiRealPricesListResponse | null,
  buyOrRent: number | undefined,
  year: number,
  directDealExcluded: boolean,
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
    | null,
  ps: number,
  selectedIndex?: number,
) {
  const pageSize = ps;

  if (
    !danjiId ||
    !realestateType ||
    !buyOrRent ||
    !list ||
    (list && list.length === 0) ||
    typeof selectedIndex !== 'number'
  )
    return null;

  if (previousPageData && !previousPageData?.list?.length) return null;

  if (previousPageData && (previousPageData.list?.length || 0) < pageSize) return null;

  return [
    '/danji/realprices/list',
    {
      danji_id: danjiId,
      realestate_type: realestateType,
      buy_or_rent: buyOrRent,
      year,
      direct_deal_excluded: buyOrRent === BuyOrRent.Buy ? directDealExcluded : false,
      selected_index: selectedIndex,
      list,
      page_size: pageSize,
      page_number: pageIndex + 1,
    },
  ];
}

export function useAPI_DanjiRealPricesList({
  danjiId,
  realestateType,
  buyOrRent,
  year,
  directDealExcluded,
  list,
  ps,
  selectedIndex,
}: {
  danjiId?: number | null;
  realestateType: number | null;
  buyOrRent?: number;
  year: number;
  directDealExcluded: boolean;
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
  ps: number;
  selectedIndex?: number;
}) {
  const { data, error, size, setSize, mutate } = useSWRInfinite<DanjiRealPricesListResponse>(
    (pageIndex, previousPageData) =>
      getKey(
        danjiId,
        pageIndex,
        realestateType,
        previousPageData,
        buyOrRent,
        year,
        directDealExcluded,
        list,
        ps,
        selectedIndex,
      ),
    null,
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      onSuccess: () => {},
    },
  );

  return {
    data,
    isLoading: !data && !error,
    list: data
      ? ([] as NonNullable<DanjiRealPricesListResponse['list']>).concat(...data.map((item) => item.list || []))
      : [],
    error,
    size,
    setSize,
    mutate,
  };
}
