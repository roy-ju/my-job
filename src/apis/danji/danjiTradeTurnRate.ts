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
  danjiId,
  realestateType,
  year,
}: {
  buyOrRent?: number;
  danjiId?: number | null;
  realestateType?: number | null;
  year?: number;
}) {
  const { data, error } = useSWR<GetDanjiTradeTurnrateResponse>(
    buyOrRent === BuyOrRent.Buy && danjiId && realestateType && year
      ? [
          '/danji/stats/tradeturnrate',
          {
            danji_id: danjiId,
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
  danjiId,
  realestateType,
  year,
}: {
  buyOrRent?: number;
  danjiId?: number | null;
  realestateType?: number | null;
  year?: number;
}) {
  const { data, error } = useSWR<GetDanjiTradeTurnrateSigunguResponse>(
    buyOrRent === BuyOrRent.Buy && danjiId && realestateType && year
      ? [
          '/danji/stats/tradeturnrate/sigungu',
          {
            danji_id: danjiId,
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
  danjiId,
  realestateType,
  year,
}: {
  buyOrRent?: number;
  danjiId?: number | null;
  realestateType?: number | null;
  year?: number;
}) {
  const { data, error } = useSWR<GetDanjiJeonsaerateResponse>(
    buyOrRent === BuyOrRent.Jeonsae && danjiId && realestateType && year
      ? [
          '/danji/stats/jeonsaerate',
          {
            danji_id: danjiId,
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
  danjiId,
  realestateType,
  year,
}: {
  buyOrRent?: number;
  danjiId?: number | null;
  realestateType?: number | null;
  year?: number;
}) {
  const { data, error } = useSWR<GetDanjiJeonsaerateSigunguResponse>(
    buyOrRent === BuyOrRent.Jeonsae && danjiId && realestateType && year
      ? [
          '/danji/stats/jeonsaerate/sigungu',
          {
            danji_id: danjiId,
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
