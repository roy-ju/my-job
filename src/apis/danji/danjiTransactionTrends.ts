import useSWR from 'swr';

export type DanjiTransactionTrendsResponse = {
  list_danji: {
    date: string;
    price: number;
  }[];

  list_sigungu: {
    date: string;
    price: number;
  }[];

  list_sido: {
    date: string;
    price: number;
  }[];
} & ErrorResponse;

export function useAPI_DanjiTransactionTrends({
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
  const { data, error } = useSWR<DanjiTransactionTrendsResponse>(
    danjiId && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/tradepriceindex',
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
    isLoading: !danjiId || !realestateType ? false : !data && !error,
    error,
  };
}

export function useAPI_DanjiTransactionSidoTrends({
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
  const { data, error } = useSWR<DanjiTransactionTrendsResponse>(
    danjiId && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/tradepriceindex/sido',
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
    isLoading: !danjiId || !realestateType ? false : !data && !error,
    error,
  };
}
