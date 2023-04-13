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
  pnu,
  realestateType,
  buyOrRent = null,
}: {
  pnu?: string;
  realestateType?: number;
  buyOrRent?: number | null;
}) {
  const { data, error } = useSWR<GetDanjiRealPricesPyoungListResponse>(
    pnu && realestateType
      ? [
          '/danji/realprices/pyoung/list',
          {
            pnu,
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
