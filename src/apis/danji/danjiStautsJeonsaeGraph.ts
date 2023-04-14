import useSWR from 'swr';

export type GetDanjiJeonsaeGraphResponse = {
  list_danji: {
    date: string;
    jeonsae_rate: number;
  }[];

  list_sigungu: {
    date: string;
    jeonsae_rate: number;
    count: number;
  }[];

  list_sido: {
    date: string;
    jeonsae_rate: number;
  }[];
} & ErrorResponse;

export function useAPI_DanjiJeonsaeGraph({
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
  const { data, error } = useSWR<GetDanjiJeonsaeGraphResponse>(
    pnu && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/jeonsaerate',
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

export function useAPI_DanjiJeonsaeSidoGraph({
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
  const { data, error } = useSWR<GetDanjiJeonsaeGraphResponse>(
    pnu && realestateType && year && buyOrRent
      ? [
          '/danji/stats/graph/jeonsaerate/sido',
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
