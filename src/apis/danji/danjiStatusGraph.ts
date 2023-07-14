import useSWR from 'swr';

export type GetDanjiStatsGraphResponse = {
  list_danji: {
    date: string;
    price: number;
    count: number;
  }[];

  list_sigungu: {
    date: string;
    price: number;
    count: number;
  }[];

  list_sido: {
    date: string;
    price: number;
    count: number;
  }[];
} & ErrorResponse;

export function useAPI_DanjiStatusGraph({
  danjiId,
  realestateType,
  year,
  buyOrRent,
}: {
  danjiId?: string | null;
  realestateType?: number | null;
  year?: number;
  buyOrRent?: number;
}) {
  const { data, error } = useSWR<GetDanjiStatsGraphResponse>(
    danjiId && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/pricerpersqmeter',
          {
            danji_id: danjiId,
            realestate_type: Number(realestateType),
            buy_or_rent: buyOrRent,
            year,
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    listDanji: data?.list_danji,
    listSigungu: data?.list_sigungu,
    listSido: data?.list_sido,
    isLoading: !data && !error,
    error,
  };
}

export function useAPI_DanjiStatusSidoGraph({
  danjiId,
  realestateType,
  year,
  buyOrRent,
}: {
  danjiId?: number | null;
  realestateType?: number | null;
  year?: number;
  buyOrRent?: number;
}) {
  const { data, error } = useSWR<GetDanjiStatsGraphResponse>(
    danjiId && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/pricerpersqmeter/sido',
          {
            danji_id: danjiId,
            realestate_type: Number(realestateType),
            buy_or_rent: buyOrRent,
            year,
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    listDanji: data?.list_danji,
    listSigungu: data?.list_sigungu,
    listSido: data?.list_sido,
    isLoading: !data && !error,
    error,
  };
}
