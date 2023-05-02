import { BuyOrRent } from '@/constants/enums';
import useSWR from 'swr';

export type GetDanjiTradeTurnrateResponse = {
  trade_turn_rate: number;
};

export type GetDanjiTradeTurnrateSigunguResponse = {
  trade_turn_rate: number;
};

export type GetDanjiJeonsaerateResponse = {
  jeonsae_rate: number;
};

export type GetDanjiJeonsaerateSigunguResponse = {
  jeonsae_rate: number;
};

export function useAPI_DanjiTradeTurnrate({
  buyOrRent,
  pnu,
  realestateType,
  year,
}: {
  buyOrRent?: number;
  pnu?: string | null;
  realestateType?: number | null;
  year?: number;
}) {
  const { data, error } = useSWR<GetDanjiTradeTurnrateResponse>(
    buyOrRent === BuyOrRent.Buy && pnu && realestateType && year
      ? [
          '/danji/stats/tradeturnrate',
          {
            pnu,
            realestate_type: Number(realestateType),
            year,
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}

export function useAPI_DanjiTradeTurnrateSigungu({
  buyOrRent,
  pnu,
  realestateType,
  year,
}: {
  buyOrRent?: number;
  pnu?: string | null;
  realestateType?: number | null;
  year?: number;
}) {
  const { data, error } = useSWR<GetDanjiTradeTurnrateSigunguResponse>(
    buyOrRent === BuyOrRent.Buy && pnu && realestateType && year
      ? [
          '/danji/stats/tradeturnrate/sigungu',
          {
            pnu,
            realestate_type: Number(realestateType),
            year,
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}

export function useAPI_DanjiJeonsaerate({
  buyOrRent,
  pnu,
  realestateType,
  year,
}: {
  buyOrRent?: number;
  pnu?: string | null;
  realestateType?: number | null;
  year?: number;
}) {
  const { data, error } = useSWR<GetDanjiJeonsaerateResponse>(
    buyOrRent === BuyOrRent.Jeonsae && pnu && realestateType && year
      ? [
          '/danji/stats/jeonsaerate',
          {
            pnu,
            realestate_type: Number(realestateType),
            year,
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}

export function useAPI_DanjiJeonsaerateSigungu({
  buyOrRent,
  pnu,
  realestateType,
  year,
}: {
  buyOrRent?: number;
  pnu?: string | null;
  realestateType?: number | null;
  year?: number;
}) {
  const { data, error } = useSWR<GetDanjiJeonsaerateSigunguResponse>(
    buyOrRent === BuyOrRent.Jeonsae && pnu && realestateType && year
      ? [
          '/danji/stats/jeonsaerate/sigungu',
          {
            pnu,
            realestate_type: Number(realestateType),
            year,
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}
