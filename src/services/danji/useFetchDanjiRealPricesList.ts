import useSWRInfinite from 'swr/infinite';

import { BuyOrRent } from '@/constants/enums';

import { DanjiRealPricesListResponse, PyoungListItem } from './types';

function getKey(
  danjiId: number | null | undefined,
  pageIndex: number,
  realestateType: number | null,
  previousPageData: DanjiRealPricesListResponse | null,
  buyOrRent: number | undefined,
  year: number,
  directDealExcluded: boolean,
  list: PyoungListItem[] | null,
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

export function useFetchDanjiRealPricesList({
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
  list: PyoungListItem[] | null;
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
