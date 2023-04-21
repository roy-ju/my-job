import useSWR from 'swr';

export type DanjiChartTransactionCountResponse = {
  list_danji: {
    date: string;
    count: number;
  }[];

  list_sigungu: {
    date: string;
    count: number;
  }[];

  list_sido: {
    date: string;
    count: number;
  }[];
} & ErrorResponse;

export function useAPI_DanjiChartTransactionCount({
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
  const { data, error } = useSWR<DanjiChartTransactionCountResponse>(
    pnu && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/tradecountper1000',
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
    isLoading: !pnu || !realestateType ? false : !data && !error,
    error,
  };
}

export function useAPI_DanjiChartSidoTransactionCount({
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
  const { data, error } = useSWR<DanjiChartTransactionCountResponse>(
    pnu && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/tradecountper1000/sido',
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
    isLoading: !pnu || !realestateType ? false : !data && !error,
    error,
  };
}
