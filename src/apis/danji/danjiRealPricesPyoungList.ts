import useSWR from 'swr';

export type GetDanjiRealPricesPyoungListResponse = {
  buy_or_rent: number;
  list:
    | [
        {
          min_jeonyong: number;
          max_jeonyong: number;
          avg_jeonyong: number;
          gonggeup_pyoung: number;
          saedae_count: number;
          default: boolean;
        },
      ]
    | null;
};

export function useAPI_DanjiRealPricesPyoungList({
  danjiId,
  realestateType,
  buyOrRent,
}: {
  danjiId?: number;
  realestateType?: number;
  buyOrRent?: number | null;
}) {
  const { data, error } = useSWR<GetDanjiRealPricesPyoungListResponse>(
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

  return {
    data,
    list: data?.list,
    error,
    isLoading: !data ? true : data.list && false,
  };
}
