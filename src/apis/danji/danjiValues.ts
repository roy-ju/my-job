import useSWR from 'swr';

export type GetDanjiValuesChartResponse = {
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

export function useAPI_DanjiValues({
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
  const { data, error } = useSWR<GetDanjiValuesChartResponse>(
    danjiId && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/valueindex',
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

export function useAPI_DanjiSidoValues({
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
  const { data, error } = useSWR<GetDanjiValuesChartResponse>(
    danjiId && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/valueindex/sido',
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
