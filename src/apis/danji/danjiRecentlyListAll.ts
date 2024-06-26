import useSWRInfinite from 'swr/infinite';

import { BuyOrRent } from '@/constants/enums';

type ListItem = {
  year: string;
  month: string;
  day: string;
  buy_or_rent: number;
  price: number;
  monthly_rent_fee: number;
  floor: string;
  trade_type: string;
  pyoung: number;
  jeonyong_area?: string;
  cancel_deal_day: string;
};

export type DanjiRealPricesListAllResponse = {
  list: ListItem[];
  page_number: number;
  page_size: number;
};

function getKey(
  data: any,
  danjiId: number | null | undefined,
  pageIndex: number,
  realestateType: number | null | undefined,
  previousPageData: DanjiRealPricesListAllResponse | null,
  buyOrRent: number | undefined,
  directDealExcluded: boolean,
) {
  const pageSize = 8;

  if (!danjiId || !realestateType || !buyOrRent) return null;
  if (!data) return null;

  if (previousPageData && !previousPageData?.list?.length) return null;

  if (previousPageData && (previousPageData.list?.length || 0) < pageSize) return null;

  return [
    '/danji/realprices/list/all',
    {
      ...data,
      danji_id: danjiId,
      realestate_type: realestateType,
      direct_deal_excluded: buyOrRent === BuyOrRent.Buy ? directDealExcluded : false,
      page_number: pageIndex + 1,
    },
  ];
}

export function useAPI_ThisDanjiRecentlyRealPricesListAll({
  res,
  danjiId,
  realestateType,
  buyOrRent,
  directDealExcluded,
}: {
  res: any;
  danjiId?: number | null;
  realestateType?: number | null;
  buyOrRent?: number;
  directDealExcluded: boolean;
}) {
  const { data, error, size, setSize, mutate } = useSWRInfinite<DanjiRealPricesListAllResponse>(
    (pageIndex, previousPageData) =>
      getKey(res, danjiId, pageIndex, realestateType, previousPageData, buyOrRent, directDealExcluded),
    null,
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      onSuccess: () => {},
    },
  );

  const decideIsShowMoreButton = () => {
    if (!data) {
      return false;
    }

    if (data && !data[data.length - 1]?.list) {
      return false;
    }

    if (data && data[data.length - 1]?.list && data[data.length - 1].list.length < 8) {
      return false;
    }

    return true;
  };

  return {
    data,
    isShowMoreButton: decideIsShowMoreButton(),
    isLoading: !data && !error,
    list: data
      ? ([] as NonNullable<DanjiRealPricesListAllResponse['list']>).concat(...data.map((item) => item.list || []))
      : [],
    error,
    size,
    setSize,
    mutate,
  };
}
