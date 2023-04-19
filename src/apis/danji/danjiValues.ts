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
  const { data, error } = useSWR<GetDanjiValuesChartResponse>(
    pnu && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/valueindex',
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

export function useAPI_DanjiSidoValues({
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
  const { data, error } = useSWR<GetDanjiValuesChartResponse>(
    pnu && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/valueindex/sido',
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
