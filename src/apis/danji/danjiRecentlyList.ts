import useSWRInfinite from 'swr/infinite';

type ListItem = {
  name: string;
  price: number;
  monthly_rent_fee: number;
  jeonyong_area: number;
  saedae_count: string;
  year: string;
  month: string;
  day: string;
  buy_or_rent: number;
  floor: string;
  trade_type: string;
  danji_id: number;
  realestate_type: number;
  cancel_deal_day: string;
};

export type DanjiRecentlyRealPricesAllResponse = {
  list: ListItem[];
  page_number: number;
  page_size: number;
};

function getKey(
  danjiId: number | null | undefined,
  pageIndex: number,
  realestateType: number | null,
  previousPageData: DanjiRecentlyRealPricesAllResponse | null,
  buyOrRent: number | undefined,
) {
  const pageSize = 5;

  if (!danjiId || !realestateType || !buyOrRent) return null;

  if (previousPageData && !previousPageData?.list?.length) return null;

  if (previousPageData && (previousPageData.list?.length || 0) < pageSize) return null;

  return [
    '/danji/realprices/list/sigungu',
    {
      danji_id: danjiId,
      realestate_type: realestateType,
      buy_or_rent: buyOrRent,
      page_number: pageIndex + 1,
      page_size: 5,
    },
  ];
}

export function useAPI_DanjiRecentlyRealPricesListAll({
  danjiId,
  realestateType,
  buyOrRent,
}: {
  danjiId?: number | null;
  realestateType: number | null;
  buyOrRent?: number;
}) {
  const { data, error, size, setSize, mutate } = useSWRInfinite<DanjiRecentlyRealPricesAllResponse>(
    (pageIndex, previousPageData) => getKey(danjiId, pageIndex, realestateType, previousPageData, buyOrRent),
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

    if (data && data[data.length - 1]?.list && data[data.length - 1].list.length < 5) {
      return false;
    }

    return true;
  };

  return {
    data,
    isShowMoreButton: decideIsShowMoreButton(),
    isLoading: !data && !error,
    list: data
      ? ([] as NonNullable<DanjiRecentlyRealPricesAllResponse['list']>).concat(...data.map((item) => item.list || []))
      : [],
    error,
    size,
    setSize,
    mutate,
  };
}
