import axios from '@/lib/axios';
import useSWR from 'swr';

export interface GetDanjiSummaryResponse {
  buy_listing_count: number;
  rent_listing_count?: number;
  buy_price: number;
  rent_price?: number;
  pnu: string;
  realestate_type: number;
  string: string;
  saedae_count: number;
  latest_deal_date?: string;
  use_accepted_year?: string;
}

export default async function getDanjiSummary({
  pnu,
  buyOrRent,
  danjiRealestateType,
}: {
  pnu?: string;
  buyOrRent: string;
  danjiRealestateType?: number;
}) {
  if (!pnu || !danjiRealestateType) return;

  try {
    const { data } = await axios.post('/map/danji/summary', {
      pnu,
      buy_or_rent: buyOrRent,
      danji_realestate_type: danjiRealestateType,
    });
    return data as GetDanjiSummaryResponse;
  } catch (e) {
    return null;
  }
}

export function useDanjiSummary(req: { pnu?: string; danjiRealestateType?: number } | undefined | null) {
  const { data, isLoading } = useSWR<GetDanjiSummaryResponse>(
    req?.pnu && req?.danjiRealestateType
      ? ['/map/danji/summary', { pnu: req.pnu, danji_realestate_type: req.danjiRealestateType, buy_or_rent: '1,2,3' }]
      : null,
  );

  return {
    data,
    isLoading,
  };
}
