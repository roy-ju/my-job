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
  pnu,
  realestateType,
  year,
  buyOrRent,
}: {
  pnu?: string | null;
  realestateType?: number | null;
  year?: number;
  buyOrRent?: number;
}) {
  const { data, error } = useSWR<GetDanjiStatsGraphResponse>(
    pnu && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/pricerpersqmeter',
          {
            pnu,
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
  pnu,
  realestateType,
  year,
  buyOrRent,
}: {
  pnu?: string | null;
  realestateType?: number | null;
  year?: number;
  buyOrRent?: number;
}) {
  const { data, error } = useSWR<GetDanjiStatsGraphResponse>(
    pnu && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/pricerpersqmeter/sido',
          {
            pnu,
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
