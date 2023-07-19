import axios from '@/lib/axios';
import useSWR from 'swr';

export interface GetDanjiSummaryResponse {
  buy_listing_count: number;
  rent_listing_count?: number;
  buy_price: number;
  rent_price?: number;
  danji_id: number;
  realestate_type: number;
  string: string;
  saedae_count: number;
  latest_deal_date_buy: string;
  latest_deal_date_rent: string;
  use_accepted_year?: string;
}

export default async function getDanjiSummary({
  danjiId,
  buyOrRent,
  danjiRealestateType,
}: {
  danjiId?: number;
  buyOrRent: string;
  danjiRealestateType?: number;
}) {
  if (!danjiId || !danjiRealestateType) return;

  try {
    const { data } = await axios.post('/map/danji/summary', {
      danji_id: danjiId,
      buy_or_rent: buyOrRent,
      danji_realestate_type: danjiRealestateType,
    });
    return data as GetDanjiSummaryResponse;
  } catch (e) {
    return null;
  }
}

export function useDanjiSummary(req: { danjId?: number; danjiRealestateType?: number } | undefined | null) {
  const { data, isLoading } = useSWR<GetDanjiSummaryResponse>(
    req?.danjId && req?.danjiRealestateType
      ? [
          '/map/danji/summary',
          { danji_id: req.danjId, danji_realestate_type: req.danjiRealestateType, buy_or_rent: '1,2,3' },
        ]
      : null,
    null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );

  return {
    data,
    isLoading,
  };
}
